import React from "react";
import VenueCard from "./venueCard";
import styles1 from "@/styles/venueBoard.module.css";

interface VenueBoardProps {
  title: string;
  venues: any[];
  className: string;
  onSelect: (id: string, isSelected: boolean, vendorType: string) => void;
  selectedVenues: { [key: string]: string };
}
// VenueBoard Component
const VenueBoard: React.FC<VenueBoardProps> = ({
  title,
  venues,
  className,
  onSelect,
  selectedVenues,
}) => {
  if (venues.length === 0) return null;

  return (
    <div
      className={`d-flex flex-column justify-content-start align-items-center ${styles1.container} ${className}`}
    >
      <div className={`${styles1.cardHeader} ${styles1.fontCustom}`}>
        {title}
      </div>
      <div className={`${styles1.cardContainer} ${styles1.fontCustom}`}>
        {venues.map((venue, index) => {
          // Check if the current venue is selected
          const isSelected =
            selectedVenues[venue.vendorId.vendorType] === venue.vendorId._id  // Ensure pre-check for saved vendors

          return (
            <VenueCard
              key={index}
              venue={venue.vendorId}
              saved={venue.saved}
              onSelect={onSelect}
              isSelected={isSelected} // Pass the correct selection state
            />
          );
        })}
      </div>
    </div>
  );
};

export default VenueBoard;
