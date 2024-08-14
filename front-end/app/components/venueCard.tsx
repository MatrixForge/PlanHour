"use client";
import React from "react";
import styles1 from "../../styles/venueCard.module.css";

const VenueCard = ({ venue, saved, onCheckboxChange }) => {
  return (
    <div className={`${styles1.card} ${styles1.fontCustom}`}>
      <div
        className={`container-fluid d-flex justify-content-between align-items-center ${styles1.topText}`}
      >
        <div>{venue.name}</div>
        <div className={styles1.checkboxContainer}>
          <input
            type="checkbox"
            className={styles1.checkbox}
            checked={saved || false}
            onChange={(e) => onCheckboxChange(e.target.checked)}
          />
        </div>
      </div>
      <hr />
      <div className={`${styles1.priceText}`}>Starting Price ${venue.min}</div>
    </div>
  );
};

export default VenueCard;
