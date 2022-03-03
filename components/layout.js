import Head from "next/head";
import AddTaskModal from "./addTaskModal";
import Navbar from "./navbar";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/router";

const Layout = ({ children }) => {
  const router = useRouter();
  const [addTask, setAddTask] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  function screenSize() {
    window.innerWidth > 800 ? setIsMobile(false) : setIsMobile(true);
  }

  useEffect(() => {
    screenSize();
    window.addEventListener("resize", () => screenSize());
  });

  return (
    <div className="page">
      <AnimatePresence>
        <motion.div
          key={router.route}
          className="page_transition"
          initial="hidden"
          animate="visible"
          exit="pageExit"
          variants={{
            hidden: {
              x: "100vw",
            },
            visible: {
              transition: { duration: 1.6 },
              x: 0,
              transitionEnd: {
                x: 0,
              },
            },
            pageExit: {
              backgroundColor: "#fff",

              transition: { duration: 0.8 },
              x: "-100vw",
            },
          }}
        >
          {children}
        </motion.div>
      </AnimatePresence>

      {addTask && (
        <AddTaskModal close_add_task_modal={() => setAddTask(false)} />
      )}
      <Navbar mobile={isMobile} open_add_task_modal={() => setAddTask(true)} />
    </div>
  );
};

export default Layout;
