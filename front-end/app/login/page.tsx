"use client";

import React, { useState } from "react";
import "../../styles/signin.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import Link from "next/link";
import useAuthStore from "@/store/authStore";
import { useRouter } from "next/navigation";
import ForgotPasswordPopup from "../components/ForgotPasswordPopup";
import Image from "next/image";
import axios from "@/lib/axios";
const Login: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [showPopup, setShowPopup] = useState(false);

  const setUser = useAuthStore((state: any) => state.setUser);
  const router = useRouter();

  const handleShow = () => setShowPopup(true);
  const handleClose = () => setShowPopup(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleRememberMe = () => {
    setRememberMe((prevRememberMe) => !prevRememberMe);
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await axios.post("/users/login", {
        email,
        password,
        rememberMe,
      });

      if (!response) {
        throw new Error("Invalid email or password");
      }

      const data = await response.data;

      if (data.token) {
        if (rememberMe) {
          if (typeof window !== "undefined") {
            localStorage.setItem("token", data.token); // Store token in localStorage
            useAuthStore.setState({ user: data }); // Update Zustand state
            useAuthStore.setState({ loggedIn: true });
            localStorage.setItem("loggedIn", "true");
          }
        } else {
          if (typeof window !== "undefined") {
            sessionStorage.setItem("token", data.token); // Store token in sessionStorage
            useAuthStore.setState({ user: data }); // Update Zustand state
            useAuthStore.setState({ loggedIn: true });
            sessionStorage.setItem("loggedIn", "true");
          }
        }
        router.push("/");
      } else {
        setErrorMessage("Invalid email or password");
      }
    } catch (error: any) {
      console.error("Login failed:", error.message);
    }
  };

  return (
    <div className="outerdiv">
      <div className="flexContainer">
        <div className="leftBox">
          <h1 className="font-montserrat">Log in</h1>
          <form onSubmit={handleLogin}>
            <div className="form-group unique-form-group">
              <input
                type="email"
                className="font-sharp-sans form-control unique-input"
                id="email"
                aria-describedby="emailHelp"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="form-group unique-form-group">
              <div className="icon-container">
                <input
                  type={showPassword ? "text" : "password"}
                  className="font-sharp-sans form-control unique-input"
                  id="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <i
                  className={`bi ${
                    showPassword ? "bi-eye-fill" : "bi-eye-slash"
                  } custom-icon`}
                  onClick={togglePasswordVisibility}
                ></i>
              </div>
            </div>
            {errorMessage && (
              <div className="alert alert-danger" role="alert">
                {errorMessage}
              </div>
            )}{" "}
            {/* Display error message using Bootstrap alert */}
            <div className="form-options">
              <div className="form-check">
                <input
                  type="checkbox"
                  className="form-check-input"
                  id="rememberMe"
                  checked={rememberMe}
                  onChange={toggleRememberMe}
                />
                <label
                  className="font-sharp-sans form-check-label"
                  htmlFor="rememberMe"
                >
                  Remember Me
                </label>
              </div>
              <p
                onClick={handleShow}
                className="font-sharp-sans forgot-password"
              >
                Forgot Password?
              </p>
            </div>
            <button
              type="submit"
              className="font-sharp-sans btn btn-primary unique-btn-primary rounded-pill"
            >
              Login
            </button>
          </form>
          <p className="font-sharp-sans signin-link">
            Don&apos;t have an account? <Link href="/signup">Sign Up</Link>
          </p>
        </div>
        <div className="rightBox">
          <Image
            src="/cover.png"
            alt="Cover"
            layout="fill" // Adjust the layout to fill
            className="customImage"
          />
        </div>
      </div>
      <ForgotPasswordPopup show={showPopup} handleClose={handleClose} />
    </div>
  );
};

export default Login;
