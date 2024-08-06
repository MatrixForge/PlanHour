"use client";
import React, { useEffect, useState } from "react";
import CustomNavbar from "../components/NavBar";
import Footer from "../components/footer";
import VenueBoard from "../components/venueBoard";
import styles from "@/styles/custom-colors.module.css";
import styles1 from "@/styles/budgePage.module.css";
import Link from "next/link";
import useAuthStore from "@/store/authStore";
import axios from "@/lib/axios";
import { useFolderStore } from "@/store/folderStore";

const BudgetPage = () => {
  const{folderId, subFolderId} = useFolderStore();
  const { user } = useAuthStore();
  const [budgetData, setBudgetData] = useState({
    venue: [],
    restaurants: [],
    caterer: [],
    photographer: [],
    decor: [],
  });
  const [totalCost, setTotalCost] = useState(0);
  const [selectedVenues, setSelectedVenues] = useState({
    venue: null,
    restaurants: null,
    caterer: null,
    photographer: null,
    decor: null,
  });

  useEffect(() => {
    console.log('first')
    fetchPlans();
    console.log('second')
  }, []);

  const fetchPlans = async () => {
    try {
      const response = await axios.post(
        "/budget/get-all-plans-for-specific-user",
        {
          folderId,
          subFolderId,
        }
      );
      if (response) {
        const fetchedVendors = response.data;

        const newBudgetData = {
          venue: fetchedVendors.filter(
            (vendor: any) => vendor.vendorType === "venue"
          ),
          restaurants: fetchedVendors.filter(
            (vendor: any) => vendor.vendorType === "restaurant"
          ),
          caterer: fetchedVendors.filter(
            (vendor: any) => vendor.vendorType === "caterer"
          ),
          photographer: fetchedVendors.filter(
            (vendor: any) => vendor.vendorType === "photographer"
          ),
          decor: fetchedVendors.filter(
            (vendor: any) => vendor.vendorType === "decor"
          ),
        };

        setBudgetData(newBudgetData);

        // Calculate total cost
        const totalCost = Object.values(newBudgetData).reduce(
          (total, vendors) => {
            return (
              total +
              vendors.reduce((sum: any, vendor: any) => sum + vendor.min, 0)
            );
          },
          0
        );

        setTotalCost(totalCost);
      }
    } catch (error: any) {
      console.error("Error fetching plans:", error.response?.data);
    }
  };

  const handleSelect = (
    id: string,
    isSelected: boolean,
    vendorType: string
  ) => {
    setSelectedVenues((prevSelected) => {
      const newSelection = {
        ...prevSelected,
        [vendorType]: isSelected ? id : null,
      };
      // Ensure only one vendor per type is selected
      return newSelection;
    });
  };

  const handleSave = async () => {
    try {
      const selectedVendors = Object.keys(selectedVenues).reduce(
        (result, key) => {
          const vendorId = selectedVenues[key];
          if (vendorId) {
            const vendor = budgetData[key].find((v) => v._id === vendorId);
            if (vendor) result.push(vendor);
          }
          return result;
        },
        []
      );
      console.log('first', folderId)
      if (folderId!==null) {
        const response = axios.post("/budget/save-selected-vendors", {
          folderId,
          selectedVendors,
        });
        if(response){
          console.log((await response).status)
        }
      }
      // Save selected vendors to the server
      // await axios.post("/budget/saveSelectedVendors", { vendors: selectedVendors });

      // Update budgetData to only include selected vendors
      const updatedBudgetData = {
        venue: selectedVenues.venue
          ? budgetData.venue.filter(
              (vendor) => vendor._id === selectedVenues.venue
            )
          : [],
        restaurants: selectedVenues.restaurants
          ? budgetData.restaurants.filter(
              (vendor) => vendor._id === selectedVenues.restaurants
            )
          : [],
        caterer: selectedVenues.caterer
          ? budgetData.caterer.filter(
              (vendor) => vendor._id === selectedVenues.caterer
            )
          : [],
        photographer: selectedVenues.photographer
          ? budgetData.photographer.filter(
              (vendor) => vendor._id === selectedVenues.photographer
            )
          : [],
        decor: selectedVenues.decor
          ? budgetData.decor.filter(
              (vendor) => vendor._id === selectedVenues.decor
            )
          : [],
      };

      setBudgetData(updatedBudgetData);
      setTotalCost(
        selectedVendors.reduce((sum, vendor) => sum + vendor.min, 0)
      );
    } catch (error) {
      console.error("Error saving selected vendors:", error);
    }
  };

  const getClassName = (key: any) => {
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
                onClick={handleSave}
              >
                Save
              </button>
            </div>
            <div>
              <Link
                className={`btn btn-light mx-2 rounded-pill ${styles.customBrown} ${styles1.fontCustom}`}
                href="/"
              >
                Export
              </Link>
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
                selectedVenues={Object.keys(selectedVenues).reduce(
                  (acc, type) => {
                    if (selectedVenues[type]) acc.push(selectedVenues[type]);
                    return acc;
                  },
                  []
                )}
              />
            ))}
          </div>
        </div>
        <h2 className={`${styles1.total} ${styles1.fontCustom}`}>
          Total Cost: PKR {totalCost}
        </h2>
      </div>
      <Footer />
    </div>
  );
};

export default BudgetPage;
