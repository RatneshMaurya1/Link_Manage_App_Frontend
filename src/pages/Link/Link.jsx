import React, { useEffect, useState } from "react";
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
import Popup from "../../components/DeleteLink/DeleteLink";
import EditLinkPopup from "../../components/EditLinkPopup/EditLinkPopup";
import { deleteLinkById, getLinkData } from "../../services";
import toast from "react-hot-toast";

const Link = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [showPopup, setShowPopup] = useState(false);
  const [showEditPopup, setShowEditPopup] = useState(false);
  const [linkData, setLinkData] = useState([]);
  const [idLink, setIdLink] = useState("");
  const [deleteLinkId, setDeleteLinkId] = useState("");
  const [loading, setLoading] = useState(false);
  const [sortBy, setSortBy] = useState({ type: "", order: "asc" });
  const [totalPages, setTotalPages] = useState(1);
  const [totalLinks, setTotalLinks] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  const input = localStorage.getItem("input");

  const fetchLinks = async () => {
    try {
      const response = await getLinkData({ page: currentPage, limit: 7 });
      if (response) {
        let updatedData = response.links || [];
  
        // Sorting logic
        if (sortBy.type) {
          updatedData = updatedData.sort((a, b) => {
            if (sortBy.type === "date") {
              return sortBy.order === "asc"
                ? new Date(a.createdAt) - new Date(b.createdAt)
                : new Date(b.createdAt) - new Date(a.createdAt);
            }
            if (sortBy.type === "status") {
              return sortBy.order === "asc"
                ? a.status.localeCompare(b.status)
                : b.status.localeCompare(a.status);
            }
            return 0;
          });
        }
  
        // Only update state if data has changed
        setLinkData((prevData) => {
          const prevDataJSON = JSON.stringify(prevData);
          const newDataJSON = JSON.stringify(updatedData);
          
          return prevDataJSON !== newDataJSON ? updatedData : prevData;
        });
  
        setTotalPages(response.totalPages);
        setTotalLinks(response.totalLinks);
      }
    } catch (error) {
      console.error(error.message);
    }
  };
  
  useEffect(() => {
    fetchLinks();
    const interval = setInterval(() => {
      fetchLinks();
    }, 5000);
  
    return () => clearInterval(interval);
  }, [currentPage, sortBy]); 
  useEffect(() => {
    localStorage.removeItem("input");
  }, []);

  const handleSortByDate = () => {
    setSortBy((prev) => ({
      type: "date",
      order: prev.order === "asc" ? "desc" : "asc",
    }));
  };

  const handleSortByStatus = () => {
    setSortBy((prev) => ({
      type: "status",
      order: prev.order === "asc" ? "desc" : "asc",
    }));
  };

  const handleCopyLink = (link) => {
    navigator.clipboard.writeText(link);
    toast.success("Link Copied", {
      icon: (
        <img src="https://res.cloudinary.com/dlmwurg10/image/upload/v1738346701/Vector_6_ryeizb.png" />
      ),
      position: "bottom-left",
      className: styles.toastMessage,
    });
  };

  const handleCancelDelete = () => {
    setShowPopup(false);
  };

  const handleEditLinkClick = (linkId) => {
    setIdLink(linkId);
    setShowEditPopup(true);
  };

  const handleCloseEditLinkPopup = () => {
    setShowEditPopup(false);
  };

  const handleConfirmDelete = async () => {
    setLoading(true);
    try {
      const response = await deleteLinkById(deleteLinkId);
      if (response.message === "Link deleted successfully.") {
        return toast.success(response.message);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setShowPopup(false);
      setLoading(false);
    }
  };
  const handleDeleteClick = (deleteId) => {
    setDeleteLinkId(deleteId);
    setShowPopup(true);
  };

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
    const savedPage = localStorage.getItem("currentPage");
    if (savedPage) {
      setCurrentPage(Number(savedPage));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("currentPage", currentPage);
  }, [currentPage]);

  const renderPaginationButtons = () => {
    let buttons = [];
    for (let i = 1; i <= totalPages; i++) {
      buttons.push(
        <button
          key={i}
          onClick={() => handlePageChange(i)}
          className={currentPage === i ? styles.activeButton : styles.nonActive}
        >
          {i}
        </button>
      );
    }
    return buttons;
  };

  const handlePageChange = (page) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
    }
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
            className={styles.optionDashboard}
            onClick={() => navigate(`/link/${id}`)}
          >
            <img src={linkIcon} alt="link-icon" />
            <h3 className={styles.dashboardText}>Link</h3>
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

      <div className={styles.main}>
        <div className={styles.header}>
          <Nav />
        </div>
        <div>
          <div className={styles.detailsWrapper}>
            <div className={styles.detailsHeader}>
              <div className={styles.dateImg}>
                <p>Date</p>
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
              <p>Remarks</p>
              <p>Clicks</p>
              <div className={styles.statusImg}>
                <p>Status</p>
                <img
                  className={styles.activeUpperSort}
                  src="https://res.cloudinary.com/dlmwurg10/image/upload/v1738320863/Vector_7_jkebor.png"
                  alt="upper-arrow"
                  onClick={handleSortByStatus}
                />
                <img
                  className={styles.activeLowerSort}
                  src="https://res.cloudinary.com/dlmwurg10/image/upload/v1738320852/Vector_6_cbh2zf.png"
                  alt="lower-arrow"
                  onClick={handleSortByStatus}
                />
              </div>
              <p>Action</p>
            </div>

            {linkData?.length > 0 ? (
              linkData.map((link) => (
                <div className={styles.linkDetails} key={link._id}>
                  <div className={styles.date}>
                    <p>{formatDateToIST(link.createdAt)}</p>
                  </div>
                  <div className={styles.originalLink}>
                    <p>{link.originalLink}</p>
                  </div>
                  <div className={styles.shortLink}>
                    <p>{link.shortLink}</p>
                    <img
                      onClick={() => handleCopyLink(link.shortLink)}
                      src={copyIcon}
                      alt="copy-image"
                    />
                  </div>
                  <div className={styles.remarks}>
                    <p>{link.remark}</p>
                  </div>
                  <div className={styles.clicks}>
                    <p>{link.count}</p>
                  </div>
                  <div className={styles.status}>
                    {link.status === "active" ? (
                      <h3 className={styles.active}>Active</h3>
                    ) : (
                      <h3 className={styles.inactive}>Inactive</h3>
                    )}
                  </div>
                  <div className={styles.action}>
                    <img
                      onClick={() => handleEditLinkClick(link._id)}
                      src={editIcon}
                      alt="edit-image"
                    />
                    <img
                      src={deleteIcon}
                      alt="delete-image"
                      onClick={() => handleDeleteClick(link._id)}
                    />
                  </div>
                </div>
              ))
            ) : (
              <p className={styles.notFound}>No records found</p>
            )}
          </div>
          {showPopup && (
            <Popup
              message=" Are you sure, you want to remove it ? "
              loading={loading}
              onConfirm={handleConfirmDelete}
              onCancel={handleCancelDelete}
            />
          )}
          {showEditPopup && (
            <EditLinkPopup idLink={idLink} onClose={handleCloseEditLinkPopup} />
          )}
        </div>
        <div className={styles.pagination}>
          {currentPage > 1 ? (
            <button
              className={styles.prev}
              onClick={() => handlePageChange(currentPage - 1)}
            >
              <img
                src="https://res.cloudinary.com/dlmwurg10/image/upload/v1738336324/Vector_8_qasadw.png"
                alt=""
              />
            </button>
          ) : (
            <button className={styles.prev}>
              <img
                src="https://res.cloudinary.com/dlmwurg10/image/upload/v1738336324/Vector_8_qasadw.png"
                alt=""
              />
            </button>
          )}
          {renderPaginationButtons()}
          {currentPage < totalPages ? (
            <button
              className={styles.prev}
              onClick={() => handlePageChange(currentPage + 1)}
            >
              <img
                src="https://res.cloudinary.com/dlmwurg10/image/upload/v1738336323/carat_uzihjo.png"
                alt=""
              />
            </button>
          ) : (
            <button className={styles.prev}>
              <img
                src="https://res.cloudinary.com/dlmwurg10/image/upload/v1738336323/carat_uzihjo.png"
                alt=""
              />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Link;
