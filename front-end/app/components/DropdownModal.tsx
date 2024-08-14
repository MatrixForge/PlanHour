import React from "react";
import styles from "@styles/DropdownModal.module.css";
import { useFolderStore } from "../../store/folderStore";
import axios from "@/lib/axios";

const DropdownModal = () => {
  const { setFolders, setSearchMode, setSubFolders, mainFolderPage, subFolderPage, folderId } = useFolderStore();

  const handleSort = async (sortBy: string) => {
    try {
      console.log('subfolder page:', subFolderPage);
      console.log('mainfolder page:', mainFolderPage);

      let queryString = `sortBy=${sortBy}`;
  
      if (subFolderPage) {
        console.log('Sorting subfolders');
        if (folderId) {
          queryString += `&subFolderPage=true&mainFolderId=${folderId}`; // Include folderId for sorting subfolders
        } else {
          console.error('folderId is required for sorting subfolders');
          return; // Stop execution if folderId is missing
        }
        console.log('query string is:', queryString);
        const response = await axios.get(`/events/folders/sort?${queryString}`);
        setSubFolders(response.data);
      } else if (mainFolderPage) {
        console.log('Sorting main folders');
        queryString += `&mainFolderPage=true`; // Indicate that we're sorting main folders
        console.log('query string is:', queryString);
        const response = await axios.get(`/events/folders/sort?${queryString}`);
        setFolders(response.data);
      }
  
      setSearchMode(true); // Set searchMode to true to indicate sorted view
    } catch (error) {
      console.error("Error sorting folders:", error);
    }
  };

  return (
    <div className={styles["dropdown-modal"]}>
      <div className={styles["dropdown-content"]}>
        <a onClick={() => handleSort("newest")} className="block px-4 py-2 text-gray-800 hover:bg-indigo-500 hover:text-white">
          Recent (Newest First)
        </a>
        <a onClick={() => handleSort("oldest")} className="block px-4 py-2 text-gray-800 hover:bg-indigo-500 hover:text-white">
          Oldest First
        </a>
        <a onClick={() => handleSort("a-z")} className="block px-4 py-2 text-gray-800 hover:bg-indigo-500 hover:text-white">
          Alphabetical (A-Z)
        </a>
        <a onClick={() => handleSort("z-a")} className="block px-4 py-2 text-gray-800 hover:bg-indigo-500 hover:text-white">
          Alphabetical (Z-A)
        </a>
      </div>
    </div>
  );
};

export default DropdownModal;
