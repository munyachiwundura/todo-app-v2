import { useState, useContext, useEffect } from "react";
import Head from "next/head";
import TodoItem from "../components/todoItem";
import styles from "../styles/Home.module.css";
import prisma from "../lib/prisma";
import TasksProgress from "../components/tasksProgress";
import { Context } from "../context";
import { getSession } from "next-auth/react";
import { AnimateSharedLayout, AnimatePresence } from "framer-motion";

export default function Tasks(props) {
  const [tasks, setTasks] = useState(props.todos);
  const [selectCategory, setSelectCategory] = useState(false);
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
        <title>Tasks | Overkill To-Do App</title>
      </Head>
      <div className={styles.container}>
        <h1>All Tasks</h1>
        <section className={styles.category_section}>
          <span className={styles.section_span}>Categories</span>
          <div className={styles.categories_container}>
            <div
              onClick={() => setSelectCategory(false)}
              className={styles.category}
            >
              <div
                className={styles.category_icon_container}
                style={{ backgroundColor: "#276bf2" }}
              >
                <p>All</p>
              </div>
              <p>View All</p>
            </div>

            {categories.map((x, y) => (
              <div
                key={y}
                onClick={() => setSelectCategory(x.id)}
                className={styles.category}
              >
                <div
                  className={styles.category_icon_container}
                  style={{ backgroundColor: x.color }}
                >
                  <p>{x.icon}</p>
                </div>
                <p>{x.title}</p>
              </div>
            ))}
          </div>
        </section>

        <section className={styles.right_section}>
          <span className={styles.section_span}>Todays Tasks</span>
          <AnimateSharedLayout type="crossfade">
            <AnimatePresence>
              {selectCategory
                ? state.tasks
                    .filter((i) => i.categoryId === selectCategory)
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
  console.log(data);
  console.log(process.env.NODE_ENV);
  return {
    props: {
      todos: data,
      username: username,
    },
  };
}
