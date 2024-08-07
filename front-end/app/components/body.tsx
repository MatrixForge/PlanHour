"use client";
import React, { useEffect, useState } from "react";
import styles from "@styles/custom-colors.module.css";
import cardStyles from "@styles/card.module.css";
import "@styles/body.module.css";
import { useRouter } from "next/navigation";
import Image from "next/image";

const Body = () => {
  const [localFound, setlocalFound] = useState("");
  const [sessionFound, setSessionFound] = useState("");
  useEffect(() => {
    setlocalFound(localStorage.getItem("loggedIn") || "");
    setSessionFound(sessionStorage.getItem("loggedIn") || "");
  });

  const [email, setEmail] = useState("");
  const router = useRouter();
  const handleSignUpClick = () => {
    if (email) {
      if (typeof window !== "undefined") {
        sessionStorage.setItem("signupEmail", email);
      }
      router.push("/signup");
    }
  };

  return (
    <div
      className="w-100 d-flex justify-content-center"
      style={{
        backgroundImage: "url('/image.png')",
        height: "400px",
        backgroundSize: "cover",
        backgroundPosition: "center",
        position: "relative",
        display: "flex",
        alignItems: "flex-end",
        backgroundColor: "#fff",
      }}
    >
      {sessionFound !== "true" && localFound !== "true" && (
        <div className={`d-flex flex-row mb-3 ${cardStyles.bottomBar}`}>
          <div className={`inputContainer position-relative`}>
            <Image
              src="/emailsend.png" // Image from the public folder
              alt="Send"
              className={`position-absolute`}
              width={24}
              height={24}
              style={{
                top: "50%",
                left: "20px",
                transform: "translateY(-50%)",
                width: "24px",
                height: "24px",
              }} // Adjust size as needed
            />
            <input
              type="text"
              className={`font-montserrat form-control rounded-pill ps-5 ${cardStyles.inputField} ${cardStyles.customFont} ${cardStyles.noBottomBorder}`}
              placeholder="Your Email"
              style={{ width: "300px" }} // Adjust this value as needed
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <a
            className={`font-sharp-sans btn mx-2 rounded-pill ${styles.customBrown} ${cardStyles.customFont} ${cardStyles.bottomShadow}`}
            style={{
              minWidth: "100px",
              fontWeight: "600",
            }}
            onClick={handleSignUpClick}
          >
            Sign Up
          </a>
        </div>
      )}
    </div>
  );
};

export default Body;
