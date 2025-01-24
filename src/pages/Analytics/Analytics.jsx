import React from "react";
import styles from "./Analytics.module.css";
import cuvetteImage from "../../assets/cuvette.png";
import dashboardIcon from "../../assets/Icons.png";
import linkIcon from "../../assets/Icon1.png";
import AnalyticIcon from "../../assets/analytics.png";
import settingIcon from "../../assets/Frame.png";
import copyIcon from "../../assets/copy.png";
import editIcon from "../../assets/edit.png";
import deleteIcon from "../../assets/delete.png";
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
          <div className={styles.optionDashboard}>
            <img src={AnalyticIcon} alt="Analytics-icon" />
            <h3 className={styles.dashboardText}>Analytics</h3>
          </div>
        </div>
        <div className={styles.setting}  onClick={() => navigate(`/setting/${id}`)}>
          <img src={settingIcon} alt="setting-icon" />
          <p>Settings</p>
        </div>
      </div>
      <div className={styles.main}>
      <div className={styles.header}>
          <Nav />
        </div>
        <div className={styles.detailsHeader}>
            <p>Timestamp</p>
            <p>Original Link</p>
            <p>Short Link</p>
            <p>ip address</p>
            <p>User Device</p>
        </div>
        <div className={styles.linkDetails}>
            <div className={styles.date}>
            <p>Jan 14, 2025 16:30</p>
            </div>
            <div className={styles.originalLink}>
            <p>{"https://www.travelwiththejoneses.com".slice(0,30)}</p>
            </div>
            <div className={styles.shortLink}>
            <p>{"https://www.travelwiththejoneses.com".slice(0,30)}</p>
            </div>
            <div className={styles.ipAddress}>
                <p>192.158.1.38</p>
            </div>
            <div className={styles.userDevice}>
                <p>Adroid</p>
            </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
