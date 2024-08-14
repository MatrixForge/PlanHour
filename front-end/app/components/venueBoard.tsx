"use client";
import React from "react";
import VenueCard from "./venueCard";
import styles1 from "@/styles/venueBoard.module.css";

const VenueBoard = ({ title, venues, className, onCheckboxChange }) => {
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
            onCheckboxChange={(isChecked) =>
              onCheckboxChange(venue.vendorId._id, isChecked)
            }
          />
        ))}
      </div>
    </div>
  );
};

export default VenueBoard;
