import React from 'react';
import '../../styles/DropdownModal.css';

const DropdownModal = () => {
  return (
    <div className="dropdown-modal">
      <div className="dropdown-content">
        <a href="#" className="block px-4 py-2 text-gray-800 hover:bg-indigo-500 hover:text-white">Recent (Newest First)</a>
        <a href="#" className="block px-4 py-2 text-gray-800 hover:bg-indigo-500 hover:text-white">Oldest First</a>
        <a href="#" className="block px-4 py-2 text-gray-800 hover:bg-indigo-500 hover:text-white">Alphabetical (A-Z)</a>
        <a href="#" className="block px-4 py-2 text-gray-800 hover:bg-indigo-500 hover:text-white">Alphabetical (Z-A)</a>
      </div>
    </div>
  );
};

export default DropdownModal;
