// pages/index.tsx
"use client";
import React, { useState } from "react";
import CustomNavbar from "../components/NavBar";
import HeroSection from "../components/addEvent/heroSection";
import Footer from "../components/footer";
import ButtonList from "../components/addEvent/Buttons";
import MainPage from "../components/addEvent/MainPage";

const AddEvent = ({ loggedInBool }) => {
  const [loggedIn, setLoggedIn] = useState(loggedInBool);
  return (
    <div>
      <CustomNavbar loggedIn={loggedIn} />
      <HeroSection />
      <ButtonList />
      <MainPage />
      <Footer />
    </div>
  );
};

export default AddEvent;
