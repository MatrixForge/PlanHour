"use client";
import React, { useState, useEffect } from "react";
import "@styles/signup.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";
import axios from "@/lib/axios";

const Signup: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Retrieve the email from session storage
    if (typeof window !== "undefined") {
      const storedEmail = sessionStorage.getItem("signupEmail");
      if (storedEmail) {
        setEmail(storedEmail);
        sessionStorage.removeItem("signupEmail"); // Clear it after use
      }
    }
  }, []);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const extractNameFromEmail = (email: string) => {
    return email.split("@")[0];
  };

  const validateEmail = (email: string) => {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
    return emailPattern.test(email);
  };

  const validatePassword = (password: string) => {
    const passwordPattern =
      /^(?=.*[0-9])(?=.*[!@#$%^&*])[A-Za-z0-9!@#$%^&*]{7,}$/;
    return passwordPattern.test(password);
  };

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      setError("Email must be a valid @gmail.com address");
      return;
    }

    if (!validatePassword(password)) {
      setError(
        "Password must be at least 7 characters long and include at least one special character and one digit"
      );
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      setLoading(true);

      console.log("wooww");
      const name = extractNameFromEmail(email);

      const response = await axios.post(`/users/register`, {
        name,
        email,
        password,
      });
      if (response.status === 201) {
        setMessage("Registration successful!");
        setError("");
        setLoading(false);
        router.push("/login");
      } else {
        setError("Registration failed. Please try again.");
        setLoading(false);
      }
    } catch (error: any) {
      setError(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      );
      setLoading(false);
    }
  };

  return (
    <div className="outerdiv">
      <div className="flexContainer">
        <div className="leftBox">
          <h1 className="font-montserrat">Sign up</h1>
          {error && <div className="alert alert-danger">{error}</div>}
          {message && <div className="alert alert-success">{message}</div>}
          {loading && <div>Loading...</div>}
          <form onSubmit={submitHandler}>
            <div className="form-group">
              <input
                type="email"
                className="font-sharp-sans form-control"
                id="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="form-group">
              <div className="icon-container">
                <input
                  type={showPassword ? "text" : "password"}
                  className="font-sharp-sans form-control"
                  id="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <i
                  className={`bi ${
                    showPassword ? "bi-eye-fill" : "bi-eye-slash"
                  } custom-icon`}
                  onClick={togglePasswordVisibility}
                ></i>
              </div>
            </div>
            <div className="form-group">
              <input
                type="password"
                className="font-sharp-sans form-control"
                id="confirmPassword"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
            <button
              type="submit"
              className="font-sharp-sans btn btn-primary rounded-pill"
            >
              Sign Up
            </button>
            <p className="font-sharp-sans signin-link">
              Already have an account? <Link href="/login">Sign in</Link>
            </p>
          </form>
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
    </div>
  );
};

export default Signup;
