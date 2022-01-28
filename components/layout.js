import Head from "next/head";
import AddTaskModal from "./addTaskModal";
import Navbar from "./navbar";
import { useState, useEffect } from "react";





const Layout = ({children}) => {

    const [addTask, setAddTask] = useState(false)
    const [isMobile, setIsMobile] = useState(false)


    function screenSize() {
        window.innerWidth > 800? setIsMobile(false) : setIsMobile(true)
    }

    
    useEffect (() => {
        screenSize()
        window.addEventListener('resize', () => screenSize()
        )
    })

    return ( 
            
        <div className="page">
            <Head>
                <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.7.0/font/bootstrap-icons.css"/>
                <link rel="preconnect" href="https://fonts.googleapis.com"/>
<link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin/>
<link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400&display=swap" rel="stylesheet"/>
            </Head>
            {children}

            {addTask && <AddTaskModal close_add_task_modal={() => setAddTask(false)}/>}
            <Navbar mobile={isMobile} open_add_task_modal={() => setAddTask(true)}/>
        </div>
     );
}
 
export default Layout;