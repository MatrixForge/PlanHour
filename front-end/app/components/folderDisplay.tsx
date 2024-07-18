import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import '../../styles/FolderDisplay.css'; 
import EventModal from '../components/EventModal'; // Adjust the import based on your EventModal component

const FolderDisplay: React.FC = () => {
  const [showModal, setShowModal] = useState(false);

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  return (
    <>
      <h1>Your Events</h1>
      <div className="folder">
        <div className="card" style={{ width: '14rem', height: '16rem', justifyContent: 'center', alignItems: 'center' }}>
          <i className="bi bi-three-dots-vertical three-dots-icon"></i>
          <img src="/folder.png" className="card-img-top cardImg" alt="Card image cap" />
          <div className="card-body">
            <p className="card-text">Haniya Wedding</p>
            <div className="card-divider"></div>
            <div className="card-footer">
              <img src="/clock.png" className="icon-img" alt="Timer icon" />
              <span>01/01/2023</span>
            </div>
          </div>
        </div>

        <div className="card second-card" style={{ width: '14rem', height: '16rem', justifyContent: 'center', alignItems: 'center' }}>
          <div className="grey-overlay" >
            <a  href="#" onClick={handleShowModal}>            
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
              <span>02/01/2023</span>
            </div>
          </div>
        </div>
      </div>
      {showModal && <EventModal onClose={handleCloseModal} />}
   </>
  );
};

export default FolderDisplay;
