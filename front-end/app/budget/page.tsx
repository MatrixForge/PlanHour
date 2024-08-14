"use client";
import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic"; 
import CustomNavbar from "../components/NavBar";
import Footer from "../components/footer";
import VenueBoard from "../components/venueBoard";
import styles from "@/styles/custom-colors.module.css";
import styles1 from "@/styles/budgePage.module.css";
import { useFolderStore } from "@/store/folderStore";
import axios from "@/lib/axios";
// Dynamically import ExportPopup
const ExportPopup = dynamic(() => import("../components/ExportPopup"), {
  ssr: false, // Disable server-side rendering if the component relies on the browser environment
});
const BudgetPage = () => {
  const [budgetData, setBudgetData] = useState({
    venue: [],
    restaurants: [],
    caterer: [],
    photographer: [],
    decor: [],
  });
  const [selectedVenues, setSelectedVenues] = useState<string[]>([]); // State to manage selected venues
  const [isPopupOpen, setIsPopupOpen] = useState(false); // State to control the popup visibility
  const { folderId, subFolderId } = useFolderStore();

  useEffect(() => {
    fetchData();
  }, [folderId, subFolderId]);

  const fetchData = async () => {
    try {
      let response;
      if (folderId && !subFolderId) {
        response = await axios.post("/budget/get-all-plans-for-specific-user", {
          folderOrSubFolder: "folder",
          id: folderId,
        });
      } else if (subFolderId) {
        response = await axios.post("/budget/get-all-plans-for-specific-user", {
          folderOrSubFolder: "subfolder",
          id: subFolderId,
        });
      }

      if (response) {
        const vendors = response.data.filter((ven) => ven.vendorId);

        // Categorize vendors based on vendorType and include the saved state
        const categorizedData = {
          venue: vendors
            .filter((vendor) => vendor.vendorId.vendorType === "venue")
            .map((vendor) => ({
              ...vendor,
              saved: vendor.saved || false,
            })),
          restaurants: vendors
            .filter((vendor) => vendor.vendorId.vendorType === "restaurant")
            .map((vendor) => ({
              ...vendor,
              saved: vendor.saved || false,
            })),
          caterer: vendors
            .filter((vendor) => vendor.vendorId.vendorType === "catering")
            .map((vendor) => ({
              ...vendor,
              saved: vendor.saved || false,
            })),
          photographer: vendors
            .filter((vendor) => vendor.vendorId.vendorType === "photographer")
            .map((vendor) => ({
              ...vendor,
              saved: vendor.saved || false,
            })),
          decor: vendors
            .filter((vendor) => vendor.vendorId.vendorType === "decor")
            .map((vendor) => ({
              ...vendor,
              saved: vendor.saved || false,
            })),
        };
        setBudgetData(categorizedData);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const getClassName = (key) => {
    switch (key) {
      case "venue":
        return styles.customOrange;
      case "restaurants":
        return styles.customPurple;
      case "decor":
        return styles.customPink;
      case "caterer":
        return styles.customPink;
      case "photographer":
        return styles.customGreen;
      default:
        return "";
    }
  };

  const handleSelect = (
    id: string,
    isSelected: boolean,
    vendorType: string
  ) => {
    setSelectedVenues((prevSelected) => {
      if (isSelected) {
        return [...prevSelected, id];
      } else {
        return prevSelected.filter((venueId) => venueId !== id);
      }
    });
  };



  const saveSelectedVendors = async () => {
    try {
      let response;
      if (folderId && !subFolderId) {
        response = await axios.post("/budget/save-selected-vendors", {
          folderOrSubFolder: "folder",
          id: folderId,
          selectedVenues,
        });
      } else if (subFolderId) {
        response = await axios.post("/budget/save-selected-vendors", {
          folderOrSubFolder: "subfolder",
          id: subFolderId,
          selectedVenues,
        });
      }

      if (response.ok) {
        console.log("Vendors saved successfully:", response.data);
      } else {
        console.error("Failed to save vendors:", response.data.message);
      }
    } catch (error) {
      console.error("Error saving vendors:", error);
    }
  };

  const totalCost = Object.values(budgetData)
    .flat()
    .reduce((acc, item) => acc + item.min, 0);

  return (
    <div>
      <CustomNavbar />
      <div className={`${styles1.body}`}>
        <div className={styles1.budgetRow}>
          <div className={styles1.budgetTitle}>
            <h2>Budget</h2>
          </div>
          <div className={styles1.budgetButtons}>
            <div>
              <button
                className={`btn btn-light mx-2 rounded-pill ${styles.customBrown} ${styles1.fontCustom}`}
                onClick={saveSelectedVendors}
              >
                Save
              </button>
            </div>
            <div>
              <button
                className={`btn btn-light mx-2 rounded-pill ${styles.customBrown} ${styles1.fontCustom}`}
                onClick={() => setIsPopupOpen(true)} // Open the popup
              >
                Export
              </button>
            </div>
          </div>
        </div>

        <div className={`d-flex justify-content-center`}>
          <div
            className={`d-flex flex-row justify-content-center ${styles1.boardsContainer}`}
          >
            {Object.keys(budgetData).map((key) => (
              <VenueBoard
                key={key}
                title={key.charAt(0).toUpperCase() + key.slice(1)}
                venues={budgetData[key]}
                className={getClassName(key)}
                onSelect={handleSelect} // Pass the handleSelect function
                selectedVenues={selectedVenues} // Pass the selectedVenues state
              />
            ))}
          </div>
        </div>
      </div>

      <Footer />

      {isPopupOpen && (
        <ExportPopup
          onClose={() => setIsPopupOpen(false)} // Close the popup
          budgetData={budgetData}
          totalCost={totalCost}
        />
      )}
    </div>
  );
};

export default BudgetPage;
