import React, { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap-icons/font/bootstrap-icons.css";
import "@styles/FolderDisplay.css";
import EventModal from "./EventModal";
import { useSearchParams } from "next/navigation";
import { useFolderStore } from "@/store/folderStore";
import FolderOptionsModal from "./eventify/FolderOptionsModal";

const SubFolderDisplay: React.FC = () => {
  const [showModal, setShowModal] = useState(false);
  const [showOptionsModal, setShowOptionsModal] = useState(false);
  const [subfolders, setSubfolders] = useState([]);
  const [selectedFolderId, setSelectedFolderId] = useState<string | null>(null);
  const searchParams = useSearchParams();
  const { folderId, subFolderId, setFolderCreated, setSubFolderId } =
    useFolderStore();
  // const mainFolderTitle = searchParams.get("mainFolderTitle");

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  const handleShowOptionsModal = (sub_folderId: string) => {
    setSubFolderId(sub_folderId);
    setShowOptionsModal(true);
  };

  const handleCloseOptionsModal = () => {
    setSelectedFolderId(null);
    setShowOptionsModal(false);
  };

  useEffect(() => {
    if (folderId) {
      fetchSubfolders(folderId);
    }
  }, [folderId, setFolderCreated]);

  const fetchSubfolders = async (id: string) => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/events/folders/${id}/subfolders`,
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
          },
        }
      );
      setSubfolders(response.data);
    } catch (error) {
      console.error("Error fetching subfolders:", error);
    }
  };
  return (
    <>
      <h1>Events xyz</h1>
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
            onClick={() => handleShowOptionsModal(folder._id)}
          >
            <i className="bi bi-three-dots-vertical three-dots-icon"></i>
            <img
              src="/folder.png"
              className="card-img-top cardImg"
              alt="Card image cap"
            />
            <div className="card-body">
              <p className="card-text">{folder.title}</p>
              <div className="card-divider"></div>
              <div className="card-footer">
                <img src="/clock.png" className="icon-img" alt="Timer icon" />
                <span>{new Date(folder.createdAt).toLocaleDateString()}</span>
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
            <a href="#" onClick={handleShowModal}>
              <img src="/addbtn.png" className="add-btn" alt="Add button" />
            </a>
          </div>
          <i className="bi bi-three-dots-vertical three-dots-icon"></i>
          <img
            src="/folder.png"
            className="card-img-top cardImg"
            alt="Card image cap"
          />
          <div className="card-body">
            <p className="card-text" style={{ color: "#F6EDE4" }}>
              Another Event
            </p>
            <div className="card-divider"></div>
            <div className="card-footer">
              <img src="/clock.png" className="icon-img" alt="Timer icon" />
              <span style={{ color: "#F6EDE4" }}>02/01/2023</span>
            </div>
          </div>
        </div>
      </div>
      {showModal && (
        <EventModal onClose={handleCloseModal} mainFolderId={folderId} />
      )}
      {showOptionsModal && (
        <FolderOptionsModal
          show={showOptionsModal}
          handleClose={handleCloseOptionsModal}
        />
      )}
    </>
  );
};

export default SubFolderDisplay;
