"use client";
import React from 'react';
import styles from '@styles/folderOptions.module.css';

const FolderOptionsModal = ({ show, handleClose }) => {
  return (
    <div className={`${styles.popup1} ${show ? styles.show : ''}`}>
      <div className={styles.coverImage} style={{ backgroundImage: `url('/cover.png')` }}>
        <button className={styles.closeButton} onClick={handleClose}><i className="bi bi-x-lg"></i></button>
        <div className={styles.optionsBackground}>
          <h2 className={`${styles.optionsHeader}`}>Navigate</h2>
          <div className={styles.options}>
            <button className={`${styles.button2}`}>
              <img className={`${styles.optionsIcon}`} src='clipboard.png' alt='add-plan-icon'/>
              <div className={`${styles.optionsText}`}>Add Plan</div>
            </button>
            <button className={`${styles.button3}`}>
              <img className={`${styles.optionsIcon}`} src='checklist.png' alt='add-plan-icon'/>
              <div className={`${styles.optionsText}`}>To-Do</div>
            </button>
            <button className={`${styles.button1}`}>
              <img className={`${styles.optionsIcon}`} src='budget.png' alt='add-plan-icon'/>
              <div className={`${styles.optionsText}`}>Budget</div>
            </button>
            <button className={`${styles.button2}`}>
              <img className={`${styles.optionsIcon}`} src='group.png' alt='add-plan-icon'/>
              <div className={`${styles.optionsText}`}>Guest List</div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FolderOptionsModal;
