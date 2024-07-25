"use client";
import React from 'react';
import SearchBar from '../components/searchBar';
import NavBar from '../components/NavBar';
import FolderDisplay from '../components/folderDisplay';
import '../../styles/eventify.css';
import Footer from '../components/footer';
import NavBar2 from '../components/secondNavbg';

const FolderManager = () => {
  return (
    <div>
      <NavBar />
      <NavBar2 />
      <FolderDisplay />
      <Footer />
    </div>
  );
};

export default FolderManager;
