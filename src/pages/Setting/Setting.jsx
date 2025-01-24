
import React from "react";
import styles from "./setting.module.css";
import cuvetteImage from "../../assets/cuvette.png";
import dashboardIcon from "../../assets/Icons.png";
import linkIcon from "../../assets/Icon1.png";
import AnalyticIcon from "../../assets/Icon2.png";
import settingIcon from "../../assets/setting.png";
import Nav from "../../components/Nav/Nav";
import { useNavigate, useParams } from "react-router-dom";

const Analytics = () => {
    const navigate = useNavigate()
    const {id} = useParams()
  return (
    <div className={styles.linkContainer}>
      <div className={styles.sidebar}>
        <img src={cuvetteImage} alt="cuvette-image" />
        <div className={styles.options}>
          <div className={styles.option1} onClick={() => navigate(`/dashboard/${id}`)}>
            <img src={dashboardIcon} alt="dashboardIcon-image" />
            <p>Dashboard</p>
          </div>
          <div
            className={styles.option1}
            onClick={() => navigate(`/link/${id}`)}
          >
            <img src={linkIcon} alt="link-icon" />
            <p>Link</p>
          </div>
          <div className={styles.option1} onClick={() => navigate(`/analytics/${id}`)}>
            <img src={AnalyticIcon} alt="Analytics-icon" />
            <p className={styles.dashboardText}>Analytics</p>
          </div>
        </div>
        <div className={styles.optionDashboard}  onClick={() => navigate(`/setting/${id}`)}>
          <img src={settingIcon} alt="setting-icon" />
          <h3 className={styles.dashboardText}>Settings</h3>
        </div>
      </div>
      <div className={styles.main}>
      <div className={styles.header}>
          <Nav />
        </div>
        <div className={styles.userDetails}>
            <div className={styles.name}>
                <p>Name</p>
                <input type="text" placeholder="name"/>
            </div>
            <div className={styles.name}>
                <p>Email id</p>
                <input type="text" placeholder="mobile"/>
            </div>
            <div className={styles.name}>
                <p>Mobile no.</p>
                <input type="text" placeholder="mobile"/>
            </div>
            <button className={styles.saveButton}>Save Changes</button>
            <button className={styles.deleteAccount}>Delete Account</button>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
