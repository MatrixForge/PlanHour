import React from 'react';
import styles from '../../styles/custom-colors.module.css';
import styles1 from '../../styles/navbar.module.css';
import cardStyles from '../../styles/card.module.css';

const Body = ({ loggedIn }) => {
    return (
        <div 
            className="w-100 d-flex justify-content-center"
            style={{ 
                backgroundImage: "url('/image.png')",
                height: '400px',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                position: 'relative',
                display: 'flex',
                alignItems: 'flex-end',
            }}
        >
            {!loggedIn && (
                <div className={`d-flex flex-row mb-3 ${cardStyles.bottomBar}`}>
                    <input
                        type="text"
                        className={`form-control btn-outline-dark ms-2 rounded-pill shadow-lg ${cardStyles.inputField}`}
                        placeholder="Your Email"
                    />
                    <a
                        className={`btn btn-light mx-2 rounded-pill shadow-lg ${styles.customBrown}`}
                        style={{ 
                            minWidth: '100px',
                        }}
                        href="#"
                    >
                        Sign Up
                    </a>
                </div>
            )}
        </div>
    );
};

export default Body;
