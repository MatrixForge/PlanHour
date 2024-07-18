import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import '../../styles/FolderDisplay.css'; 

const FolderDisplay: React.FC = () => {
  const [showOptions, setShowOptions] = useState(false);

  return (
    <><h1>Your Events</h1><div className="folder">
      <div className="card" style={{ width: '14rem', height: '16rem', justifyContent: 'center', alignItems: 'center' }}>
        {/* Three dots icon */}
        <i className="bi bi-three-dots-vertical three-dots-icon"></i>

        <img src="/folder.png" className="card-img-top cardImg" alt="Card image cap" /> 
        <div className="card-body">
          <p className="card-text">
            Haniya Wedding
          </p>
          {/* Black line */}
          <div className="card-divider"></div>
          {/* Timer icon and created date */}
          <div className="card-footer">
            <img src="/clock.png" className="icon-img" alt="Timer icon" />
            <span>01/01/2023</span>
          </div>
        </div>
      </div>

    </div></>
  );
};

export default FolderDisplay;
