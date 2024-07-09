import React from 'react';
import styles from '../../styles/custom-colors.module.css'; 

const Cards = () => {
    return (
        <div className="bg-brown p-4">
            <div className="d-flex justify-content-center">
                {/* Card 1 */}
                <div className="card rounded-pill mx-3 shadow-lg " style={{ width: '18rem' }}>
                    <img src="/1.png" className="card-img-top" alt="Card 1" />
                </div>

                {/* Card 2 */}
                <div className="card rounded-pill mx-3 shadow-lg" style={{ width: '18rem' }}>
                    <img src="/2.png" className="card-img-top" alt="Card 2" />
                </div>

                {/* Card 3 */}
                <div className="card rounded-pill mx-3 shadow-lg" style={{ width: '18rem' }}>
                    <img src="/3.png" className="card-img-top" alt="Card 3" />
                </div>

                {/* Card 4 */}
                <div className="card rounded-pill mx-3 shadow-lg" style={{ width: '18rem' }}>
                    <img src="/4.png" className="card-img-top" alt="Card 4" />
                </div>
            </div>
        </div>
    );
};

export default Cards;
