
"use client";
import React, { useState } from 'react';
import SearchBar from '../components/searchBar';
import NavBar from '../components/NavBar';
import FolderDisplay from '../components/folderDisplay';
import '../../styles/eventify.css'
import Footer from '../components/footer';
import NavBar2 from  '../components/secondNavbg';

const FolderManager = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [folders, setFolders] = useState([]);


  return (
<div>
    <NavBar/>
    <NavBar2/>
    <div className='folderManager' > 
      <SearchBar  />
      <FolderDisplay/>
    </div>
    <Footer/>


</div>
   
  );
};

export default FolderManager;
