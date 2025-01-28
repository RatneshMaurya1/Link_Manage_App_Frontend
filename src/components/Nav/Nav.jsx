import React, { useState, useEffect } from "react";
import styles from "./nav.module.css";
import morningIcon from "../../assets/morning.png";
import searchIcon from "../../assets/search.png";
import NewLinkPopup from "../../components/NewLinkPopup/NewLinkPopup";
import { useNavigate } from "react-router-dom";
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const Nav = () => {
  const name = localStorage.getItem("name");
  const shortName = name.slice(0, 2).toUpperCase();
  const [showPopup, setShowPopup] = useState(false);
  const [remark, setRemark] = useState("");
  const [showLogout, setShowLogout] = useState(false);
  const navigate = useNavigate();

  const handleCreateNewClick = () => {
    setShowPopup(true);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  const currentHour = new Date().getHours();
  let greeting = "Good morning";

  if (currentHour >= 12 && currentHour < 17) {
    greeting = `🕑 Good afternoon`;
  } else if (currentHour >= 17 && currentHour < 21) {
    greeting = " 🌆 Good evening";
  } else if (currentHour >= 21 || currentHour < 5) {
    greeting = "🌃 Good night";
  }

  let currentDateAndTime = new Date().toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    weekday: "short",
  });

  const handleRemarkClick = () => {
    navigate(`/link/${localStorage.getItem("userId")}`);
  };

  const handleRemarkChange = async (e) => {
    const input = e.target.value;
    setRemark(input);
    localStorage.setItem("input", e.target.value);

    try {
      const response = await fetch(
        `${BACKEND_URL}/user/links?search=${remark}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `${localStorage.getItem("token")}`,
          },
        }
      );
    } catch (error) {
      console.error("Error fetching links:", error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token")
    localStorage.removeItem("name")
    localStorage.removeItem("userId")
    localStorage.removeItem("input")
    navigate("/login")
  }

  return (
    <div className={styles.navContainer}>
      <div className={styles.navContent1}>
        <div className={styles.navOption1}>
          {greeting === "Good morning" && (
            <img src={morningIcon} alt="morning-image" />
          )}
          <p>
            {greeting}, {name}
          </p>
        </div>
        <p>{currentDateAndTime}</p>
      </div>
      <div className={styles.navContent2Wrapper}>
        <div className={styles.navContent2}>
          <div className={styles.create} onClick={handleCreateNewClick}>
            <h3>+</h3>
            <p>Create new</p>
          </div>
          <div className={styles.search}>
            <img src={searchIcon} alt="search-icon" />
            <input
              type="text"
              placeholder="Search by remarks"
              value={remark}
              onClick={handleRemarkClick}
              onChange={handleRemarkChange}
            />
          </div>
        </div>
        <div
          className={styles.userLogo}
          onClick={() => setShowLogout((prev) => !prev)}
        >
          <p>{shortName}</p>
        </div>
      </div>
      {showLogout && (
        <div className={styles.logout}>
          <p onClick={handleLogout}>Logout</p>
        </div>
      )}
      {showPopup && <NewLinkPopup onClose={handleClosePopup} />}
    </div>
  );
};

export default Nav;
