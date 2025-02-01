import React, { useState } from "react";
import styles from "./NewLinkPopup.module.css";
import toast from "react-hot-toast";
import { createShortLink } from "../../services";

const NewLinkPopup = ({ onClose }) => {
  const [linkData, setLinkData] = useState({
    originalLink: "",
    remark: "",
    expire: "",
  });
  const [loading, setLoading] = useState(false);
  const [isExpirationEnabled, setIsExpirationEnabled] = useState(false);

  const isValidUrl = (url) => {
    const urlPattern = /^(https?:\/\/)?((([a-zA-Z\d]([a-zA-Z\d-]*[a-zA-Z\d])*)\.)+[a-zA-Z]{2,}|localhost|\d{1,3}(\.\d{1,3}){3})(:\d+)?(\/[-a-zA-Z\d%@_.~+&:]*)*(\?[;&a-zA-Z\d%@_.,~+&:=-]*)?(#[-a-zA-Z\d_]*)?$/;
    return urlPattern.test(url);
  };

  // const handleSubmit = async () => {
  //   if (linkData.originalLink === "" || linkData.remark === "") {
  //     toast.error("Please fill all the fields");
  //     return;
  //   }
  //   if (!isValidUrl(linkData.originalLink)) {
  //     toast.error("Please enter a valid URL");
  //     return;
  //   }
  //   localStorage.removeItem("loading")
  //   setLoading(true);
  //   try {
  //     const response = await createShortLink(linkData);
  //     if (response.message === "Short link created successfully.") {
  //       toast.success(response.message);
  //       setLinkData({
  //         originalLink:"",
  //         remark:"",
  //         expire:"",
  //       })
  //     }
  //   localStorage.setItem("loading",response.message)
  //   } catch (error) {
  //     toast.error(error.message);
  //   } finally {
  //     setLoading(false);
  //     onClose();
  //   }
  // };
  const handleSubmit = async () => {
    if (linkData.originalLink === "" || linkData.remark === "") {
      toast.error("Please fill all the fields");
      return;
    }
    if (!isValidUrl(linkData.originalLink)) {
      toast.error("Please enter a valid URL");
      return;
    }
  
    let formattedExpire = null;
    if (linkData.expire) {
      const localExpireDate = new Date(linkData.expire);
      formattedExpire = localExpireDate.toISOString();
    }
  
    localStorage.removeItem("loading");
    setLoading(true);
    
    try {
      const response = await createShortLink({
        ...linkData,
        expire: formattedExpire,
      });
      
      if (response.message === "Short link created successfully.") {
        toast.success(response.message);
        setLinkData({
          originalLink: "",
          remark: "",
          expire: "",
        });
      }
  
      // Set loading status in localStorage
      localStorage.setItem("loading", response.message);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
      onClose();
    }
  };
  

  return (
    <div className={styles.popupOverlay} onClick={onClose}>
      <div className={styles.popupContent} onClick={(e) => e.stopPropagation()}>
        <div className={styles.popupHeader}>
          <h3 className={styles.NewLinkText}>New Link</h3>
          <button onClick={onClose}>X</button>
        </div>
        <div className={styles.popupBody}>
          <label>
            Destination URL <span className={styles.span}>*</span>
            <input
              type="text"
              value={linkData.originalLink}
              onChange={(e) =>
                setLinkData({ ...linkData, originalLink: e.target.value })
              }
              placeholder="https://example.com"
            />
          </label>
          <div className={styles.remarks}>
            <label>
              Remarks <span className={styles.span}>*</span>
              <textarea
                value={linkData.remark}
                onChange={(e) =>
                  setLinkData({ ...linkData, remark: e.target.value })
                }
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
              value={linkData.expire}
              onChange={(e) =>
                setLinkData({ ...linkData, expire: e.target.value })
              }
            />
          )}
        </div>
        <div className={styles.popupFooter}>
          <button className={styles.clearButton} onClick={onClose}>
            Clear
          </button>
          <button disabled={loading} className={styles.createButton} onClick={handleSubmit}>
            {loading ? "Creating..." : "Create new"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default NewLinkPopup;
