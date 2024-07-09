// pages/index.tsx
import React from 'react';
import CustomNavbar from './components/NavBar';
import Card from './components/Cards';
import Footer from './components/footer';

import 'bootstrap/dist/css/bootstrap.min.css';

const Home: React.FC = () => {
  return (
    <div >
      <CustomNavbar />
      <div
        className="w-100"
        style={{ 
          backgroundImage: "url('/image.png')",
          height: '400px',
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >

      </div>

      <Card/>

      
    </div>
  );
};

export default Home;
