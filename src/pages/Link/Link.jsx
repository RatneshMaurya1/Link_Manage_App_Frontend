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
import EditLinkPopup from "../../components/EditLinkPopup/EditLinkPopup"
import { getLinkData } from "../../services";
import toast from "react-hot-toast";

const Link = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [showPopup, setShowPopup] = useState(false);
  const [showEditPopup, setShowEditPopup] = useState(false);
  const [linkData, setLinkData] = useState([]);

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
  useEffect(() => {
    const getLinks = async () => {
      try {
        const response = await getLinkData()
        setLinkData(response.links)
      } catch (error) {
        toast.error(error.message)
      }
    }
    getLinks()
  },[])
  const handleCopyLink = (link) => {
    navigator.clipboard.writeText(link)
    toast.success("Link copied to clipboard!")
  } 
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
        {linkData.length > 0 && linkData.map((link) => (
                <div className={styles.linkDetails} key={link._id}>
                <div className={styles.date}>
                  <p>Jan 14, 2025 16:30</p>
                </div>
                <div className={styles.originalLink}>
                  <p>{link.originalLink}</p>
                </div>
                <div className={styles.shortLink}>
                  <p>{link.shortLink}</p>
                  <img onClick={() => handleCopyLink(link.shortLink)} src={copyIcon} alt="copy-image" />
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
                  <img onClick={handleEditLinkClick} src={editIcon} alt="edit-image" />
                  <img
                    src={deleteIcon}
                    alt="delete-image"
                    onClick={handleDeleteClick}
                  />
                </div>
              </div>
        ))}
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

