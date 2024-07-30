import React from "react";
import styles from "@styles/popup.module.css"; // Ensure this path is correct

const Popup: React.FC<{
  message: string;
  type: "success" | "error";
  onClose: () => void;
}> = ({ message, type, onClose }) => {
  return (
    <div className={styles.popup}>
      <div
        className={`${styles.popupContent} ${
          type === "error" ? styles.error : styles.success
        }`}
      >
        <span className={styles.popupMessage}>{message}</span>
      </div>
    </div>
  );
};

export default Popup;
