import React from "react";
import Svg from "./Svg";
import styles from "@styles/RestaurantCardProps.module.css";

interface RestaurantCardProps {
  restaurant: {
    id: string;
    image: string;
    name: string;
    rating: number;
    services: string[];
    location: string;
    description: string;
    email?: string;
    contact: string;
    min: number;
    _id: string;
    
  };
  addPlanToFolder: (vendorId: string) => void;
}

const RestaurantCard: React.FC<RestaurantCardProps> = ({
  restaurant,
  addPlanToFolder,
}) => {
  return (
    <div key={restaurant.id} className="">
      <div className={styles.card}>
        <div className={styles.imageContainer}>
          <img
            className={styles.image}
            src={restaurant.image}
            alt={restaurant.name}
          />
        </div>
        <div className={styles.contentContainer}>
          <div className={styles.cardHeader}>
            <div className={`${styles.cardTitle} ${styles.fontCustom}`}>
              {restaurant.name}
            </div>
            <span
              className={styles.addButton}
              onClick={() => addPlanToFolder(restaurant._id)}
            >
              {<Svg name="plus" />}
            </span>
          </div>
          <div className={`${styles.text1}`}>
            <span>
              {<Svg name="star" />}
              {restaurant.rating}
              {<Svg name="staff" />}
              {restaurant.services[0]}
              {restaurant.services[1] ? `, ${restaurant.services[1]}` : ""}
            </span>
          </div>
          <div className={`${styles.text1}`}>
            <p className="card-text">
              {<Svg name="location" />}
              {restaurant.location}
            </p>
          </div>
          <div className={`${styles.text1}`}>
            <p className="card-text mt-4">{restaurant.description}</p>
          </div>
          <hr />
          <div className={styles.infoContainer}>
            <span className={styles.contactInfo}>
              {restaurant.email && (
                <div>
                  <Svg name="mail" />
                  {restaurant.email}
                </div>
              )}
              {restaurant.contact && (
                <div>
                  <Svg name="phone" />
                  {restaurant.contact}
                </div>
              )}
            </span>
            <span className={styles.priceInfo}>
              Starting at PKR {restaurant.min}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RestaurantCard;
