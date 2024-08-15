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
  ssr: false,
});

const BudgetPage = () => {
  const [budgetData, setBudgetData] = useState({
    venue: [],
    restaurant: [],
    catering: [],
    photographer: [],
    decor: [],
  });
  const [totalCost, setTotalCost] = useState(0);
  const [selectedVenues, setSelectedVenues] = useState<{
    [key: string]: string;
  }>({});
  const [isPopupOpen, setIsPopupOpen] = useState(false);
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

        const categorizedData = {
          venue: vendors.filter(
            (vendor) => vendor.vendorId.vendorType === "venue"
          ),
          restaurant: vendors.filter(
            (vendor) => vendor.vendorId.vendorType === "restaurant"
          ),
          catering: vendors.filter(
            (vendor) => vendor.vendorId.vendorType === "catering"
          ),
          photographer: vendors.filter(
            (vendor) => vendor.vendorId.vendorType === "photographer"
          ),
          decor: vendors.filter(
            (vendor) => vendor.vendorId.vendorType === "decor"
          ),
        };

        setBudgetData(categorizedData);

        // Initialize selectedVenues based on saved vendors
        const initialSelectedVenues: { [key: string]: string } = {};
        vendors.forEach((vendor) => {
          if (vendor.saved) {
            initialSelectedVenues[vendor.vendorId.vendorType] =
              vendor.vendorId._id;
          }
        });
        setSelectedVenues(initialSelectedVenues); // Preselect saved vendors
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleSelect = (
    id: string,
    isSelected: boolean,
    vendorType: string
  ) => {
    setSelectedVenues((prevSelected) => ({
      ...prevSelected,
      [vendorType]: isSelected ? id : "", // Update the specific vendorType
    }));
  };

  // Update total cost based on selected venues
  useEffect(() => {
    const updatedTotalCost = Object.keys(selectedVenues).reduce(
      (acc, vendorType) => {
        const selectedId = selectedVenues[vendorType];
        const vendorsList = budgetData[vendorType] || [];
        const selectedVendor = vendorsList.find(
          (vendor) => vendor.vendorId._id === selectedId
        );
        return selectedVendor ? acc + selectedVendor.vendorId.min : acc;
      },
      0
    );

    setTotalCost(updatedTotalCost);
  }, [selectedVenues, budgetData]);

  const getClassName = (key: string) => {
    switch (key) {
      case "venue":
        return styles.customOrange;
      case "restaurant":
        return styles.customPurple;
      case "decor":
        return styles.customPink;
      case "catering":
        return styles.customPink;
      case "photographer":
        return styles.customGreen;
      default:
        return "";
    }
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

      if (response.status === 200) {
        console.log("Vendors saved successfully:", response.data);
      } else {
        console.error("Failed to save vendors:", response.data.message);
      }
    } catch (error) {
      console.error("Error saving vendors:", error);
    }
  };

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
                onClick={() => setIsPopupOpen(true)}
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
                onSelect={handleSelect}
                selectedVenues={selectedVenues}
              />
            ))}
          </div>
        </div>
        <div className={styles1.totalCostContainer}>
          <h3>Total Cost: ${totalCost}</h3>
        </div>
      </div>

      <Footer />

      {isPopupOpen && (
        <ExportPopup
          onClose={() => setIsPopupOpen(false)}
          budgetData={budgetData}
          totalCost={totalCost}
          selectedVenues= {selectedVenues}
        />
      )}
    </div>
  );
};

export default BudgetPage;
