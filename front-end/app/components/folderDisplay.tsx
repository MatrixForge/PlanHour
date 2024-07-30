import React, { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap-icons/font/bootstrap-icons.css";
import "@styles/FolderDisplay.css";
import EventModal from "../components/EventModal";
import FolderOptionsModal from "../components/eventify/FolderOptionsModal";
import { useFolderStore } from "../../store/folderStore";
import Image from "next/image";
interface Folder {
  _id: string;
  title: string;
  createdAt: string;
}

const FolderDisplay: React.FC = () => {
  const [folders, setFolders] = useState<Folder[]>([]);
  const [showEventModal, setShowEventModal] = useState(false);
  const [showOptionsModal, setShowOptionsModal] = useState(false);
  const { folderCreated, setFolderCreated } = useFolderStore();
  const { setFolderId, setFolderTitle } = useFolderStore();

  useEffect(() => {
    fetchFolders();
    setFolderId(undefined);
    setFolderCreated(false);
  }, [folderCreated]);

  const fetchFolders = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/events/folders",
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
          },
        }
      );
      setFolders(response.data);
    } catch (error) {
      console.error("Error fetching folders:", error);
    }
  };

  const handleShowEventModal = () => setShowEventModal(true);
  const handleCloseEventModal = () => setShowEventModal(false);

  const handleShowOptionsModal = (folderId: string, folderTitle: string) => {
    setFolderId(folderId);
    setFolderTitle(folderTitle);
    console.log("folder id is", folderId);
    setShowOptionsModal(true);
  };
  const handleCloseOptionsModal = () => setShowOptionsModal(false);

  return (
    <>
      <h1>Events</h1>
      <div className="folder">
        {folders.map((folder) => (
          <div
            key={folder._id}
            className="card"
            style={{
              width: "14rem",
              height: "16rem",
              justifyContent: "center",
              alignItems: "center",
            }}
            onClick={() => handleShowOptionsModal(folder._id, folder.title)}
          >
            <i className="bi bi-three-dots-vertical three-dots-icon"></i>
            <Image
              src="/folder.png"
              className="card-img-top cardImg"
              alt="Card image cap"
              width={224}
              height={256}
            />
            <div className="card-body">
              <p className="card-text">{folder.title}</p>
              <div className="card-footer">
                <Image
                  src="/clock.png"
                  className="icon-img"
                  alt="Timer icon"
                  width={10}
                  height={10}
                />
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
      {showEventModal && <EventModal onClose={handleCloseEventModal} />}
      <FolderOptionsModal
        show={showOptionsModal}
        handleClose={handleCloseOptionsModal}
      />
    </>
  );
};

export default FolderDisplay;
