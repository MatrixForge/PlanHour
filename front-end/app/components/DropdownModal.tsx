import React from "react";
import styles from "@styles/DropdownModal.module.css";
import { useFolderStore } from "../../store/folderStore";
import axios from "@/lib/axios";

const DropdownModal = () => {
  const { setFolders, setSearchMode } = useFolderStore();

  const handleSort = async (sortBy: string) => {
    try {
      const response = await axios.get(`/events/folders/sort`, {
        params: { sortBy },
      });
      setFolders(response.data);
      setSearchMode(true); // Set searchMode to true to indicate sorted view
    } catch (error) {
      console.error("Error sorting folders:", error);
    }
  };

  return (
    <div className={styles["dropdown-modal"]}>
      <div className={styles["dropdown-content"]}>
        <a href="#" onClick={() => handleSort("newest")} className="block px-4 py-2 text-gray-800 hover:bg-indigo-500 hover:text-white">
          Recent (Newest First)
        </a>
        <a href="#" onClick={() => handleSort("oldest")} className="block px-4 py-2 text-gray-800 hover:bg-indigo-500 hover:text-white">
          Oldest First
        </a>
        <a href="#" onClick={() => handleSort("a-z")} className="block px-4 py-2 text-gray-800 hover:bg-indigo-500 hover:text-white">
          Alphabetical (A-Z)
        </a>
        <a href="#" onClick={() => handleSort("z-a")} className="block px-4 py-2 text-gray-800 hover:bg-indigo-500 hover:text-white">
          Alphabetical (Z-A)
        </a>
      </div>
    </div>
  );
};

export default DropdownModal;
