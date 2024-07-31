"use client";
import React, { useState } from "react";
import NavBar from "../components/NavBar";
import FolderDisplay1 from "../components/folderDisplay1";
import Footer from "../components/footer";
import NavBar2 from "../components/secondNavbg";

const FolderManager = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [folders, setFolders] = useState([]);

  return (
    <div>
      <NavBar />
      <NavBar2 />
      <FolderDisplay1 />
      <Footer />
    </div>
  );
};

export default FolderManager;
