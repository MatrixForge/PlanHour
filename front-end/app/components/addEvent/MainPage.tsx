// RestaurantsPage.tsx
import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import FilterOptions from "./FilterOptions";
import RestaurantList from "./RestaurantList";

const MainPage: React.FC = () => {
  return (
    <div className="container">
      <div className="row">
        <FilterOptions />
        <RestaurantList />
      </div>
    </div>
  );
};

export default MainPage;
