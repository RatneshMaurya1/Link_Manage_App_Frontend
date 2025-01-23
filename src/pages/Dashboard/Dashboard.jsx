import React from 'react'
import styles from './dashboard.module.css'
import cuvetteImage from "../../assets/cuvette.png"
import dashboardIcon from "../../assets/Icon.png"
import linkIcon from "../../assets/Icon1.png"
import AnalyticIcon from "../../assets/Icon2.png"
import settingIcon from "../../assets/Frame.png"

const Dashboard = () => {
  return (
    <div className={styles.dashboardContainer}>
      <div className={styles.sidebar}>
        <img src={cuvetteImage} alt="cuvette-image" />
        <div className={styles.options}>
            <div className={styles.option1}>
                <img src={dashboardIcon} alt="dashboardIcon-image" />
                <h3 className={styles.dashboardText}>Dashboard</h3>
            </div>
            <div className={styles.option1}>
                <img src={linkIcon} alt="link-icon" />
                <p>Link</p>
            </div>
            <div className={styles.option1}>
                <img src={AnalyticIcon} alt="Analytics-icon" />
                <p>Analytics</p>
            </div>
        </div>
        <div className={styles.setting}>
            <img src={settingIcon} alt="setting-icon" />
            <p>Settings</p>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
