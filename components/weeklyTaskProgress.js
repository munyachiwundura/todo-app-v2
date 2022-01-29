import styles from '../styles/weeklyTaskProgress.module.css'

export default function WeeklyTaskProgress(props) {
    
    console.log(props.data)
    const totals = props.data.map((x) => x.total)
    const highest = Math.max(...totals)
    
  return (
  <div className={styles.container}>
      <span className={styles.title}>Completed in the last 7 Days</span>
      <div className={styles.stick_container}>
        {props.data.map((x) => <CandleStick day={x.day} completed={x.completed/highest} total={x.total/highest}/>)}
      </div>
    
      <div className={styles.box}></div>
     
      <div className={styles.line}></div>
      <div className={styles.line_horizontal}></div>
      <p style={{top: '35px'}} className={styles.label}>{highest}</p>
      <p style={{top: '75px'}} className={styles.label}>{Math.round(highest/2)}</p>
      <p style={{top: '110px'}} className={styles.label}>0</p>
  </div>
  )}

function CandleStick(props) {
    return (
        <div className={styles.stick}>
            <div className={styles.stick_total_container}>
            <div style={{height: `${props.total * 80}px `}} className={styles.total}>
                <div style={{height: `${props.completed * 80}px `}} className={styles.completed}>

                </div>
            </div>
            </div>
            <span>{props.day}</span>
        </div>
    )
}
