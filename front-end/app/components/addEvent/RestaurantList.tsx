import React, { useState, useEffect } from "react";
import "@styles/custom-pagination.css";
import ResponsivePagination from "react-responsive-pagination";
import styles from "@styles/addEvent.module.css"
import Svg from "./Svg";
import axios from "axios";

interface Venue {
  id: number;
  name: string;
  location: string;
  description: string;
  image: string;
  min: number;
  max: number;
  email: string;
  contact: string;
  rating: number;
  staff: string[];
}

const RestaurantList: React.FC<Venue> = () => {
  const [restaurants, setRestaurants] = useState<Venue[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/plans/getVenues"
        );
        setRestaurants(response.data);
      } catch (error) {
        console.error("Error fetching restaurants:", error);
      }
    };

    fetchRestaurants();
  }, []);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = restaurants.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(restaurants.length / itemsPerPage);
  

  return (
    <div className="col-md-9 p-3 pt-0">
      <div className="d-flex justify-content-between align-items-center my-3">
        <div className="search">
          <input
            className="rounded-5 border-light border-3 form-control"
            type="text"
            name="search"
            id="search"
            placeholder="Search Restaurant"
          />
        </div>
        <div className="sort-by">
          <select className="form-select rounded-5 border-light border-3">
            <option value="Relevance">Sort By: Relevance</option>
            <option value="name">Sort By: Name</option>
            <option value="rating">Sort By: Rating</option>
            <option value="popularity">Sort By: Popularity</option>
          </select>
        </div>
      </div>
      <div className="col">
        {currentItems.map((restaurant) => (
          <div className="col-md-12 mb-4">
            <div className="card h-100">
              <div className="row g-0">
                <div className="col-md-4">
                  <img
                    src={restaurant.image}
                    alt={restaurant.name}
                    className="img-fluid rounded-start"
                    style={{ height: "100%", objectFit: "cover" }}
                  />
                </div>
                <div className="col-md-8">
                  <div className="card-body">
                    <h5 className="card-title">{restaurant.name}</h5>
                    {/* Rating and category */}
                    <div className="row">
                      <div className="col-md-6">
                        <div className="row">
                          <span className="card-text">
                            {<Svg name="star" />}
                            {restaurant.rating}
                            {<Svg name="staff" />}
                            {restaurant.staff[0]}{ restaurant.staff[1]?`, ${restaurant.staff[1]}`:""}
                          </span>
                        </div>
                      </div>
                    </div>
                    {/* location section */}
                    <div className="row mt-3">
                      <p className="card-text">
                        {<Svg name="location" />}
                        {restaurant.location}
                      </p>
                    </div>
                    <p className="card-text mt-4">{restaurant.description}</p>
                    <hr></hr>
                    <div className={`row mt-3 ${styles.text_size}`}>
                      <span className="col-md-7  ps-2 pe-0 mt-2">
                        {<Svg name="mail" />}
                        {restaurant.email}
                        {<Svg name="phone" />}
                        {restaurant.contact}
                      </span>
                      <span className="col-md-5">
                        <p className={`${styles.price_font_size}`}>
                          Starting at PKR {restaurant.min}
                        </p>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="d-flex justify-content-center">
        <ResponsivePagination
          total={totalPages}
          current={currentPage}
          onPageChange={(page) => handlePageChange(page)}
        />
      </div>
    </div>
  );
};

export default RestaurantList;
