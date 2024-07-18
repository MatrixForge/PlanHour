import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import styles from "../../../styles/addEvent.module.css";

import { Pagination } from "react-bootstrap";

const RestaurantList: React.FC = () => {
  const restaurants = [
    {
      id: 1,
      name: "The Spice House",
      rating: 4.5,
      description: "A cozy place with delicious Indian cuisine.",
      image: "/add-event/restaurant1.jpg",
    },
    {
      id: 2,
      name: "Ocean's Delight",
      rating: 4.7,
      description: "Enjoy the best seafood with a beautiful ocean view.",
      image: "/add-event/restaurant2.jpg",
    },
    {
      id: 3,
      name: "Pasta Paradise",
      rating: 4.2,
      description: "Authentic Italian pasta dishes to satisfy your cravings.",
      image: "/add-event/restaurant3.jpg",
    },
    // Add more restaurant objects here
  ];

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 2;

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = restaurants.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

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
          <div key={restaurant.id} className="col-md-6 mb-4">
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
                    <p className="card-text">{restaurant.description}</p>
                    <p className="card-text">Rating: {restaurant.rating}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="d-flex justify-content-center">
        <Pagination className={`${styles.pagination}`}>
          {[...Array(Math.ceil(restaurants.length / itemsPerPage)).keys()].map(
            (number) => (
              <Pagination.Item
                className={`${styles.page_item} rounded-circle`}
                key={number + 1}
                active={number + 1 === currentPage}
                onClick={() => paginate(number + 1)}
              >
                {number + 1}
              </Pagination.Item>
            )
          )}
        </Pagination>
      </div>
    </div>
  );
};

export default RestaurantList;
