
"use client";
import React, { useState } from 'react';
import SearchBar from '../components/searchBar';
import NavBar from '../components/NavBar';
import FolderDisplay from '../components/folderDisplay';
import '../../styles/eventify.css'
import Footer from '../components/footer';

const FolderManager = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [folders, setFolders] = useState([]);

//   const handlePlusClick = () => {
//     setShowPopup(true);
//   };

//   const handleClosePopup = () => {
//     setShowPopup(false);
//   };

//   const handleFolderCreate = (newFolder) => {
//     setFolders([...folders, newFolder]);
//     setShowPopup(false);
//   };

  return (
<div>
    <NavBar/>
    <div className='folderManager' > 
      <SearchBar  />
      <FolderDisplay/>
    </div>
    <Footer/>


</div>
   
  );
};

export default FolderManager;
