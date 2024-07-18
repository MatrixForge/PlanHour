import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import styles from '../../styles/custom-colors.module.css'; 
import styles1 from '../../styles/navbar.module.css'; 
import Link from 'next/link';
import useAuthStore from '../../store/authStore';

const NavBar: React.FC = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
  const user = useAuthStore((state) => state.user);

  useEffect(() => {
    setLoggedIn(isLoggedIn());
  }, [isLoggedIn]);

  return (
    <nav className="navbar">
      <a className={`navbar-brand ${styles1.fontCustom}`} href="#">
      <img src="/logo.png" alt="Plan Hour" style={{ width: '100px' }} />
        <span className="ms-2 ">Plan Hour</span>
      </a> 

      <div className="ms-auto d-flex flex-row me-3">
        {!loggedIn && (
          <>
            <div>
              <Link className= {`btn btn-outline-dark ms-2 rounded-pill ${styles1.fontCustom}`} href="/login">Login</Link>
            </div>
          </>
        )}
        {loggedIn && (
          <>
            <div className="d-flex justify-content-center align-items-center me-1">
              {user?.name || 'User'}
            </div>
          </>
        )}
        <div>
          <Link className={`btn btn-light mx-2 rounded-pill ${styles.customBrown} ${styles1.fontCustom}`} href="/signup">Get Started</Link>
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
