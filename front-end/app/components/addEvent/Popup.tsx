import React from "react";
import styles from "@styles/popup.module.css"; // Ensure this path is correct

const Popup: React.FC<{ message: string; onClose: () => void }> = ({
  message,
  onClose,
}) => {
  return (
    <div className={styles.popup}>
      <div className={styles.popupContent}>
        <span className={styles.popupMessage}>{message}</span>
        <button className={styles.closeButton} onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
};

export default Popup;
