import React, { useEffect, useState } from "react";
import Link from "next/link";
import useAuthStore from "../../store/authStore";
import styles_nav from "../../styles/navbar.module.css"
import styles_color from "../../styles/custom-colors.module.css"
const NavBar: React.FC = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
  const authUser = useAuthStore((state) => state.user);
  const [user, setUser] = useState<any>(null);


  useEffect(() => {
    const updateAuthStatus = () => {
      setLoggedIn(isLoggedIn());
      setUser(authUser);
    };
    
    // Update the auth status on component mount
    updateAuthStatus();
    
    // Set up a listener or subscribe to auth changes
    const unsubscribe = useAuthStore.subscribe(updateAuthStatus);
    
    // Clean up the subscription on component unmount
    return () => unsubscribe();
  }, [isLoggedIn, authUser]);

  return (
    <nav
      className={`navbar navbar-expand-lg navbar-light bg-light ${styles_nav.fontCustom}`}
    >
      <Link href="/" className="navbar-brand">
        <img src="/logo.png" alt="Plan Hour" style={{ width: "100px" }} />
        <span className={`ms-2 ${styles_nav.fontCustom}`}>
          <b>Plan Hour</b>{" "}
        </span>
      </Link>
      <button
        className="navbar-toggler me-3"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse me-5" id="navbarNav">
        <ul className="navbar-nav ms-auto">
          {!loggedIn && (
            <>
              <li className="nav-item">
                <Link
                  href="/login"
                  className={`btn btn-outline-dark ms-2 rounded-pill px-4 py-2 ${styles_nav.fontCustom}`}
                >
                  Login
                </Link>
              </li>
            </>
          )}
          {loggedIn && (
            <>
              <li className="nav-item d-flex align-items-center me-1">
                {user?.name || "User"}
              </li>
            </>
          )}
          {loggedIn && (
            <li className="nav-item">
              <span
                className={`navbar-toggler-icon ${styles_nav.customIcon} ms-5`}
              ></span>
            </li>
          )}
          {!loggedIn && (
            <li className="nav-item">
              <Link
                href="/signup"
                className={`btn btn-light mx-2 rounded-pill px-4 ${styles_nav.fontCustom} ${styles_color.customBrown}`}
              >
                Get Started
              </Link>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;
