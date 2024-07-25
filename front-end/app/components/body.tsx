import React from 'react';
import styles from '../../styles/custom-colors.module.css';
import cardStyles from '../../styles/card.module.css';
import bodyStyles from '../../styles/body.module.css'
import 'bootstrap-icons/font/bootstrap-icons.css';

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
                    
                    <div className={`inputContainer position-relative`}>
                    <img
                            src="/emailsend.png" // Image from the public folder
                            alt="Send"
                            className={`position-absolute`}
                            style={{ top: '50%', left: '20px', transform: 'translateY(-50%)', width: '24px', height: '24px' }} // Adjust size as needed
                        />   
                        <input
                            type="text"
                            className={`form-control rounded-pill ps-5 ${cardStyles.inputField} ${cardStyles.customFont} ${cardStyles.noBottomBorder}`}
                            placeholder="Your Email"
                            style={{ width: '300px' }} // Adjust this value as needed
                        />
                    </div>

                    <a
                        className={`btn mx-2 rounded-pill ${styles.customBrown} ${cardStyles.customFont} ${cardStyles.bottomShadow}`}
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
