import React from "react";
import styles1 from "@styles/venueCard.module.css";

const VenueCard = ({ venue, onSelect, isSelected, vendorType }) => {
  const handleCheckboxChange = () => {
    onSelect(venue._id, !isSelected, vendorType);
  };

  return (
    <div className={`${styles1.card} ${styles1.fontCustom}`}>
      <div
        className={`container-fluid d-flex justify-content-between align-items-center ${styles1.topText}`}
      >
        <div>{venue.name}</div>
        <div className={styles1.checkboxContainer}>
          <input
            type="checkbox"
            checked={isSelected}
            className={styles1.checkbox}
            onChange={handleCheckboxChange}
          />
        </div>
      </div>
      <hr />
      <div className={`${styles1.priceText}`}>
        Starting Price PKR {venue.min}
      </div>
    </div>
  );
};

export default VenueCard;
