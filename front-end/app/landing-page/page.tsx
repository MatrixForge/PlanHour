"use client";
import React, { useRef } from "react";
import CustomNavbar from "../components/NavBar"; // Make sure this path is correct
import Body from "../components/body";
import Cards from "../components/Cards";
import Footer from "../components/footer";

const LandingPage = () => {
  const cardsRef = useRef<HTMLDivElement>(null);

  return (
    <div>
      <CustomNavbar cardsRef={cardsRef} />
      <Body />
      <Cards ref={cardsRef} />
      <Footer />
    </div>
  );
};

export default LandingPage;
