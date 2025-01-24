import React, { useState } from "react";
import styles from "./editlinkpopup.module.css";

const EditLinkPopup = ({ onClose }) => {
  const [url, setUrl] = useState("");
  const [remarks, setRemarks] = useState("");
  const [expirationDate, setExpirationDate] = useState("");
  const [isExpirationEnabled, setIsExpirationEnabled] = useState(false);

  const handleSubmit = () => {
    console.log({ url, remarks, expirationDate, isExpirationEnabled });
    onClose(); 
  };

  return (
    <div className={styles.popupOverlay} onClick={onClose}>
      <div className={styles.popupContent} onClick={(e) => e.stopPropagation()}>
        <div className={styles.popupHeader}>
          <h3 className={styles.NewLinkText}>Edit Link</h3>
          <button onClick={onClose}>X</button>
        </div>
        <div className={styles.popupBody}>
          <label>
            Destination URL <span>*</span>
            <input
              type="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://example.com"
            />
          </label>
          <div className={styles.remarks}>
          <label>
            Remarks <span>*</span>
            <textarea
              value={remarks}
              onChange={(e) => setRemarks(e.target.value)}
              placeholder="Add remarks"
            ></textarea>
          </label>
          </div>
          <div className={styles.expirationToggle}>
            <span>Link Expiration</span>
            <div
              className={`${styles.toggleSwitch} ${
                isExpirationEnabled ? styles.active : ""
              }`}
              onClick={() => setIsExpirationEnabled(!isExpirationEnabled)}
            >
              <div className={styles.toggleThumb}></div>
            </div>
          </div>
          {isExpirationEnabled && (
              <input
                type="datetime-local"
                value={expirationDate}
                onChange={(e) => setExpirationDate(e.target.value)}
              />
          )}
        </div>
        <div className={styles.popupFooter}>
          <button className={styles.clearButton} onClick={onClose}>Clear</button>
          <button className={styles.createButton} onClick={handleSubmit}>Create new</button>
        </div>
      </div>
    </div>
  );
};

export default EditLinkPopup;

