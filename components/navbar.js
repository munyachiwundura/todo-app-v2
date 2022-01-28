import Link from "next/link"
import { useEffect, useState } from "react";
import styles from '../styles/Navigation.module.css'
import {motion} from "framer-motion"


const Navbar = (props) => {

    const [expand, setExpand] = useState("false")

    const [mobile, setMobile] = useState("false")
    

    


    return ( 
        !props.mobile? <motion.nav animate={{width: expand? 300 : 100}} className={styles.nav}>
            <div onClick={() => setExpand(!expand)} className={styles.nav_item}>
                <i className="bi bi-list"></i>
            </div>
            <Link href="/">
                <div className={styles.nav_item} id={styles.flex_order_1}>
                    <i className="bi bi-house"></i>
                    <p className={styles.nav_item_title}>Home</p>
                </div>
            </Link>
            <Link href="/analytics/">
                <div id={styles.flex_order_2} className={styles.nav_item}>
                <i  className="bi bi-kanban"></i>
                    <p className={styles.nav_item_title}>Analytics</p>
                </div>
            </Link>
            
            
                <i id={styles.addButton} onClick={props.open_add_task_modal} className="bi bi-plus-lg"></i>
            
            <Link href="/calendar/">
            <div id={styles.flex_order_3} className={styles.nav_item}>
                <i  className="bi bi-calendar3"></i>
                    <p className={styles.nav_item_title}>Calendar</p>
                </div>
            </Link>
            <Link href="/profile/">
            <div id={styles.flex_order_4} className={styles.nav_item}>
                <i  className="bi bi-person"></i>
                    <p className={styles.nav_item_title}>Profile</p>
                </div>
            </Link>
        </motion.nav> 
        :
        <nav className={styles.nav}>
            <Link href="/">
                <i id={styles.flex_order_1} className="bi bi-house"></i>
            </Link>
            <Link href="/analytics/">
                <i id={styles.flex_order_2} className="bi bi-kanban"></i>
            </Link>
            
            
                <i id={styles.addButton} onClick={props.open_add_task_modal} className="bi bi-plus-lg"></i>
          
            <Link href="/calendar/">
                <i id={styles.flex_order_3} className="bi bi-calendar3"></i>
            </Link>
            <Link href="/profile/">
                <i id={styles.flex_order_4} className="bi bi-person"></i>
            </Link>
        </nav>

     );
}
 
export default Navbar;