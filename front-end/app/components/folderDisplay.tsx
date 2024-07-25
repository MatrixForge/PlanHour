import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import '../../styles/FolderDisplay.css';
import Link from 'next/link';
import { useFolderStore } from '../../store/folderStore';
import FolderOptionsModal from '../components/eventify/FolderOptionsModal';

interface Folder {
  _id: string;
  title: string;
  createdAt: string;
}

const FolderDisplay: React.FC = () => {
  const [folders, setFolders] = useState<Folder[]>([]);
  const [showModal, setShowModal] = useState(false);
  const { folderCreated, setFolderCreated } = useFolderStore();

  useEffect(() => {
    fetchFolders();
    setFolderCreated(false);
  }, [folderCreated]);

  const fetchFolders = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/events/folders', {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem('token')}`,
        },
      });
      setFolders(response.data);
    } catch (error) {
      console.error('Error fetching folders:', error);
    }
  };

  const handleFolderClick = () => {
    setShowModal(true);
  };

  const handleCloseModal = (e) => {
    if (e.target.classList.contains('popup')) {
      return;
    }
    setShowModal(false);
  };

  return (
    <>
      <h1>Events</h1>
      <div className="folder">
        {folders.map((folder) => (
          <div 
            key={folder._id} 
            className="card" 
            style={{ width: '14rem', height: '16rem', justifyContent: 'center', alignItems: 'center' }}
            onClick={handleFolderClick}
          >
            <i className="bi bi-three-dots-vertical three-dots-icon"></i>
            <img src="/folder.png" className="card-img-top cardImg" alt="Card image cap" />
            <div className="card-body">
              <p className="card-text">{folder.title}</p>
              <div className="card-footer">
                <img src="/clock.png" className="icon-img" alt="Timer icon" />
                <span>{new Date(folder.createdAt).toLocaleDateString()}</span>
              </div>
            </div>
          </div>
        ))}
        <div className="card" style={{ width: '14rem', height: '16rem', justifyContent: 'center', alignItems: 'center' }}>
          <div className="grey-overlay">
            <a href="#" onClick={handleFolderClick}>
              <img src="/addbtn.png" className="add-btn" alt="Add button" />
            </a>
          </div>
          <i className="bi bi-three-dots-vertical three-dots-icon"></i>
          <img src="/folder.png" className="card-img-top cardImg" alt="Card image cap" />
          <div className="card-body">
            <p className="card-text" style={{ color: '#F6EDE4' }}>Another Event</p>
            <div className="card-footer">
              <img src="/clock.png" className="icon-img" alt="Timer icon" />
              <span style={{ color: '#F6EDE4' }}>02/01/2023</span>
            </div>
          </div>
        </div>
      </div>
      {showModal && <FolderOptionsModal show={showModal} handleClose={handleCloseModal} />}
    </>
  );
};

export default FolderDisplay;
