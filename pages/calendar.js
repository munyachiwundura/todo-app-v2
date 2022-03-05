import { useState, useContext, useEffect } from "react";
import Head from "next/head";
import TodoItem from "../components/todoItem";
import styles from "../styles/Home.module.css";
import prisma from "../lib/prisma";
import Calendar from "react-calendar";
import { Context } from "../context";
import { getSession } from "next-auth/react";
import { AnimateSharedLayout, AnimatePresence } from "framer-motion";

export default function CalendarPage(props) {
  const [tasks, setTasks] = useState(props.todos);
  const [selectDates, setSelectDates] = useState("2022-01-29");
  const { state, dispatch } = useContext(Context);
  const [categories, setCategories] = useState([]);

  async function getCategories() {
    const request = await fetch(`/api/categories`);
    const data = await request.json();
    setCategories(data.categories);
  }

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
    dbStatusChange(e.id, e.status);
  };

  useEffect(() => {
    getTodos();
    getCategories();
  }, []);

  return (
    <>
      <Head>
        <title>Calendar | Overkill To-Do App</title>
      </Head>
      <div className={styles.container}>
        <h1>Calendar</h1>
        <p className={styles.greeting}>View Task for Specific Days</p>
        <section className={styles.category_section}>
          <Calendar
            onClickDay={(value) =>
              setSelectDates(new Date(value).toISOString())
            }
          />
        </section>

        <section className={styles.right_section}>
          <span className={styles.section_span}>The Days Tasks</span>
          <AnimateSharedLayout type="crossfade">
            <AnimatePresence>
              {selectDates
                ? state.tasks
                    .filter((i) =>
                      i.completeby.includes(selectDates.slice(0, 10))
                    )
                    .map((x, y) => (
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
                    ))
                : state.tasks.map((x, y) => (
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
    context.res.writeHead(307, { Location: "/profile" });
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
