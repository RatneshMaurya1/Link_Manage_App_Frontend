import React, { useState, useEffect } from "react";
import styles from "./Analytics.module.css";
import cuvetteImage from "../../assets/cuvette.png";
import dashboardIcon from "../../assets/Icons.png";
import linkIcon from "../../assets/Icon1.png";
import AnalyticIcon from "../../assets/analytics.png";
import settingIcon from "../../assets/Frame.png";
import Nav from "../../components/Nav/Nav";
import { useNavigate, useParams } from "react-router-dom";
import { getLinkDetailsData } from "../../services";

const Analytics = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [detailsData, setDetailsData] = useState();

const formatDateToIST = (utcDate) => {
  const date = new Date(utcDate);
  return date.toLocaleString("en-US", {
    year: "numeric",
    month: "short",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
    timeZone: "Asia/Kolkata",
  });
};

  useEffect(() => {
    const fetchLinks = async () => {
      try {
        const response = await getLinkDetailsData();
        console.log(response);
        setDetailsData(response.links);
      } catch (error) {
        console.error(error.message);
      }
    };

    fetchLinks();

    const interval = setInterval(fetchLinks, 5000);

    return () => clearInterval(interval);
  }, []);
  return (
    <div className={styles.linkContainer}>
      <div className={styles.sidebar}>
        <img src={cuvetteImage} alt="cuvette-image" />
        <div className={styles.options}>
          <div
            className={styles.option1}
            onClick={() => navigate(`/dashboard/${id}`)}
          >
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
        <div
          className={styles.setting}
          onClick={() => navigate(`/setting/${id}`)}
        >
          <img src={settingIcon} alt="setting-icon" />
          <p>Settings</p>
        </div>
      </div>
      <div className={styles.main}>
        <div className={styles.header}>
          <Nav />
        </div>
        <div className={styles.detailsWrapper}>
        <div className={styles.detailsHeader}>
          <p>Timestamp</p>
          <p>Original Link</p>
          <p>Short Link</p>
          <p>ip address</p>
          <p>User Device</p>
        </div>
        {detailsData?.length > 0 &&
          detailsData.map((detail) => (
            <div className={styles.linkDetails} key={detail._id}>
              <div className={styles.date}>
                <p>{formatDateToIST(detail.time)}</p>
              </div>
              <div className={styles.originalLink}>
                <p>{detail.linkId.originalLink}</p>
              </div>
              <div className={styles.shortLink}>
                <p>{detail.linkId.shortLink}</p>
              </div>
              <div className={styles.ipAddress}>
                <p>{detail.ipAdress}</p>
              </div>
              <div className={styles.userDevice}>
                <p>{detail.userDevice}</p>
              </div>
            </div>
          ))}
          </div>
      </div>
    </div>
  );
};

export default Analytics;
