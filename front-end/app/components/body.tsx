import React from 'react';
import styles from '../../styles/custom-colors.module.css';
import cardStyles from '../../styles/card.module.css';
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
                    
                    <input
                        type="text"
                        className={`form-control ms-2 rounded-pill ${cardStyles.inputField} ${cardStyles.customFont} ${cardStyles.noBottomBorder}`}
                        placeholder="Your Email"

        
                    />
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
