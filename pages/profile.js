import { Context } from "../context";
import { useContext, useEffect, useState } from "react";
import Link from 'next/link'
import Image from 'next/image'
import { signOut, useSession, signIn } from 'next-auth/react'
import styles from '../styles/Profile.module.css'
import { motion } from 'framer-motion'

function Toggle(props) {

    var activated = props.isActivated
    
    const spring = {
        type: "spring",
        stiffness: 700,
        damping: 30
      };

    return (
        <div  className={styles.toggle} style={{
            background: activated? '#276BF2' : '#181925',
            justifyContent: activated? "flex-end": "flex-start"
            }}>
            <motion.div layout transition={spring} style={{background: activated? '#fff' : '#c4c4c4'}}></motion.div>
        </div>
    )
}

export default function Profile() {
   const {data: session} = useSession();
   const [notifications, setNotifications] = useState(false)
   const [sync, setSync] = useState(false)
   const [ nightMode, setNightMode] = useState(false)

   const tap = {opacity: 0.6}

   const spring = {
    type: "spring",
    stiffness: 700,
    damping: 30,
    duration: 0.1

  };
    return (
        <div className={styles.container}>
            <h1>Profile</h1>
            
                {session ? 
      <>
                    <div className={styles.user_container}>
                        <div className={styles.profile_picture}>
                            <Image src={session.user.image} width={100} height={100}/>
                        </div>
                        <div className={styles.user_text}>
                            <p>{session.user.name}</p>
                            <span>{session.user.email}</span>
                        </div>
                    </div>
                    <section className={styles.user_buttons}>
                        <motion.button  transition={spring} whileTap={tap}><i className="bi bi-tools"></i>Manage Account</motion.button>
                        <motion.button  transition={spring} whileTap={tap} onClick={() => signOut()}><i className="bi bi-box-arrow-right"></i> logout</motion.button>
                    </section>
                    <section className={styles.settings_buttons}>
                    <span>Settings</span>
                        <motion.button  transition={spring} whileTap={tap} onClick={() => setNotifications(!notifications)}><i className="bi bi-bell"></i>Notifications<Toggle isActivated={notifications}/></motion.button>
                        <motion.button  transition={spring} whileTap={tap} onClick={() => setSync(!sync)}><i className="bi bi-arrow-repeat"></i>Sync<Toggle isActivated={sync}/></motion.button>
                        <motion.button  transition={spring} whileTap={tap} onClick={()=> setNightMode(!nightMode)}><i className="bi bi-moon"></i>Night mode<Toggle isActivated={nightMode}/></motion.button>
                    </section>
                    <section className={styles.help_buttons}>
                    <span>Help</span>
                        <motion.button transition={spring} whileTap={tap}><i className="bi bi-question-circle"></i>Help</motion.button>
                    </section>
      </> 
      
      : 
      <div className={styles.login}>
          <img src="/greeter.svg" />
          <h1>The only todo app you will ever need</h1>
          <div className={styles.login_button} onClick={() => signIn()}>Get Started</div>
      </div>
 
            }
            
        </div>
    )
}
