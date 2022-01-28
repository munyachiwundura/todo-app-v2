import { motion } from 'framer-motion'
import {useState} from 'react'
import styles from '../styles/pullRefresh.module.css'


export default function PullRefresh({children}) {
  const [refreshing, setRefreshing] = useState(false)

    return (
    <div className={styles.container}>
       
      <motion.div 
      drag="y"
      dragConstraints={{ top: 0, bottom: 0 }}
      onDragEnd={() => setRefreshing(false)}
      onDrag={(e, { offset }) => {
      offset.y > 300 && setRefreshing(true)
    }}
    className={styles.content}  
    > 
        {children}
        </motion.div>
    </div>
    )
}
