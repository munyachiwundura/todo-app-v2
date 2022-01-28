import styles from '../styles/OverallTasksProgress.module.css'

const OverallTasksProgress = () => {
    return ( 
        <div className={styles.container}>
            <div className={styles.text_container}>
                <span>Monthly Goals</span>
                <p className={styles.title}>60/80 Tasks</p>
                <span>You have completed</span>
                <br></br>
                <span>60/80 Tasks this month</span>
                <br></br>
                <button className={styles.button}>All Tasks</button>
            </div>
            <div>
            <svg className={styles.progress_indicator}  width="75" height="75" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
<mask id="path-1-inside-1_244_138" fill="white">
<path className={styles.arc} d="M50 4.29373C50 1.92237 51.9262 -0.0191689 54.2889 0.184157C65.8368 1.17796 76.7324 6.16181 85.0595 14.3513C94.4113 23.5485 99.7745 36.0521 99.9931 49.1668C100.212 62.2815 95.2681 74.9569 86.228 84.4606C77.1879 93.9643 64.7754 99.5351 51.6662 99.9722C38.557 100.409 25.8009 95.6777 16.1479 86.7972C6.49488 77.9168 0.717964 65.5988 0.0624749 52.4987C-0.593014 39.3986 3.92543 26.5655 12.6438 16.7658C20.4069 8.03984 30.9463 2.34129 42.4024 0.58048C44.7462 0.220229 46.7975 2.02915 46.9555 4.39524V4.39524C47.1134 6.76134 45.3165 8.78481 42.9795 9.18675C33.773 10.7701 25.3247 15.4316 19.0597 22.4738C11.8387 30.5903 8.09629 41.2194 8.6392 52.0696C9.18211 62.9198 13.9669 73.1221 21.962 80.4773C29.9571 87.8326 40.5223 91.7516 51.38 91.3895C62.2378 91.0275 72.5184 86.4135 80.0059 78.542C87.4933 70.6706 91.5878 60.1721 91.4068 49.3099C91.2258 38.4476 86.7837 28.0915 79.0381 20.4739C72.3178 13.8648 63.5778 9.77637 54.2863 8.80975C51.9277 8.56438 50 6.66509 50 4.29373V4.29373Z"/>
</mask>
<path className={styles.arc} 
d="M50 4.29373C50 1.92237 51.9262 -0.0191689 54.2889 0.184157C65.8368 1.17796 76.7324 6.16181 85.0595 14.3513C94.4113 23.5485 99.7745 36.0521 99.9931 49.1668C100.212 62.2815 95.2681 74.9569 86.228 84.4606C77.1879 93.9643 64.7754 99.5351 51.6662 99.9722C38.557 100.409 25.8009 95.6777 16.1479 86.7972C6.49488 77.9168 0.717964 65.5988 0.0624749 52.4987C-0.593014 39.3986 3.92543 26.5655 12.6438 16.7658C20.4069 8.03984 30.9463 2.34129 42.4024 0.58048C44.7462 0.220229 46.7975 2.02915 46.9555 4.39524V4.39524C47.1134 6.76134 45.3165 8.78481 42.9795 9.18675C33.773 10.7701 25.3247 15.4316 19.0597 22.4738C11.8387 30.5903 8.09629 41.2194 8.6392 52.0696C9.18211 62.9198 13.9669 73.1221 21.962 80.4773C29.9571 87.8326 40.5223 91.7516 51.38 91.3895C62.2378 91.0275 72.5184 86.4135 80.0059 78.542C87.4933 70.6706 91.5878 60.1721 91.4068 49.3099C91.2258 38.4476 86.7837 28.0915 79.0381 20.4739C72.3178 13.8648 63.5778 9.77637 54.2863 8.80975C51.9277 8.56438 50 6.66509 50 4.29373V4.29373Z" 
stroke="url(#paint0_linear_244_138)" stroke-width="20" stroke-linecap="round" mask="url(#path-1-inside-1_244_138)"/>
<defs>
<linearGradient id="paint0_linear_244_138" x1="12.2449" y1="81.5" x2="91.4085" y2="2.40703" gradientUnits="userSpaceOnUse">
<stop stop-color="#F7B5E4"/>
<stop offset="1" stop-color="#93C8E5"/>
</linearGradient>
</defs>
</svg>
            </div>
        </div>
     );
}
 
export default OverallTasksProgress;