import React from "react";
import styles from "@styles/contactUs.module.css"; // Import the new CSS module
import { Button } from "react-bootstrap";

const ContactUs: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  return (
    <div className={`${styles.popup} ${styles.show}`}>
      <div
        className={styles.coverImage}
        style={{ backgroundImage: `url('/cover.png')` }}
      >
        <button className={styles.closeButton} onClick={onClose}>
          <i className="bi bi-x-lg"></i>
        </button>
        <div className={styles.optionsBackground}>
          <h2 className={`${styles.optionsHeader}`}>Contact Us</h2>
          <div className={styles.options}>
            <div className={`mb-3 ${styles.formGroup}`}>
              <label htmlFor="name" className={`${styles.formLabel}`}>
                Name
              </label>
              <input
                type="text"
                className={`${styles.formControl}`}
                id="name"
                required
              />
            </div>
            <div className={`mb-3 ${styles.formGroup}`}>
              <label htmlFor="email" className={`${styles.formLabel}`}>
                Email
              </label>
              <input
                type="email"
                className={`${styles.formControl}`}
                id="email"
                required
              />
            </div>
            <div className={`mb-3 ${styles.formGroup}`}>
              <label htmlFor="number" className={`${styles.formLabel}`}>
                Number
              </label>
              <input
                type="tel"
                className={`${styles.formControl}`}
                id="number"
                required
              />
            </div>
            <div className={`mb-3 ${styles.formGroup}`}>
              <label htmlFor="message" className={`${styles.formLabel}`}>
                Message
              </label>
              <textarea
                className={`${styles.formControl} ${styles.textarea}`}
                id="message"
                required
              />
            </div>
            <div className={`${styles.formActions}`}>
              <Button
                variant="secondary"
                className={`${styles.cancelButton}`}
                onClick={onClose}
              >
                Cancel
              </Button>
              <Button
                variant="primary"
                type="submit"
                className={`${styles.saveButton}`}
              >
                Create
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
