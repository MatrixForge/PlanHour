import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../../styles/custom-pagination.css"
import StarSvg from "./StarSvg"
import ResponsivePagination from "react-responsive-pagination";
import BuildingSvg from "./BuildingSvg ";
import LocationSvg from "./LocationSvg";
import Svg from "./Svg";

const RestaurantList: React.FC = () => {
  const restaurants = [
    {
      id: 1,
      name: "The Spice House",
      rating: 4.5,
      description: "A cozy place with delicious Indian cuisine.njd vdbhvuidsbv sgvhuisgvh vdjghvuisvgh vdhvuidsb  jdgvuidvg vdjvgudb b9b bidb uidbh  kmbnuhb khb uib dz;bsuoihbu9s mksh...",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTeFMiJ0XWoXC7UEHNBstXi_1sP2KRfPXvOAA&s",
    },
    {
      id: 2,
      name: "Ocean's Delight",
      rating: 4.7,
      description: "Enjoy the best seafood with a beautiful ocean view.",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ3YoaaIe7ntaXtCVYA-M4q6O3YpdSrEp4-6Q&s",
    },
    {
      id: 3,
      name: "Pasta Paradise",
      rating: 4.2,
      description: "Authentic Italian pasta dishes to satisfy your cravings.",
      image: "https://i.ytimg.com/vi/fg0rJi5FWyo/maxresdefault.jpg",
    },
    // Add more restaurant objects here
  ];
  const totalPages = 5;
  const [currentPage, setCurrentPage] = useState(1);

  function handlePageChange(page) {
    setCurrentPage(page);
    // ... do something with `page`
  }
  
  const itemsPerPage = 2;

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = restaurants.slice(indexOfFirstItem, indexOfLastItem);

  

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
          <div key={restaurant.id} className="col-md-12 mb-4">
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
                            {<Svg name="building" />}
                            {restaurant.rating}
                          </span>
                        </div>
                      </div>
                    </div>
                    {/* location section */}
                    <div className="row mt-3">
                      <p className="card-text">
                        {<Svg name="location" />}
                        {restaurant.name}
                      </p>
                    </div>
                    <p className="card-text mt-4">{restaurant.description}</p>
                    <hr></hr>
                    <div className="row mt-2">
                      <div className="col-md-4">
                        {<Svg name="mail" />}
                        {restaurant.id}
                      </div>
                      <div className="col-md-4">
                        {<Svg name="phone" />}
                        {restaurant.id}
                      </div>
                      <div className="col-md-4">
                        <h4>{restaurant.rating}</h4>
                      </div>
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
