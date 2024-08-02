import React, { useState } from "react";
import styles from "@styles/customiIcon.module.css"; // Import the new CSS module

interface CustomIIconProps {
  message: string;
}

const CustomIIcon: React.FC<CustomIIconProps> = ({ message }) => {
  const [isPopupVisible, setIsPopupVisible] = useState(false);

  const togglePopup = () => {
    setIsPopupVisible(!isPopupVisible);
  };

  return (
    <div className={styles.customIconContainer}>
      <button className={styles.iconButton} onClick={togglePopup}>
        <i className="bi bi-info-circle"></i>
      </button>
      {isPopupVisible && (
        <div className={styles.popup}>
          <div className={styles.popupContent}>{message}</div>
        </div>
      )}
    </div>
  );
};

export default CustomIIcon;
