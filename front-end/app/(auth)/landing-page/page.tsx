"use client";
import React, { useRef } from "react";
import CustomNavbar from "../../components/NavBar"; // Make sure this path is correct
import Body from "../../components/body";
import Cards from "../../components/Cards";
import Footer from "../../components/footer";
import useCurrentUrl from "@/hooks/current_url_returner";
import { useFolderStore } from "@/store/folderStore";
const LandingPage = () => {
  const cardsRef = useRef<HTMLDivElement>(null);
  const currentUrl = useCurrentUrl();
  const { folderId, subFolderId, setFolderId, setSubFolderId } =
    useFolderStore();
  if (currentUrl.pathname === "/") {
    if (folderId || subFolderId) {
      setFolderId(null);
      setSubFolderId(null);
    }
  }
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
