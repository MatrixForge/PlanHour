import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { useRouter } from 'next/navigation';
import '../../styles/FolderDisplay.css';
import EventModal from '../components/EventModal'; 
import { useSearchParams } from "next/navigation";
import { useFolderStore } from '../../store/folderStore';

const SubFolderDisplay = () => {
  const [showModal, setShowModal] = useState(false);
  const [subfolders, setSubfolders] = useState([]);


  const searchParams = useSearchParams();
  const mainFolderId = searchParams.get("mainFolderId");
  const mainFolderTitle = searchParams.get("mainFolderTitle");
  const { folderCreated, setFolderCreated } = useFolderStore();



  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  useEffect(() => {
    if (mainFolderId) {
      fetchSubfolders(mainFolderId);
    }
  }, [mainFolderId,folderCreated]);

  const fetchSubfolders = async (id) => {
    try {
      const response = await axios.get(`http://localhost:5000/api/events/folders/${id}/subfolders`, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem('token')}`,
        },
      });
      setSubfolders(response.data);
    } catch (error) {
      console.error('Error fetching subfolders:', error);
    }
  };

  return (
    <>
      <h1>Events{mainFolderTitle ? ` / ${mainFolderTitle}` : ''}</h1>
      <div className="folder">
        {subfolders.map((folder) => (
          <div key={folder._id} className="card" style={{ width: '14rem', height: '16rem', justifyContent: 'center', alignItems: 'center' }}>
            <i className="bi bi-three-dots-vertical three-dots-icon"></i>
            <img src="/folder.png" className="card-img-top cardImg" alt="Card image cap" />
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
        <div className="card" style={{ width: '14rem', height: '16rem', justifyContent: 'center', alignItems: 'center' }}>
          <div className="grey-overlay">
            <a href="#" onClick={handleShowModal}>
              <img src="/addbtn.png" className="add-btn" alt="Add button" />
            </a>
          </div>
          <i className="bi bi-three-dots-vertical three-dots-icon"></i>
          <img src="/folder.png" className="card-img-top cardImg" alt="Card image cap" />
          <div className="card-body">
            <p className="card-text" style={{ color: '#F6EDE4' }}>Another Event</p>
            <div className="card-divider"></div>
            <div className="card-footer">
              <img src="/clock.png" className="icon-img" alt="Timer icon" />
              <span style={{ color: '#F6EDE4' }}>02/01/2023</span>
            </div>
          </div>
        </div>
      </div>
      {showModal && <EventModal onClose={handleCloseModal} mainFolderId={mainFolderId} />}
    </>
  );
};

export default SubFolderDisplay;