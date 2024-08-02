import React from "react";
import SearchBar from "../components/searchBar"; // Adjust the import path and props type as per your actual SearchBar component

const Navbar2: React.FC = () => {
  return (
    <nav
      style={{
        backgroundImage: 'url("/navbg.png")',
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        minHeight: "120px",
        width: "100%",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <SearchBar />
    </nav>
  );
};

export default Navbar2;
