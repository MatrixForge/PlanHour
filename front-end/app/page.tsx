// pages/index.tsx
import React from "react";
import LandingPage from "./(auth)/landing-page/page";

import "bootstrap/dist/css/bootstrap.min.css";

const Home: React.FC = () => {
  return (
    <div>
      <LandingPage />
    </div>
  );
};

export default Home;
