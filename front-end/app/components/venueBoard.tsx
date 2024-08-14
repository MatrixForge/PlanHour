import React from "react";
import VenueCard from "./venueCard";
import styles1 from "@/styles/venueBoard.module.css";

interface VenueBoardProps {
  title: string;
  venues: any[]; // You might want to replace 'any' with a specific type
  className: string;
  onSelect: (id: string, isSelected: boolean, vendorType: string) => void;
  selectedVenues: string[]; // Adjust the type accordingly
}

const VenueBoard: React.FC<VenueBoardProps> = ({
  title,
  venues,
  className,
  onSelect,
  selectedVenues,
}) => {
  if (venues.length === 0) return null; // Don't render if there are no venues
  return (
    <div
      className={`container-fluid d-flex flex-column justify-content-start align-items-center ${styles1.container} ${className}`}
    >
      <div className={`${styles1.cardHeader} ${styles1.fontCustom}`}>
        {title}
      </div>
      <div className={`${styles1.cardContainer} ${styles1.fontCustom}`}>
        {venues.map((venue, index) => (
          <VenueCard
            key={index}
            venue={venue.vendorId}
            saved={venue.saved}
            onSelect={onSelect}
            isSelected={
              venue.saved || selectedVenues.includes(venue.vendorId._id)
            } // Auto-select if saved or already selected
          />
        ))}
      </div>
    </div>
  );
};

export default VenueBoard;
