"use client";
import React, { useState, useEffect } from "react";
import axios from "@/lib/axios";
import "bootstrap-icons/font/bootstrap-icons.css";
import { useFolderStore } from "../../store/folderStore";
import FolderOptionsModal from "../components/eventify/FolderOptionsModal1"; // Import the modal
import "@/styles/FolderDisplay.css";
import EventModal from "../components/EventModal";
import Image from "next/image";
import CustomIIcon from "./customiIcon";
import EditForm from "./editForm";

interface Folder {
  _id: string;
  title: string;
  createdAt: string;
}

const SubFolderDisplay = () => {
  const [showModal, setShowModal] = useState(false);
  const [subfolders, setSubfolders] = useState<Folder[]>([]);
  const [selectedFolder, setSelectedFolder] = useState(null); // State to store selected folder
  const [showEventModal, setShowEventModal] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false); // State for EditForm
  const [selectedFolderId, setSelectedFolderId] = useState<string | undefined>();


  const handleShowEventModal = () => setShowEventModal(true);
  const handleCloseEventModal = () => setShowEventModal(false);
  const [existingFolderData, setExistingFolderData] = useState({
    title: "",
    eventType: "",
    date: "",
    noOfGuests: "",
    description: "",
  });


  const { folderCreated, setFolderCreated } = useFolderStore();
  const { folderId, folderTitle, setFolderId, setSubFolderId ,hasSubfolder,setHasSubfolder,subFolderId} =
    useFolderStore();


  useEffect(() => {
    if (folderId) {
      fetchSubfolders(folderId);
    }
    console.log('maaa',folderId)

    console.log('wooww',folderCreated)
  }, [folderId, folderCreated,setFolderCreated]);

    useEffect(() => {

      //setFolderCreated(false);
      if (!folderId) return;
      console.log('idd',folderId)

    const checkSubfolders = async () => {
      try {
        const response = await axios.get(`/events/check-subfolders/${folderId}`);
        const data = response.data;

        setHasSubfolder(data.hasSubfolders);

        console.log('kill',data.hasSubfolders)

        console.log('sub folder2 is',hasSubfolder)

      } catch (error) {
        console.error("Error checking subfolders:", error);
      }
    };

    checkSubfolders();
  }, [setSubFolderId]);

  const handleShowModal = (folder) => {
    setSelectedFolder(folder);
    setSubFolderId(folder._id);
    setShowModal(true);
  };
  const handleCloseModal = () => setShowModal(false);


  const fetchFolderData = async (folderId: string) => {
    try {
      const response = await axios.get(`/events/subfolders/${folderId}`);
      const folderData = response.data;
      setExistingFolderData({
        title: folderData.title,
        eventType: folderData.eventType,
        date: folderData.date,
        noOfGuests: folderData.noOfGuests,
        description: folderData.description,
      });
      console.log("woww",folderData)
    } catch (error) {
      console.error("Error fetching folder data:", error);
    }
  };

  const fetchSubfolders = async (id: any) => {
    try {
      const response = await axios.get(`/events/folders/${id}/subfolders`);
      setSubfolders(response.data);
      console.log("folder id is", folderId);
    } catch (error) {
      console.error("Error fetching subfolders:", error);
    }
  };

  const handleOptionClick = (option: string, folderId: string) => {
    if (option === "Delete") {
      deleteFolder(folderId);
      setSubFolderId(folderId);

    } else if (option === "Edit") {
      console.log('omggg',folderId)

      setSubFolderId(folderId);
      console.log('bithh',subFolderId)
      fetchFolderData(folderId);
      setShowEditForm(true);
     

    }
  };

  const deleteFolder = async (subFolderId) => {
    try {
      await axios.delete(`/events/subfolders/delete/${subFolderId}`);
      fetchSubfolders(folderId);

      // Update the UI accordingly after deletion
    } catch (error) {
      console.error('Error deleting folder:', error);
    }
  };

  return (
    <div className="eventify-background">
      <h1>Events{folderTitle ? ` / ${folderTitle}` : ""}</h1>
      <div className="folder">
        {subfolders.map((folder) => (
          <div
            key={folder._id}
            className="card"
            style={{
              width: "14rem",
              height: "16rem",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
             <div className="three-dots-container">
              <i className="bi bi-three-dots-vertical three-dots-icon"></i>
              <div className="popup">
              <div className="popup-option" onClick={() => handleOptionClick("Edit", folder._id)}>Edit</div>
                <div className="popup-option" onClick={() => handleOptionClick("Delete", folder._id)}>Delete</div>
              </div>
            </div>
            <Image
              src="/folder.png"
              className="card-img-top cardImg"
              alt="Card image cap"
              width={224}
              height={256}
              onClick={() => handleShowModal(folder)}

            />
            <div className="card-body">
              <p className="card-text">{folder.title}</p>
              <div className="card-divider"></div>
              <div className="card-footer">
                <Image
                  src="/clock.png"
                  className="icon-img"
                  alt="Timer icon"
                  width={10}
                  height={10}
                />
                <span>{new Date(folder.createdAt).toLocaleDateString()}</span>
                <CustomIIcon message="Click the folder to create your event" />
              </div>
            </div>
          </div>
        ))}
        <div
          className="card"
          style={{
            width: "14rem",
            height: "16rem",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div className="grey-overlay">
            <a href="#" onClick={handleShowEventModal}>
              <Image
                src="/addbtn.png"
                className="add-btn"
                alt="Add button"
                width={100}
                height={100}
              />
            </a>
          </div>
          
          <i className="bi bi-three-dots-vertical three-dots-icon"></i>
          <Image
            src="/folder.png"
            className="card-img-top cardImg"
            alt="Card image cap"
            width={224}
            height={256}
          />
          <div className="card-body">
            <p className="card-text" style={{ color: "#F6EDE4" }}>
              Another Event
            </p>
            <div className="card-divider"></div>
            <div className="card-footer">
              <Image
                src="/clock.png"
                className="icon-img"
                alt="Timer icon"
                width={10}
                height={10}
              />
              <span style={{ color: "#F6EDE4" }}>02/01/2023</span>
            </div>
          </div>
        </div>
      </div>
      {showEditForm && (
        <EditForm
          onClose={() => setShowEditForm(false)}
          existingData={existingFolderData}
          folderId={subFolderId}
          isSubFolder={true}

        />
      )}
      {showEventModal && <EventModal onClose={handleCloseEventModal} />}
      {showModal && (
        <FolderOptionsModal show={showModal} handleClose={handleCloseModal} />
      )}
    </div>
  );
};

export default SubFolderDisplay;
