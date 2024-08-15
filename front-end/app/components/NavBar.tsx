// NavBar.tsx
import React, { useEffect, useState } from "react";
import Link from "next/link";
import useAuthStore from "../../store/authStore";
import Sidebar from "../components/sideBar"; // Adjust the path as needed
import styles_nav from "../../styles/navbar.module.css";
import styles_color from "../../styles/custom-colors.module.css";
import axios from "@/lib/axios";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface NavBarProps {
  cardsRef?: React.RefObject<HTMLDivElement>;
}

const NavBar: React.FC<NavBarProps> = ({ cardsRef }) => {
  const [user, setUser] = useState<any>(null);
  const [showLogout, setShowLogout] = useState(false);
  const [pathname, setPathname] = useState("");
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const router = useRouter();
  useEffect(() => {
    setPathname(window.location.pathname); // Get the current pathname
  }, []);

  useEffect(() => {
    const updateAuthStatus = async () => {
      try {
        const response = await axios.get("/users/me");

        setUser(response.data);
      } catch (error) {
        console.error("Failed to fetch user:", error);
        setUser(null); // Clear user if the token is invalid or request fails
      }
    };

    updateAuthStatus();
    const unsubscribe = useAuthStore.subscribe(updateAuthStatus);
    return () => unsubscribe();
  }, []);

  const handleLogout = () => {
    useAuthStore.getState().logout();
    router.replace("/");
    };

  const handleGetStartedClick = () => {
    if (cardsRef?.current) {
      const offsetTop = cardsRef.current.offsetTop;
      const scrollPosition = offsetTop - 100; // Adjust this value to control how much you want to scroll

      window.scrollTo({
        top: scrollPosition,
        behavior: "smooth",
      });
    }
  };

  // List of routes where the hamburger icon should be shown
  const showHamburgerRoutes = [
    "/budget",
    "/to-do-list",
    "/guestListPage",
    "/add-event",
  ];
  const showHamburgerIcon = showHamburgerRoutes.includes(pathname);

  return (
    <>
      <nav
        className={`navbar navbar-expand-lg ${styles_nav.fontCustom} ${styles_nav.navbarBackground}`}
      >
        <Link href="/" className="navbar-brand">
          <Image src="/logo.png" alt="Plan Hour" width={100} height={100} />
          <span className={`ms-2 ${styles_nav.fontCustom} font-montserrat`}>
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
            {!user && (
              <li className="nav-item">
                <Link
                  href="/login"
                  className={`btn btn-outline-dark ms-2 rounded-pill px-4 py-2 ${styles_nav.fontCustom} font-montserrat`}
                >
                  Login
                </Link>
              </li>
            )}
            {user && (
              <li
                className={`nav-item d-flex align-items-center me-1 position-relative btn btn-light mx-2 rounded-pill px-4 ${styles_nav.fontCustom} ${styles_color.customBrown}`}
                onMouseEnter={() => setShowLogout(true)}
                onMouseLeave={() => setShowLogout(false)}
              >
                {user?.name || "User"}
                {showLogout && (
                  <div
                    className={`${styles_nav.logoutDropdown} font-montserrat`}
                    onClick={handleLogout}
                  >
                    Logout
                  </div>
                )}
              </li>
            )}
            {user && showHamburgerIcon && (
              <li className="nav-item">
                <span
                  className={`navbar-toggler-icon ${styles_nav.customIcon}`}
                  onClick={() => setSidebarOpen(!isSidebarOpen)}
                ></span>
              </li>
            )}
            {!user && (
              <li className="nav-item">
                <button
                  onClick={handleGetStartedClick}
                  className={`font-montserrat btn btn-light mx-2 rounded-pill px-4 ${styles_nav.fontCustom} ${styles_color.customBrown}`}
                >
                  Get Started
                </button>
              </li>
            )}
          </ul>
        </div>
      </nav>
      {showHamburgerIcon && (
        <Sidebar isOpen={isSidebarOpen} onClose={() => setSidebarOpen(false)} />
      )}
    </>
  );
};
export default NavBar;
