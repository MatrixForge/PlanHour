"use client";
import React from 'react';
import styles from '@styles/addGuestPopUp.module.css';
import { Button } from 'react-bootstrap';

const AddGuestPopUp = ({ show, handleClose }) => {
  return (
    <div className={`${styles.popup} ${show ? styles.show : ''}`}>
      <div className={styles.coverImage} style={{ backgroundImage: `url('/cover.png')` }}>
        <button className={styles.closeButton} onClick={handleClose}><i className="bi bi-x-lg"></i></button>
        <div className={styles.optionsBackground}>
          <h2 className={`${styles.optionsHeader}`}>Add Guest</h2>
          <div className={styles.options}>
            <div className={`mb-3 ${styles.formGroup}`}>
              <label htmlFor="title" className={`${styles.formLabel}`}>Name</label>
              <input type="text" className={`${styles.formControl}`} id="title" required />
            </div>
            <div className={`mb-3 ${styles.formGroup}`}>
              <label htmlFor="title" className={`${styles.formLabel}`}>Email</label>
              <input type="text" className={`${styles.formControl}`} id="title" required />
            </div>
            <div className={`mb-3 ${styles.formGroup}`}>
              <label htmlFor="title" className={`${styles.formLabel}`}>Number</label>
              <input type="text" className={`${styles.formControl}`} id="title" required />
            </div>
            <div className={`${styles.formActions}`}>
              <Button variant="secondary" className={`${styles.cancelButton}`}>Cancel</Button>
              <Button variant="primary" type="submit" className={`${styles.saveButton}`}>Create</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddGuestPopUp;
