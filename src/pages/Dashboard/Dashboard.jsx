import React, { useState, useEffect } from "react";
import styles from "./dashboard.module.css";
import cuvetteImage from "../../assets/cuvette.png";
import dashboardIcon from "../../assets/Icon.png";
import linkIcon from "../../assets/Icon1.png";
import AnalyticIcon from "../../assets/Icon2.png";
import settingIcon from "../../assets/Frame.png";
import Nav from "../../components/Nav/Nav";
import { useNavigate, useParams } from "react-router-dom";
import { getLinkData, getLinkDetailsData } from "../../services";

const Dashboard = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [linkData, setLinkData] = useState([]);
  const [detailsData, setDetailsData] = useState([]);
  const dateClicks = detailsData
    .map((click) => click.createdAt)
    .filter((date) => date);
  const totalCount = linkData?.reduce((sum, count) => sum + count.count, 0);

  const dateWiseClicks = dateClicks.reduce((acc, date) => {
    const formattedDate = new Date(date).toISOString().split("T")[0];
    const found = acc.find((item) => item.label === formattedDate);
    if (found) found.value += 1;
    else acc.push({ label: formattedDate, value: 1, widthPercentage: 0 });
    return acc;
  }, []);

  const deviceClicks = detailsData.reduce((acc, data) => {
    const device =
      data.deviceType === "smartphone" ? "Mobile" : data.deviceType;
    const found = acc.find((item) => item.label === device);
    if (found) found.value += 1;
    else acc.push({ label: device, value: 1, widthPercentage: 0 });
    return acc;
  }, []);

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
  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const response = await getLinkDetailsData();
        setDetailsData(response.links);
      } catch (error) {
        console.error(error.message);
      }
    };

    fetchDetails();
  }, []);
  return (
    <div className={styles.dashboardContainer}>
      <div className={styles.sidebar}>
        <img src={cuvetteImage} alt="cuvette-image" />
        <div className={styles.options}>
          <div className={styles.optionDashboard}>
            <img src={dashboardIcon} alt="dashboardIcon-image" />
            <h3 className={styles.dashboardText}>Dashboard</h3>
          </div>
          <div
            className={styles.option1}
            onClick={() => navigate(`/link/${id}`)}
          >
            <img src={linkIcon} alt="link-icon" />
            <p>Link</p>
          </div>
          <div
            className={styles.option1}
            onClick={() => navigate(`/analytics/${id}`)}
          >
            <img src={AnalyticIcon} alt="Analytics-icon" />
            <p>Analytics</p>
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
      <div className={styles.mainContent}>
        <div className={styles.header}>
          <Nav />
        </div>
        <div className={styles.totalClicks}>
          <h3>Total Clicks</h3>
          <p>{totalCount}</p>
        </div>

        <div className={styles.charts}>
          <div className={styles.chart}>
            <h3>Date-wise Clicks</h3>
            <div className={styles.barChart}>
              {dateWiseClicks.length > 0 ? (
                dateWiseClicks.map((item, index) => (
                  <div key={index} className={styles.bar}>
                    <p className={styles.label}>{item.label}</p>
                    <div className={styles.progressContainer}>
                      <div
                        className={styles.progress}
                        style={{ width: `${Math.floor((item.value/totalCount) * 100)}%` }}
                      ></div>
                    </div>
                    <p className={styles.value}>{item.value}</p>
                  </div>
                ))
              ) : (
                <p>No data right now.</p>
              )}
            </div>
          </div>
          <div className={styles.chart}>
            <h3>Click Devices</h3>
            <div className={styles.barChart}>
              {deviceClicks.length > 0 ? (
                deviceClicks.map((item, index) => (
                  <div key={index} className={styles.bar}>
                    <p className={styles.label}>{item.label}</p>
                    <div className={styles.progressContainer}>
                      <div
                        className={styles.progress}
                        style={{ width: `${Math.floor((item.value/totalCount) * 100)}%` }}
                      ></div>
                    </div>
                    <p className={styles.value}>{item.value}</p>
                  </div>
                ))
              ) : (
                <p>No data right now.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
