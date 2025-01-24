import React from "react";
import styles from "./link.module.css";
import cuvetteImage from "../../assets/cuvette.png";
import dashboardIcon from "../../assets/Icons.png";
import linkIcon from "../../assets/blueLink.png";
import AnalyticIcon from "../../assets/Icon2.png";
import settingIcon from "../../assets/Frame.png";
import copyIcon from "../../assets/copy.png";
import editIcon from "../../assets/edit.png";
import deleteIcon from "../../assets/delete.png";
import Nav from "../../components/Nav/Nav";
import { useNavigate, useParams } from "react-router-dom";

const Link = () => {
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
            className={styles.optionDashboard}
            onClick={() => navigate(`/link/${id}`)}
          >
            <img src={linkIcon} alt="link-icon" />
            <h3 className={styles.dashboardText}>Link</h3>
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
      <div className={styles.main}>
        <Nav/>
        <div className={styles.detailsHeader}>
            <p>Date</p>
            <p>Original Link</p>
            <p>Short Link</p>
            <p>Remarks</p>
            <p>Clicks</p>
            <p>Status</p>
            <p>Action</p>
        </div>
        <div className={styles.linkDetails}>
            <div className={styles.date}>
            <p>Jan 14, 2025 16:30</p>
            </div>
            <div className={styles.originalLink}>
            <p>{"https://www.travelwiththejoneses.com/".slice(0,18)}</p>
            </div>
            <div className={styles.shortLink}>
            <p>{"https://www.travelwiththejoneses.com/".slice(0,10)}</p>
            <img src={copyIcon} alt="copy-image" />
            </div>
            <div className={styles.remarks}>
                <p>campaign1</p>
            </div>
            <div className={styles.clicks}>
                <p>5</p>
            </div>
            <div className={styles.status}>
                <p>Active</p>
            </div>
            <div className={styles.action}>
                <img src={editIcon} alt="edit-image" />
                <img src={deleteIcon} alt="delete-image" />
            </div>
        </div>
      </div>
    </div>
  );
};

export default Link;
