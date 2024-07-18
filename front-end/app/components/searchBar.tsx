import React, { useState } from 'react';
import '../../styles/searchbar.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import EventModal from '../components/EventModal'; // Import your modal component

const SearchBar: React.FC = () => {
  const [showModal, setShowModal] = useState(false);

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <div className="d-flex justify-content-center h-100">
      <div className="search-container">
        <div className="search">
          <input type="text" className="search-input" placeholder="search your event" name="search" />
          <a href="#" className="search-icon">
            <i className="bi bi-search"></i>
          </a>
        </div>
        <div className="plus-icon">
          <a href="#" onClick={openModal}>
            <i className="bi bi-plus-circle-fill"></i>
          </a>
        </div>
      </div>
      {showModal && <EventModal onClose={closeModal} />} {/* Render modal conditionally */}
    </div>
  );
};

export default SearchBar;
