// pages/index.tsx
"use client";
import React, { useState } from "react";
import LandingPage from "./landing-page/page";

import "bootstrap/dist/css/bootstrap.min.css";

const Home: React.FC = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  return (
    <div>
      <LandingPage loggedInBool={loggedIn} />
    </div>
  );
};

export default Home;
