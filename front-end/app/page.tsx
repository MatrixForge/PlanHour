// pages/index.tsx
 "use client";
import React, { useState } from 'react';
import LandingPage from './landingPage/page';

import 'bootstrap/dist/css/bootstrap.min.css';

const Home: React.FC = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  return (
    <div >
      <LandingPage loggedInBool={loggedIn}/>
      
    </div>
  );
};

export default Home;
