// pages/index.tsx
"use client";
import React, { useState } from "react";
import CustomNavbar from "../../components/NavBar";
import HeroSection from "../../components/addEvent/heroSection";
import Footer from "../../components/footer";
import ButtonList from "../../components/addEvent/Buttons";
import MainPage from "../../components/addEvent/MainPage";

const AddEvent = () => {
  return (
    <div>
      <CustomNavbar />
      <HeroSection />
      <ButtonList />
      <MainPage />
      <Footer />
    </div>
  );
};

export default AddEvent;
