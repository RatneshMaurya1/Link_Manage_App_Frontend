import React, { useState } from "react";
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
import EditLinkPopup from "../../components/EditLinkPopup/EditLinkPopup"

const Link = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [showPopup, setShowPopup] = useState(false);
  const [showEditPopup, setShowEditPopup] = useState(false);

  const handleDeleteClick = () => {
    setShowPopup(true);
  };

  const handleConfirmDelete = () => {
    console.log("Item deleted");
    setShowPopup(false);
  };

  const handleCancelDelete = () => {
    setShowPopup(false);
  };

  const handleEditLinkClick = () => {
    setShowEditPopup(true); 
  };

  const handleCloseEditLinkPopup = () => {
    setShowEditPopup(false);
  };
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
          <div className={styles.option1} onClick={() => navigate(`/analytics/${id}`)}>
            <img src={AnalyticIcon} alt="Analytics-icon" />
            <p>Analytics</p>
          </div>
        </div>
        <div className={styles.setting} onClick={() => navigate(`/setting/${id}`)}>
          <img src={settingIcon} alt="setting-icon" />
          <p>Settings</p>
        </div>
      </div>
      <div className={styles.main}>
        <div className={styles.header}>
          <Nav />
        </div>
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
            <p>{"https://www.travelwiththejoneses.com/".slice(0, 18)}</p>
          </div>
          <div className={styles.shortLink}>
            <p>{"https://www.travelwiththejoneses.com/".slice(0, 10)}</p>
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
            <img onClick={handleEditLinkClick} src={editIcon} alt="edit-image" />
            <img
              src={deleteIcon}
              alt="delete-image"
              onClick={handleDeleteClick}
            />
          </div>
        </div>
        {showPopup && (
          <Popup
            message=" Are you sure, you want to remove it ? "
            onConfirm={handleConfirmDelete}
            onCancel={handleCancelDelete}
          />
        )}
        {showEditPopup && <EditLinkPopup onClose={handleCloseEditLinkPopup} />}
      </div>
    </div>
  );
};

export default Link;

