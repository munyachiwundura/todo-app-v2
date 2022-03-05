import { Context } from "../context";
import { useContext, useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { signOut, useSession, signIn } from "next-auth/react";
import styles from "../styles/Profile.module.css";
import { motion } from "framer-motion";
import Head from "next/head";

const base64ToUint8Array = (base64) => {
  const padding = "=".repeat((4 - (base64.length % 4)) % 4);
  const b64 = (base64 + padding).replace(/-/g, "+").replace(/_/g, "/");

  const rawData = window.atob(b64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
};

function Toggle(props) {
  var activated = props.isActivated;

  const spring = {
    type: "spring",
    stiffness: 700,
    damping: 30,
  };

  return (
    <div
      className={styles.toggle}
      style={{
        background: activated ? "#276BF2" : "#181925",
        justifyContent: activated ? "flex-end" : "flex-start",
      }}
    >
      <motion.div
        layout
        transition={spring}
        style={{ background: activated ? "#fff" : "#c4c4c4" }}
      ></motion.div>
    </div>
  );
}

export default function Profile() {
  const { data: session } = useSession();
  const [notifications, setNotifications] = useState(false);
  const [sync, setSync] = useState(false);
  const [nightMode, setNightMode] = useState(true);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [subscription, setSubscription] = useState(null);
  const [registration, setRegistration] = useState(null);

  const subscribeOnClick = async (event) => {
    event.preventDefault();
    const sub = await registration.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: base64ToUint8Array(
        process.env.NEXT_PUBLIC_WEB_PUSH_PUBLIC_KEY
      ),
    });
    // TODO: you should call your API to save subscription data on server in order to send web push notification from server
    setSubscription(sub);
    setIsSubscribed(true);
    console.log("web push subscribed!");
    console.log(sub);
  };

  const unsubscribeOnClick = async (event) => {
    event.preventDefault();
    await subscription.unsubscribe();
    // TODO: you should call your API to delete or invalidate subscription data on server
    setSubscription(null);
    setIsSubscribed(false);
    console.log("web push unsubscribed!");
  };

  useEffect(() => {
    if (
      typeof window !== "undefined" &&
      "serviceWorker" in navigator &&
      window.workbox !== undefined
    ) {
      // run only in browser
      navigator.serviceWorker.ready.then((reg) => {
        reg.pushManager.getSubscription().then((sub) => {
          if (
            sub &&
            !(
              sub.expirationTime &&
              Date.now() > sub.expirationTime - 5 * 60 * 1000
            )
          ) {
            setSubscription(sub);
            setIsSubscribed(true);
          }
        });
        setRegistration(reg);
      });
    }
  }, []);

  const tap = { opacity: 0.6 };

  const spring = {
    type: "spring",
    stiffness: 700,
    damping: 30,
    duration: 0.1,
  };
  return (
    <div className={styles.container}>
      <h1>Profile</h1>

      {session ? (
        <>
          <Head>
            <title>Account | Overkill To-Do App</title>
          </Head>
          <div className={styles.user_container}>
            <div className={styles.profile_picture}>
              <Image
                alt={session.user.name}
                src={session.user.image}
                width={100}
                height={100}
              />
            </div>
            <div className={styles.user_text}>
              <p>{session.user.name}</p>
              <span>{session.user.email}</span>
            </div>
          </div>
          <section className={styles.user_buttons}>
            <motion.button transition={spring} whileTap={tap}>
              <i className="bi bi-tools"></i>Manage Account
            </motion.button>
            <motion.button
              transition={spring}
              whileTap={tap}
              onClick={() => signOut()}
            >
              <i className="bi bi-box-arrow-right"></i> logout
            </motion.button>
          </section>
          <section className={styles.settings_buttons}>
            <span>Settings</span>
            <motion.button
              transition={spring}
              whileTap={tap}
              onClick={isSubscribed ? unsubscribeOnClick : subscribeOnClick}
            >
              <i className="bi bi-bell"></i>Notifications
              <Toggle isActivated={isSubscribed} />
            </motion.button>
            <motion.button
              transition={spring}
              whileTap={tap}
              onClick={() => setSync(!sync)}
            >
              <i className="bi bi-arrow-repeat"></i>Sync
              <Toggle isActivated={sync} />
            </motion.button>
            <motion.button
              transition={spring}
              whileTap={tap}
              onClick={() => setNightMode(!nightMode)}
            >
              <i className="bi bi-moon"></i>Night mode
              <Toggle isActivated={nightMode} />
            </motion.button>
          </section>
          <section className={styles.help_buttons}>
            <span>Help</span>
            <a href="https://overkilltodoapp.vercel.app">
              <motion.button transition={spring} whileTap={tap}>
                <i className="bi bi-question-circle"></i>Help
              </motion.button>
            </a>
          </section>
        </>
      ) : (
        <div className={styles.login}>
          <img src="/greeter.svg" alt="Greeeter" />
          <h1>The only todo app you will ever need</h1>
          <div className={styles.login_button} onClick={() => signIn()}>
            Get Started
          </div>
        </div>
      )}
    </div>
  );
}
