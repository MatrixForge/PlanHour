import React from "react";
import styles from "@styles/customiIcon.module.css"; // Import the new CSS module

interface CustomIIconProps {
  message: string;
}

const CustomIIcon: React.FC<CustomIIconProps> = ({ message }) => {
  return (
    <div className={styles.customIconContainer}>
      <button className={styles.iconButton}>
        <i className="bi bi-info-circle"></i>
      </button>
      <div className={styles.popup}>
        <div className={styles.popupContent}>{message}</div>
      </div>
    </div>
  );
};

export default CustomIIcon;
