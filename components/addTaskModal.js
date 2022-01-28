import styles from '../styles/AddTaskModal.module.css'
import {motion, AnimatePresence} from 'framer-motion'
import { useEffect, useState, useContext } from 'react'
import CategorySelect from './categorySelect'
import { Context } from "../context";
import { useSession } from 'next-auth/react'
import { useRouter} from 'next/router'


const AddTaskModal = (props) => {

    const { state, dispatch } = useContext(Context); 
    const router = useRouter()
    const [taskTitle, setTaskTitle] = useState("")
    const [taskTime, setTaskTime] = useState(new Date())
    const [taskColor, setTaskColor] = useState("pink")
    const [category, setCategory] = useState([])
    const {data: session} = useSession();

    const refresh = () => {
        router.replace(router.asPath)
      }

      async function defaultCategory() {
          const request = await fetch("/api/categories/default")
          const data = await request.json()
          setCategory(data.request)
      }

   async function addItem(){
        const request = await fetch("/api/todos/add", {
            method: "POST",
            body: JSON.stringify({
                title: taskTitle,
                completeby: taskTime,
                category: {connect: {id: category.id}},
                User: {connect: { email: session.user.email }},
            })
        })
        const data = await request.json()
        if (!request.ok) {
            throw Error(request.statusText);
          }
          let items = state.tasks
          items.unshift(data.addedTodo)
          dispatch({
            type: "ADD_TASK",
            payload: items
          })
        
          return data

   }

   useEffect(() => { 
   defaultCategory()

   },[])
      
       
        
        return ( 
            <AnimatePresence>
                <form onSubmit={(e) => {
                    e.preventDefault()
                    addItem()
                  
                    refresh()
                    dispatch({
                        type: "REFRESH",
                        payload: state.refresh + 1,
                      })

                    props.close_add_task_modal()
                      
                    }}>        
                    <div>
                <div onClick={props.close_add_task_modal} className={styles.backdrop}>

            </div>
            <motion.div  className={styles.modal}
                         initial={{y:100}}
                         animate={{y:0}}
                         exit={{y:100}}
            >
                <div className={styles.title_input_container}>
                    <div style={{background: taskColor}} className={styles.project_color}></div>
                    <input className={styles.title_input} type="text" placeholder="Task Name" onChange={(e) => setTaskTitle(e.target.value)}/>
                </div>
                <div className={styles.dates_container}>
                    <div className={styles.date_container}>
                        {/* <div id={styles.calendarStart} className={styles.calendar_icon}>
                            <i className="bi bi-calendar"></i>
                        </div> */}
                            <input id={styles.calendarStart} className={styles.calendar_icon} type='datetime-local' onChange={(e) => setTaskTime(e.target.value)}/>
                        <div className={styles.dates_title_container}>
                            <p className={styles.date_title}>Start</p>
                            <p id={styles.dateStart} className={styles.date_time}>Today 3pm</p>
                        </div>
                    </div>
                    <div className={styles.date_container}>
                            <input id={styles.calendarEnd} className={styles.calendar_icon} type='datetime-local'/>
                        {/* <div id={styles.calendarEnd} className={styles.calendar_icon}>
                            <i className="bi bi-calendar"></i>
                        </div> */}
                        <div className={styles.dates_title_container}>
                            <p className={styles.date_title}>End</p>
                            <p id={styles.dateEnd} className={styles.date_time}>Today 3pm</p>
                        </div>
                    </div>
                    
                </div>
                <CategorySelect currentCategory={(x) => setCategory(x)}/>
                <button type="submit" className={styles.task_submit}><i className="bi bi-plus"></i></button>
            </motion.div> 
            </div>
            </form>

            </AnimatePresence>
            );
}
 
export default AddTaskModal;