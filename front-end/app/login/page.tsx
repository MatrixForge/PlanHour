"use client";
import React, { useState } from 'react';
import axios from 'axios';
import '../../styles/signin.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import Link from 'next/link';
import useAuthStore from '../../store/authStore';
import { useRouter } from 'next/navigation';
import ForgotPasswordPopup from '../components/ForgotPasswordPopup';

const Login: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const setUser = useAuthStore((state) => state.setUser);
  const router = useRouter();

  const [showPopup, setShowPopup] = useState(false);

  const handleShow = () => setShowPopup(true);
  const handleClose = () => setShowPopup(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleRememberMe = () => {
    setRememberMe((prevRememberMe) => {
      const newRememberMe = !prevRememberMe;
      return newRememberMe;
    });
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/api/users/login", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password, rememberMe })
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Server responded with status ${response.status}: ${errorText}`);
      }

      const data = await response.json();

      if (response.ok) {
        if (rememberMe) {
          localStorage.setItem('token', data.token);
        } else {
          sessionStorage.setItem('token', data.token);
        }
        setUser(data);
        router.push("/");
      } else {
        console.error("Login failed:", data.message);
      }
    } catch (error: any) {
      console.error("Login failed:", error.response?.data?.message || error.message);
    }
  };

  return (
    <div className="outerdiv">
      <div className="flexContainer">
        <div className="leftBox">
          <h1>Log in</h1>
          <form onSubmit={handleLogin}>
            <div className="form-group unique-form-group">
              <input
                type="email"
                className="form-control unique-input"
                id="email"
                aria-describedby="emailHelp"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="form-group unique-form-group">
              <div className="icon-container">
                <input
                  type={showPassword ? "text" : "password"}
                  className="form-control unique-input"
                  id="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <i
                  className={`bi ${showPassword ? "bi-eye-fill" : "bi-eye-slash"} custom-icon`}
                  onClick={togglePasswordVisibility}
                ></i>
              </div>
            </div>
            <div className="form-options">
              <div className="form-check">
                <input
                  type="checkbox"
                  className="form-check-input"
                  id="rememberMe"
                  checked={rememberMe}
                  onChange={toggleRememberMe}
                />
                <label className="form-check-label" htmlFor="rememberMe">
                  Remember Me
                </label>
              </div>
              <p onClick={handleShow} className="forgot-password">
                Forgot Password?
              </p>
            </div>
            <button type="submit" className="btn btn-primary unique-btn-primary rounded-pill">
              Login
            </button>
          </form>
          <p className="signin-link">
            Don't have an account? <Link href="/signup">Sign Up</Link>
          </p>
        </div>
        <div className="rightBox">
          <img src="/cover.png" alt="Cover" />
        </div>
      </div>
      <ForgotPasswordPopup show={showPopup} handleClose={handleClose} />
    </div>
  );
};

export default Login;
