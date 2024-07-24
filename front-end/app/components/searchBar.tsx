import React, { useState } from 'react';
import '../../styles/searchbar.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import DropdownModal from '../components/DropdownModal';

const SearchBar: React.FC = () => {
  const [showModal, setShowModal] = useState(false);

  const handleMouseEnter = () => {
    setShowModal(true);
  };

  const handleMouseLeave = () => {
    setShowModal(false);
  };

  return (
    <div className="d-flex justify-content-center h-100">
      <div className="search-container">
        <div className="search">
          <input type="text" className="search-input" placeholder="Search your event" name="search" />
          <button className="search-button">Search</button>
        </div>
        <div 
          className="plus-icon" 
          onMouseEnter={handleMouseEnter} 
          onMouseLeave={handleMouseLeave}
        >
          <i className="bi bi-sliders"></i>
          {showModal && <DropdownModal />} {/* Render modal conditionally */}
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
