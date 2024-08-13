import React, { useState } from "react";
import "../../styles/searchbar.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import DropdownModal from "../components/DropdownModal";
import axios from "@/lib/axios";
import { useFolderStore } from "@/store/folderStore";

const SearchBar: React.FC = () => {
  const [showModal, setShowModal] = useState(false);
  const [keyword, setKeyword] = useState('');
  const { setFolderId, setFolderTitle,hasSubfolder,setHasSubfolder,folderId,folders,setFolders,searchMode,setSearchMode,subFolderId ,subFolderPage,mainFolderPage,setSubFolders} = useFolderStore();


  const handleMouseEnter = () => {
    setShowModal(true);
  };

  const handleMouseLeave = () => {
    setShowModal(false);
  };

  const handleSearch = async () => {
    try {
      let queryString = `keyword=${keyword}`;
  
      if (subFolderPage) {
        console.log('Searching in subfolders');
        queryString += `&subFolderPage=true`; // Indicate that we're searching in subfolders
        console.log('query string is:',queryString)
        const response = await axios.get(`/events/folders/search?${queryString}`);
        setSubFolders(response.data); 


      } else if (mainFolderPage) {
        console.log('Searching in main folders');
        queryString += `&mainFolderPage=true`; // Indicate that we're searching in main folders
        console.log('query string is:',queryString)
      const response = await axios.get(`/events/folders/search?${queryString}`);
    
      setFolders(response.data); 

      }
  
      setSearchMode(true);
    } catch (error) {
      console.error('Error fetching search results:', error);
    }
  };
  
  return (
    <div className="d-flex justify-content-center h-100">
      <div className="search-container">
        <div className="search">
          <input
            type="text"
            className="search-input"
            placeholder="Search your event"
            name="search"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
          />
          <button className="search-button" onClick={handleSearch}>Search</button>
        </div>
        <div
          className="plus-icon"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <i className="bi bi-filter"></i>
          {showModal && <DropdownModal />} {/* Render modal conditionally */}
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
