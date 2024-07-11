import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import styles from '../../styles/custom-colors.module.css'; 
import styles1 from '../../styles/navbar.module.css'; 
import Link from 'next/link';

interface NavBarProps {
  loggedIn: boolean;
}

const NavBar: React.FC<NavBarProps> = ({ loggedIn }) => {
  return (
    <nav className="navbar">
      <a className="navbar-brand" href="#">
        <img src="/logo.png" alt="Plan Hour" style={{ width: '100px' }} />
        <span className="ms-2">Plan Hour</span>
      </a> 

      <div className="ms-auto d-flex flex-row me-3">
        {!loggedIn && (
          <>
            <div>
              <Link className="btn btn-outline-dark ms-2 rounded-pill" href="/login">Login</Link>
            </div>
          </>
        )}
        {loggedIn && (
          <>
            <div className="d-flex justify-content-center align-items-center me-1">
              Aiyza
            </div>
          </>
        )}
            <div>
              <Link className={`btn btn-light mx-2 rounded-pill ${styles.customBrown}`} href="/signup">Get Started</Link>
            </div>
        <div>
          <button className={styles1.customButton}>
            <span className={`navbar-toggler-icon ${styles1.customIcon}`}></span>
          </button>
        </div>
      </div> 
    </nav>
  );
};

export default NavBar;
