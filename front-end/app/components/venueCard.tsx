"use client";
import React from 'react';
import styles1 from '@styles/venueCard.module.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const VenueCard = ({ venue }) => {
  return (
    <div className={`${styles1.card} ${styles1.fontCustom}`}>
      <div className={`container-fluid d-flex justify-content-between align-items-center ${styles1.topText}`}>
        <div>{venue.name}</div>
        <div className={styles1.checkboxContainer}>
          <input type="checkbox" className={styles1.checkbox} />
          
        </div>
      </div>
      <hr />
      <div className={`${styles1.priceText}`}>Starting Price ${venue.price}</div>
    </div>
  );
};

export default VenueCard;
