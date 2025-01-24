import React from "react";
import styles from "./deleteaccount.module.css";

const DeleteAccount = ({ message, onConfirm, onCancel }) => {
  return (
    <div className={styles.popupOverlay} onClick={onCancel}>
      <div className={styles.popupContent} onClick={(e) => e.stopPropagation()}>
        <p>{message}</p>
        <div className={styles.buttonGroup}>
          <button className={styles.cancelButton} onClick={onCancel}>No</button>
          <button className={styles.confirmButton} onClick={onConfirm}>Yes</button>
        </div>
        <button onClick={onCancel} className={styles.close}>X</button>
      </div>
    </div>
  );
};

export default DeleteAccount;
