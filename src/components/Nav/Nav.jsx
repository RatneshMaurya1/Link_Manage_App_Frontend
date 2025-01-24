import React, { useState } from "react";
import styles from "./nav.module.css";
import morningIcon from "../../assets/morning.png";
import searchIcon from "../../assets/search.png";
import NewLinkPopup from "../../components/NewLinkPopup/NewLinkPopup";

const Nav = () => {
  const name = localStorage.getItem("name");
  const shortName = name.slice(0, 2).toUpperCase();
  const [showPopup, setShowPopup] = useState(false);

  const handleCreateNewClick = () => {
    setShowPopup(true); 
  };

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  return (
    <div className={styles.navContainer}>
      <div className={styles.navContent1}>
        <div className={styles.navOption1}>
          <img src={morningIcon} alt="morning-image" />
          <p>Good morning, {name}</p>
        </div>
        <p>Tue, Jan 25</p>
      </div>
      <div className={styles.navContent2Wrapper}>
        <div className={styles.navContent2}>
          <div className={styles.create} onClick={handleCreateNewClick}>
            <h3>+</h3>
            <p>Create new</p>
          </div>
          <div className={styles.search}>
            <img src={searchIcon} alt="search-icon" />
            <input type="text" placeholder="Search by remarks" />
          </div>
        </div>
        <div className={styles.userLogo}>
          <p>{shortName}</p>
        </div>
      </div>

      {showPopup && <NewLinkPopup onClose={handleClosePopup} />}
    </div>
  );
};

export default Nav;
