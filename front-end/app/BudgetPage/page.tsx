"use client";
import React, { useEffect, useState } from "react";
import CustomNavbar from "../components/NavBar";
import Footer from "../components/footer";
import VenueBoard from "../components/venueBoard";
import styles from "../../styles/custom-colors.module.css";
import styles1 from "../../styles/budgePage.module.css";
import Link from "next/link";
import useAuthStore from "@/store/authStore";
import axios from "@/lib/axios";

const BudgetPage = () => {
  const { user } = useAuthStore();
  const [budgetData, setBudgetData] = useState({
    venue: [],
    restaurants: [],
    caterer: [],
    photographer: [],
    decor: [],
  });

  useEffect(() => {
    const userId = user._id;
    fetchPlans(userId);
  }, []);

  const fetchPlans = async (userId) => {
    try {
      const response = await axios.post("/budget/getAllPlansForSpecificUser", {
        userId,
      });
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
      }
    } catch (error: any) {
      console.error("Error saving to database:", error.response?.data);
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
              <Link
                className={`btn btn-light mx-2 rounded-pill ${styles.customBrown} ${styles1.fontCustom}`}
                href="/"
              >
                Save
              </Link>
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
              />
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default BudgetPage;
