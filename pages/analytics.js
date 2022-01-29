import Link from 'next/link'
import { motion } from 'framer-motion'
import OverallTasksProgress from '../components/overallTasksProgress'
import WeeklyTaskProgress from '../components/weeklyTaskProgress'
import styles from '../styles/analytics.module.css'
import { getSession } from 'next-auth/react'

export default function Analytics(props) {

    console.log(props.analytics.analytics.total)
    const tap = {opacity: 0.6}
    return (
        <div className={styles.container}>
            <h1>Analytics</h1>
            <header>
                <p className={styles.title}>Here is an overview of your goals</p>
            </header>
            <section>
            <OverallTasksProgress data={props.analytics.analytics.monthly}/>
            </section>
            <section>
                <WeeklyTaskProgress data={props.analytics.analytics.weekly}/>
            </section>
            <section>
                <span>Overall</span>
                <Link href="/tasks">
                <motion.div whileTap={tap} id={styles.totalTask} className={styles.button}>
                
                    <div className={styles.icon}>
                        <i className="bi bi-stack"></i>
                    </div>
                    <p className={styles.button_title}>
                      Total Tasks  
                    </p>
                    <p className={styles.arrow}>
                        {props.analytics.analytics.total.total}
                        <i className='bi bi-chevron-right'></i>
                    </p>
                    
                </motion.div>
                </Link>
                <Link href="/tasks">

                <motion.div whileTap={tap} id={styles.completedTasks} className={styles.button}>
                    <div className={styles.icon}>
                        <i className="bi bi-check"></i>
                    </div>
                    <p className={styles.button_title}>
                      Completed  
                    </p>
                    <p className={styles.arrow}>
                        {props.analytics.analytics.total.completed}
                        <i className='bi bi-chevron-right'></i>
                    </p>
                    
                </motion.div>
                </Link>
            </section>
        </div>
    )
}

export async function getServerSideProps(context) {

    const session = await getSession(context)
    
    
    // if(!session) {
    //   return {
    //     redirect: {
    //       permanent: false,
    //       destination: '/profile'
    //     }
    //   }
    // }else {
        const request = await fetch(`http://localhost:3000/api/analytics`, {
            method: "POST",
            body: JSON.stringify({
              user: session.user,
              
            })
          })
        const data = await request.json()
        

        return {
            props: {
              analytics:  data, 
            }
          }
    // }
    
    
        
      
      }
