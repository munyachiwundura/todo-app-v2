import styles from "../styles/todoItem.module.css";
import { motion } from "framer-motion";
import { useState } from "react";

export default function TodoItem(props) {
  const [deleting, setDeleting] = useState(true);
  const [done, setDone] = useState(props.done);

  var TimeAgo = (function () {
    var self = {};

    self.locales = {
      prefix: "",
      sufix: "ago",

      seconds: "less than a minute",
      minute: "about a minute",
      minutes: "%d minutes",
      hour: "about an hour",
      hours: "about %d hours",
      day: "a day",
      days: "%d days",
      month: "about a month",
      months: "%d months",
      year: "about a year",
      years: "%d years",
    };

    self.inWords = function (timeAgo) {
      var seconds = Math.floor((new Date() - parseInt(timeAgo)) / 1000),
        separator = this.locales.separator || " ",
        words = this.locales.prefix + separator,
        interval = 0,
        intervals = {
          year: seconds / 31536000,
          month: seconds / 2592000,
          day: seconds / 86400,
          hour: seconds / 3600,
          minute: seconds / 60,
        };

      var distance = this.locales.seconds;

      for (var key in intervals) {
        interval = Math.floor(intervals[key]);

        if (interval > 1) {
          distance = this.locales[key + "s"];
          break;
        } else if (interval === 1) {
          distance = this.locales[key];
          break;
        }
      }

      distance = distance.replace(/%d/i, interval);
      words += distance + separator + this.locales.sufix;

      return words.trim();
    };

    return self;
  })();

  const time = new Date(props.date);

  console.log();

  return (
    <div
      // style={{backgroundColor: deleting? "red" : "green"}}
      className={styles.todo_background}
    >
      <motion.div
        layoutId={props.order}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0 }}
        onClick={() => {
          setDone(!done);
          props.statusChange();
        }}
        drag="x"
        dragConstraints={{ left: 5, right: 5 }}
        onDragEnd={(e, { offset }) => {
          props.delete();
          // console.log(offset.x)
          // offset.x > 400 && props.delete()
          // offset.x < -400 && props.delete()
        }}
      >
        <motion.div
          animate={{ background: done ? "#000" : "rgba(146, 146, 146, 0.25)" }}
          className={styles.container}
        >
          <div
            className={styles.todo_image}
            style={{ backgroundColor: props.category.color }}
          >
            <p>{props.category.icon}</p>
          </div>
          <div className={styles.text_container}>
            <p>{props.title}</p>
            <span>{TimeAgo.inWords(time.getTime())}</span>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
