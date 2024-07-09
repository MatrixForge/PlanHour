import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import styles from '../../styles/custom-colors.module.css'; 

const NavBar: React.FC = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white">
      <a className="navbar-brand" href="#">
        <img src="/logo.png" alt="Plan Hour" style={{ width: '100px' }} />
        <span className="ms-2">Plan Hour</span>
      </a>

      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
        <ul className="navbar-nav mr-auto"> 
          <li className="nav-item">
          <a className="btn btn-outline-dark ms-2 rounded-pill" href="#">Login</a>
          </li>

          <li className="nav-item">
          <a className={`nav-link btn btn-light mx-2 rounded-pill  ${styles.customBrown}`} href="#">Get Started</a>
          </li>

          <li className="nav-item">
               </li>

        </ul>
      </div>
    </nav>
  );
};

export default NavBar;
