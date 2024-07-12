import React from 'react';
import styles from '../../styles/TermsOfServicePrivacyPolicy.module.css';
import styles1 from '../../styles/custom-colors.module.css'; 

const Popup = ({ children, onClose }) => {
  return (
    <div className={styles.popupOverlay}>
      <div className={styles.popup}>
        {children}
        <div className='d-flex justify-content-end align-items-end '>
            <button className={`${styles.closeButton} ${styles1.customBrown}`} onClick={onClose}>Close</button>

        </div>
      </div>
    </div>
  );
};

export default Popup;
