// pages/index.tsx
"use client";
import React, { useState } from 'react';
import CustomNavbar from '../components/NavBar';
import Body from '../components/body';
import Card from '../components/Cards';
import Footer from '../components/footer';

const LandingPage = ({loggedInBool}) => {
  const [loggedIn, setLoggedIn] = useState(loggedInBool);
  return (
    <div >
      <CustomNavbar loggedIn={loggedIn} />
      <Body loggedIn={loggedIn} />
      <Card/>
      <Footer/>
      
    </div>
  );
};

export default LandingPage;
