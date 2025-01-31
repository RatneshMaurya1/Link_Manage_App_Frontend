import React, { useEffect, useState } from "react";
import styles from "./setting.module.css";
import cuvetteImage from "../../assets/cuvette.png";
import dashboardIcon from "../../assets/Icons.png";
import linkIcon from "../../assets/Icon1.png";
import AnalyticIcon from "../../assets/Icon2.png";
import settingIcon from "../../assets/setting.png";
import Nav from "../../components/Nav/Nav";
import { useNavigate, useParams } from "react-router-dom";
import DeleteAccount from "../../components/DeleteAccount/DeleteAccount";
import toast from "react-hot-toast";
import { deleteUser, userData, userUpdate } from "../../services";

const Analytics = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [deleteloading, setDeleteLoading] = useState(false);
  const [userDetail, setUserDetail] = useState({
    name: "",
    email: "",
    phone: "",
  });
  const [originalUserDetail, setOriginalUserDetail] = useState({});
  const [loading, setLoading] = useState(false);

  const handleDeleteClick = () => {
    setShowDeletePopup(true);
  };

  const handleConfirmDelete = async () => {
    setDeleteLoading(true);
    try {
      const response = await deleteUser();
      if (response.message === "User deleted successfully.") {
        toast.success(response.message);
        logoutUser();
        return;
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setShowDeletePopup(false);
      setDeleteLoading(false);
    }
  };

  const handleCancelDelete = () => {
    setShowDeletePopup(false);
  };

  useEffect(() => {
    const userDetails = async () => {
      try {
        const response = await userData();
        setUserDetail(response.user);
        setOriginalUserDetail(response.user);
      } catch (error) {
        toast.error(error.message);
      }
    };
    userDetails();
  }, []);

  const handleUserDetails = async () => {
    const updatedFields = getUpdatedFields();
    if (Object.keys(updatedFields).length === 0) {
      toast.error("Please provide at least one field to update.");
      return;
    }

    setLoading(true);
    try {
      const response = await userUpdate(updatedFields);
      if (response.message === "Your data updated successfully.") {
        toast.success(response.message);

        if (updatedFields.email) {
          toast.success("Email updated. You will be logged out.");
          logoutUser();
          return;
        }

        setOriginalUserDetail({ ...originalUserDetail, ...updatedFields });
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const logoutUser = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };
  const getUpdatedFields = () => {
    const updatedFields = {};
    for (const key in userDetail) {
      if (userDetail[key] !== originalUserDetail[key]) {
        updatedFields[key] = userDetail[key];
      }
    }
    return updatedFields;
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
          <div
            className={styles.option1}
            onClick={() => navigate(`/analytics/${id}`)}
          >
            <img src={AnalyticIcon} alt="Analytics-icon" />
            <p className={styles.dashboardText}>Analytics</p>
          </div>
        </div>
        <div
          className={styles.optionDashboard}
          onClick={() => navigate(`/setting/${id}`)}
        >
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
            <input
              type="text"
              placeholder="Name"
              value={userDetail.name}
              onChange={(e) =>
                setUserDetail({ ...userDetail, name: e.target.value })
              }
            />
          </div>
          <div className={styles.name}>
            <p>Email id</p>
            <input
              type="text"
              placeholder="Email"
              value={userDetail.email}
              onChange={(e) =>
                setUserDetail({ ...userDetail, email: e.target.value })
              }
            />
          </div>
          <div className={styles.name}>
            <p>Mobile no.</p>
            <input
              type="text"
              placeholder="Mobile number"
              value={userDetail.phone}
              onChange={(e) =>
                setUserDetail({ ...userDetail, phone: e.target.value })
              }
            />
          </div>
          <button
            className={styles.saveButton}
            onClick={handleUserDetails}
            disabled={loading}
          >
            {loading ? "Saving..." : "Save Changes"}
          </button>
          <button
            disabled={deleteloading}
            className={styles.deleteAccount}
            onClick={handleDeleteClick}
          >
            {deleteloading ? "Loading..." : "Delete Account"}
          </button>
        </div>
      </div>
      {showDeletePopup && (
        <DeleteAccount
          message="Are you sure, you want to delete the account?"
          onConfirm={handleConfirmDelete}
          onCancel={handleCancelDelete}
        />
      )}
    </div>
  );
};

export default Analytics;
