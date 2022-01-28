import styles from '../styles/TasksProgress.module.css'
import {motion} from "framer-motion"

const TasksProgress = (props) => {
    return ( 
        <div className={styles.container}>
        <p className={styles.title}>Todays Tasks Progress</p>
        <span className={styles.progress}>{props.done}/{props.total} completed</span>
        <div className={styles.progress_bar}>
          <motion.div animate={{width: props.progress}} className={styles.progress_indicator} >

          </motion.div>
        </div>
        </div>
     );
}
 
export default TasksProgress;