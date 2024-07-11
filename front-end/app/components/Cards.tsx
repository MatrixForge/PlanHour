import React from 'react';
import styles from '../../styles/custom-colors.module.css'; 
import styles1 from '../../styles/navbar.module.css'; 
import cardStyles from '../../styles/card.module.css';
const Cards = () => {
    return (
        <div className={`bg-brown p-4  ${styles.customBrown}`}>
            <div className="d-flex justify-content-center">
                {/* Card 1 */}
                <div className="card rounded-pill mx-3 shadow-lg" style={{ width: '18rem' }}>
                    <button className={styles1.customButton}>
                        <img src="/1.png" className="card-img-top" alt="Card 1" />
                    </button>
                </div>

                {/* Card 2 */}
                <div className={`card rounded-pill mx-3 shadow-lg ${styles.customBrown}`} style={{ width: '18rem' }}>
                    <button className={styles1.customButton}>
                        <img src="/2.png" className="card-img-top" alt="Card 2" />
                    </button>
                </div>

                {/* Card 3 */}
                <div className="card rounded-pill mx-3 shadow-lg" style={{ width: '18rem' }}>
                    <img src="/3.png" className="card-img-top" alt="Card 3" />
                </div>

                {/* Card 4 */}
                <div className="card rounded-pill mx-3 shadow-lg" style={{ width: '18rem' }}>
                    <img src="/4.png" className="card-img-top" alt="Card 4" />
                </div>

                {/* <div className={cardStyles.semicircleContainer}>
                    a
                    <div className={cardStyles.semicircle}>b</div>
                        <div className={cardStyles.content}>
                            a
                        </div>
                </div> */}
            </div>
        </div>
    );
};

export default Cards;
