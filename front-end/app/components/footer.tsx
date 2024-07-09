import React from 'react';
import styles from '../../styles/custom-colors.module.css'; 

const Footer = () => {
  return (
    <div className={styles.card}>
      <div className={styles.cardBody}>
        <h2 className={styles.cardTitle}>SIMPLIFY YOUR SCHEDULING, MAXIMIZE YOUR TIME.</h2>
        <p className={styles.cardText}>
          Plan Hour. The perfect solution for streamlined scheduling and effective time management.
        </p>
        <div className={styles.cardLinkContainer}>
          <a href="#">Request More Information</a>
          <a href="#">Contact Us</a>
        </div>
      </div>
    </div>
  );
};

export default Footer;
