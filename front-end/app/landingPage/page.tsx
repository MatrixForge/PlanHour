import React, { useState, useRef } from 'react';
import CustomNavbar from '../components/NavBar'; // Make sure this path is correct
import Body from '../components/body';
import Cards from '../components/Cards';
import Footer from '../components/footer';

const LandingPage = ({ loggedInBool }) => {
    const [loggedIn, setLoggedIn] = useState(loggedInBool);
    const cardsRef = useRef<HTMLDivElement>(null);

    return (
        <div>
            <CustomNavbar loggedIn={loggedIn} cardsRef={cardsRef} />
            <Body loggedIn={loggedIn} />
            <Cards ref={cardsRef} />
            <Footer />
        </div>
    );
};

export default LandingPage;
