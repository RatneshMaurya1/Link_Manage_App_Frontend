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
  const [detailsData, setDetailsData] = useState([]);
  const [sortedData, setSortedData] = useState([]);
  const [sortOrder, setSortOrder] = useState("asc");

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const itemsPerPage = 7;
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
        const response = await getLinkDetailsData(currentPage, itemsPerPage);

        setDetailsData(response.links);
        setTotalPages(response.totalPages || 1);

        const sorted = [...response.links].sort((a, b) =>
          sortOrder === "asc"
            ? new Date(a.time) - new Date(b.time)
            : new Date(b.time) - new Date(a.time)
        );
        setSortedData(sorted);
      } catch (error) {
        console.error(error.message);
      }
    };

    fetchLinks();
    const interval = setInterval(fetchLinks, 5000);
    return () => clearInterval(interval);
  }, [sortOrder, currentPage]);

  const handleSortByDate = () => {
    const newSortOrder = sortOrder === "asc" ? "desc" : "asc";
    setSortOrder(newSortOrder);

    const sorted = [...sortedData].sort((a, b) =>
      newSortOrder === "asc"
        ? new Date(a.time) - new Date(b.time)
        : new Date(b.time) - new Date(a.time)
    );
    setSortedData(sorted);
  };

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
        <div>
          <div className={styles.detailsWrapper}>
            <div className={styles.detailsHeader}>
              <div className={styles.dateImg}>
                <p>Timestamp</p>
                <img
                  className={styles.dateUpperSort}
                  src="https://res.cloudinary.com/dlmwurg10/image/upload/v1738320863/Vector_7_jkebor.png"
                  alt="upper-arrow"
                  onClick={handleSortByDate}
                />
                <img
                  className={styles.dateLowerSort}
                  src="https://res.cloudinary.com/dlmwurg10/image/upload/v1738320852/Vector_6_cbh2zf.png"
                  alt="lower-arrow"
                  onClick={handleSortByDate}
                />
              </div>
              <p>Original Link</p>
              <p>Short Link</p>
              <p>IP Address</p>
              <p>User Device</p>
            </div>
            {sortedData?.length > 0 ? (
              sortedData.map((detail) => (
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
              ))
            ) : (
              <p className={styles.notFound}>No records found</p>
            )}
          </div>
          <div className={styles.pagination}>
            <button
              className={styles.prev}
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
            >
              <img
                src="https://res.cloudinary.com/dlmwurg10/image/upload/v1738336324/Vector_8_qasadw.png"
                alt=""
              />
            </button>
            <div className={styles.activeButton}>{currentPage}</div>
            <button
              className={styles.prev}
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              disabled={currentPage === totalPages}
            >
              <img
                src="https://res.cloudinary.com/dlmwurg10/image/upload/v1738336323/carat_uzihjo.png"
                alt=""
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
