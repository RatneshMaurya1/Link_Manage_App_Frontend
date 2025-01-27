import React, { useState,useEffect } from "react";
import styles from "./dashboard.module.css";
import cuvetteImage from "../../assets/cuvette.png";
import dashboardIcon from "../../assets/Icon.png";
import linkIcon from "../../assets/Icon1.png";
import AnalyticIcon from "../../assets/Icon2.png";
import settingIcon from "../../assets/Frame.png";
import Nav from "../../components/Nav/Nav";
import { useNavigate, useParams } from "react-router-dom";
import { getLinkData } from "../../services";

const Dashboard = () => {
  const navigate = useNavigate()
  const {id } = useParams()
  const [linkData,setLinkData] = useState([])
  const dateWiseClicks = [
    { label: "21-01-25", value: 1234, widthPercentage: 90 },
    { label: "20-01-25", value: 1140, widthPercentage: 80 },
    { label: "19-01-25", value: 134, widthPercentage: 20 },
    { label: "18-01-25", value: 34, widthPercentage: 5 },
    { label: "17-01-25", value: 234, widthPercentage: 40 },
  ];

  const deviceClicks = [
    { label: "Mobile", value: 134, widthPercentage: 85 },
    { label: "Desktop", value: 40, widthPercentage: 25 },
    { label: "Tablet", value: 3, widthPercentage: 5 },
  ];

  useEffect(() => {
    const fetchLinks = async () => {
      try {
        const response = await getLinkData();
        setLinkData(response.links);
      } catch (error) {
        console.error(error.message);
      }
    };

    fetchLinks();
  }, []);
  console.log(linkData)

  return (
    <div className={styles.dashboardContainer}>
      <div className={styles.sidebar}>
        <img src={cuvetteImage} alt="cuvette-image" />
        <div className={styles.options}>
          <div className={styles.optionDashboard}>
            <img src={dashboardIcon} alt="dashboardIcon-image" />
            <h3 className={styles.dashboardText}>Dashboard</h3>
          </div>
          <div className={styles.option1} onClick={() => navigate(`/link/${id}`)}>
            <img src={linkIcon} alt="link-icon" />
            <p>Link</p>
          </div>
          <div className={styles.option1} onClick={() => navigate(`/analytics/${id}`)}>
            <img src={AnalyticIcon} alt="Analytics-icon" />
            <p>Analytics</p>
          </div>
        </div>
        <div className={styles.setting}  onClick={() => navigate(`/setting/${id}`)}>
          <img src={settingIcon} alt="setting-icon" />
          <p>Settings</p>
        </div>
      </div>
      <div className={styles.mainContent}>
        <div className={styles.header}>
          <Nav />
        </div>
        <div className={styles.totalClicks}>
          <h3>Total Clicks</h3>
          <p>1234</p>
        </div>

        <div className={styles.charts}>
          <div className={styles.chart}>
            <h3>Date-wise Clicks</h3>
            <div className={styles.barChart}>
              {dateWiseClicks.map((item, index) => (
                <div key={index} className={styles.bar}>
                  <p className={styles.label}>{item.label}</p>
                  <div className={styles.progressContainer}>
                  <div
                    className={styles.progress}
                    style={{ width: `${item.widthPercentage}%` }}
                  ></div>
                  </div>
                  <p className={styles.value}>{item.value}</p>
                </div>
              ))}
            </div>
          </div>
          <div className={styles.chart}>
            <h3>Click Devices</h3>
            <div className={styles.barChart}>
              {deviceClicks.map((item, index) => (
                <div key={index} className={styles.bar}>
                  <p className={styles.label}>{item.label}</p>
                  <div className={styles.progressContainer}>
                  <div
                    className={styles.progress}
                    style={{ width: `${item.widthPercentage}%` }}
                  ></div>
                  </div>
                  <p className={styles.value}>{item.value}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
