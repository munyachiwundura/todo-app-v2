import { useState, useContext, useEffect } from "react";
import Head from "next/head";
import TodoItem from "../components/todoItem";
import styles from "../styles/Home.module.css";
import prisma from "../lib/prisma";
import TasksProgress from "../components/tasksProgress";
import { Context } from "../context";
import { getSession } from "next-auth/react";
import { AnimateSharedLayout, AnimatePresence } from "framer-motion";

const base64ToUint8Array = (base64) => {
  const padding = "=".repeat((4 - (base64.length % 4)) % 4);
  const b64 = (base64 + padding).replace(/-/g, "+").replace(/_/g, "/");

  const rawData = window.atob(b64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
};

export default function Home(props) {
  const [tasks, setTasks] = useState(props.todos);
  const [completedTasks, setCompletedTasks] = useState(
    props.todos.filter((x) => x.status === true)
  );
  const { state, dispatch } = useContext(Context);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [subscription, setSubscription] = useState(null);
  const [registration, setRegistration] = useState(null);

  async function getTodos() {
    const request = await fetch(`/api/todos`);
    const data = await request.json();
    setTasks(data.data);
    dispatch({
      type: "ADD_TASK",
      payload: data.data,
    });
  }

  async function dbStatusChange(id, status) {
    const req = await fetch("/api/todos/update", {
      method: "POST",
      body: JSON.stringify({
        id: id,
        data: {
          status: status,
        },
      }),
    });
    if (!req.ok) {
      throw Error(req.statusText);
    }
    return await req.json();
  }

  async function dbDelete(id) {
    const req = await fetch("/api/todos/delete", {
      method: "POST",
      body: JSON.stringify({
        id: id,
      }),
    });
    if (!req.ok) {
      throw Error(req.statusText);
    }
    return await req.json();
  }

  const deleteItem = (e) => {
    const items = state.tasks;
    const index = state.tasks.indexOf(e);
    items.splice(index, 1);
    setTasks(items);
    dispatch({
      type: "ADD_TASK",
      payload: items,
    });
    setCompletedTasks(tasks.filter((x) => x.status === true));
    dbDelete(e.id);
  };

  const statusChange = (e) => {
    const items = state.tasks;
    const item = e;
    item.status = !e.status;
    const index = tasks.indexOf(e);
    items[index] = item;
    setTasks(items);
    dispatch({
      type: "ADD_TASK",
      payload: items,
    });
    setCompletedTasks(state.tasks.filter((x) => x.status === true));
    dbStatusChange(e.id, e.status);
  };

  const subscribeButtonOnClick = async (event) => {
    event.preventDefault();
    const sub = await registration.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: base64ToUint8Array(
        process.env.NEXT_PUBLIC_WEB_PUSH_PUBLIC_KEY
      ),
    });
    // TODO: you should call your API to save subscription data on server in order to send web push notification from server
    setSubscription(sub);
    setIsSubscribed(true);
    console.log("web push subscribed!");
    console.log(sub);
  };

  const unsubscribeButtonOnClick = async (event) => {
    event.preventDefault();
    await subscription.unsubscribe();
    // TODO: you should call your API to delete or invalidate subscription data on server
    setSubscription(null);
    setIsSubscribed(false);
    console.log("web push unsubscribed!");
  };

  const sendNotificationButtonOnClick = async (event) => {
    event.preventDefault();
    if (subscription == null) {
      console.error("web push not subscribed");
      return;
    }

    await fetch("/api/notification", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        subscription,
      }),
    });
  };

  useEffect(() => {
    if (
      typeof window !== "undefined" &&
      "serviceWorker" in navigator &&
      window.workbox !== undefined
    ) {
      // run only in browser
      navigator.serviceWorker.ready.then((reg) => {
        reg.pushManager.getSubscription().then((sub) => {
          if (
            sub &&
            !(
              sub.expirationTime &&
              Date.now() > sub.expirationTime - 5 * 60 * 1000
            )
          ) {
            setSubscription(sub);
            setIsSubscribed(true);
          }
        });
        setRegistration(reg);
      });
    }

    getTodos();
    console.log(state);
  }, []);

  return (
    <>
      <Head>
        <title>Home | Overkill To-Do App</title>
      </Head>
      <div className={styles.container}>
        <header className={styles.greeting_container}>
          <h1 className={styles.title}>Home</h1>
          <div>
            <p className={styles.greeting}>Hello</p>
            <p className={styles.greeting}>{props.username}</p>
          </div>
          <section>
            <TasksProgress
              total={tasks.length}
              done={completedTasks.length}
              progress={
                (completedTasks.length / props.todos.length) * 100 + "%"
              }
            />
          </section>
        </header>
        <section className={styles.right_section}>
          <span>Todays Tasks</span>
          <AnimateSharedLayout type="crossfade">
            <AnimatePresence>
              {state.tasks.map((x, y) => (
                <TodoItem
                  key={y}
                  title={x.title}
                  order={y}
                  delete={() => deleteItem(x)}
                  category={x.category}
                  date={x.completeby}
                  done={x.status}
                  statusChange={() => statusChange(x)}
                />
              ))}
            </AnimatePresence>
          </AnimateSharedLayout>
        </section>
      </div>
    </>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession(context);
  let data = null;
  let username = null;

  if (!session) {
    return {
      redirect: {
        permanent: false,
        destination: "/profile",
      },
    };
  } else {
    username = session.user.name;
    data = await prisma.todo.findMany({
      where: {
        User: { email: session.user.email },
      },
      select: {
        id: true,
        title: true,
        status: true,
        category: true,
      },
    });
  }

  return {
    props: {
      todos: data,
      username: username,
    },
  };
}
