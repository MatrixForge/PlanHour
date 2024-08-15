import React from "react";
import styles1 from "@/styles/venueCard.module.css";

interface VenueCardProps {
  venue: any;
  saved: boolean;
  onSelect: (id: string, isSelected: boolean, vendorType: string) => void;
  isSelected: boolean;
}

const VenueCard: React.FC<VenueCardProps> = ({
  venue,
  saved,
  onSelect,
  isSelected,
}) => {
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
            checked={isSelected}
            onChange={(e) =>
              onSelect(venue._id, e.target.checked, venue.vendorType)
            }
          />
        </div>
      </div>
      <hr />
      <div className={`${styles1.priceText}`}>Starting Price ${venue.min}</div>
    </div>
  );
};

export default VenueCard;
