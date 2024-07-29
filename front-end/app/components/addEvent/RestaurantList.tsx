import React, { useState, useEffect } from "react";
import "@styles/custom-pagination.css";
import ResponsivePagination from "react-responsive-pagination";
import styles from "@styles/addEvent.module.css";
import RestaurantCard from "./RestaurantCard";
import useVenueStore from "@/store/venueStore";
import axios from "@/lib/axios"; // Importing the axios instance
import { useFolderStore } from "@/store/folderStore";
import Popup from "./Popup"; // Import the Popup component

const RestaurantList: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [popupVisible, setPopupVisible] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");
  const [popupType, setPopupType] = useState<"success" | "error">("success");
  const itemsPerPage = 5;
  const { filteredRestaurants, fetchRestaurants } = useVenueStore();
  useEffect(() => {
    fetchRestaurants();
  }, [fetchRestaurants]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredRestaurants.slice(
    indexOfFirstItem,
    indexOfLastItem
  );
  const totalPages = Math.ceil(filteredRestaurants.length / itemsPerPage);

  const addPlanToFolder = async (vendorId: string) => {
    const { folderId, subFolderId } = useFolderStore.getState();
    try {
      let response;
      if (folderId && subFolderId) {
        response = await axios.patch(
          `/plans/addVendorToSubFolder/${subFolderId}/${vendorId}`
        );
      } else if (folderId && !subFolderId) {
        response = await axios.patch(
          `/plans/addVendorToFolder/${folderId}/${vendorId}`
        );
      }

      if (response) {
        console.log("Saved successfully:", response.data);
      }
    } catch (error:any) {
        console.error("Error saving to database:", error.response?.data);
    }

    setTimeout(() => {
      setPopupVisible(false);
    }, 2000);
  };

  const closePopup = () => {
    setPopupVisible(false);
  };

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
          <RestaurantCard
            key={restaurant.id}
            restaurant={restaurant}
            addPlanToFolder={addPlanToFolder}
          />
        ))}
      </div>
      <div className="d-flex justify-content-center">
        <ResponsivePagination
          total={totalPages}
          current={currentPage}
          onPageChange={handlePageChange}
        />
      </div>
      {popupVisible && (
        <Popup message={popupMessage} type={popupType} onClose={closePopup} />
      )}
    </div>
  );
};

export default RestaurantList;
