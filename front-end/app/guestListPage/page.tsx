"use client";
import React, { useState } from 'react';
import CustomNavbar from '../components/NavBar';
import Footer from '../components/footer';
import GuestBox from '../components/GuestLsit/GuestBox';
import styles from '../../styles/custom-colors.module.css'; 
import styles1 from '../../styles/guestList.module.css'; 
import Link from 'next/link';

const GuestListPage = () => {
    const [checkedGuests, setCheckedGuests] = useState<{ [key: string]: boolean }>({});
    const [headerChecked, setHeaderChecked] = useState(false);

    const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { id, checked } = event.target;

        if (id === 'header-checkbox') {
            // Toggle all checkboxes based on header checkbox state
            setHeaderChecked(checked);
            setCheckedGuests((prev) => {
                const newCheckedGuests = Object.keys(prev).reduce((acc, key) => {
                    acc[key] = checked;
                    return acc;
                }, {} as { [key: string]: boolean });
                return newCheckedGuests;
            });
        } else {
            // Update individual checkbox state
            setCheckedGuests((prev) => ({
                ...prev,
                [id]: checked
            }));
        }
    };

    const guests = [
        { name: 'John Doe', email: 'john@example.com', number: '123-456-7890' },
        { name: 'John Doe', email: 'john@example.com', number: '123-456-7890' },
        { name: 'John Doe', email: 'john@example.com', number: '123-456-7890' },
        { name: 'John Doe', email: 'john@example.com', number: '123-456-7890' },
        { name: 'John Doe', email: 'john@example.com', number: '123-456-7890' },
        { name: 'John Doe', email: 'john@example.com', number: '123-456-7890' },
        { name: 'John Doe', email: 'john@example.com', number: '123-456-7890' },
        { name: 'John Doe', email: 'john@example.com', number: '123-456-7890' },
        { name: 'John Doe', email: 'john@example.com', number: '123-456-7890' },
        { name: 'John Doe', email: 'john@example.com', number: '123-456-7890' },
        { name: 'John Doe', email: 'john@example.com', number: '123-456-7890' },
        { name: 'John Doe', email: 'john@example.com', number: '123-456-7890' },
        { name: 'Jane Smith', email: 'jane@example.com', number: '987-654-3210' }
        // Add more guests as needed
    ];

    // Initialize checkedGuests state to ensure all checkboxes reflect the header checkbox state
    React.useEffect(() => {
        const initialCheckedState = guests.reduce((acc, _, index) => {
            acc[`checkbox-${index}`] = headerChecked;
            return acc;
        }, {} as { [key: string]: boolean });
        setCheckedGuests(initialCheckedState);
    }, [headerChecked, guests.length]);

    return (
        <div>
            <CustomNavbar />
            <div className={`${styles1.coverContainer} ${styles1.fontCustom}`}>
                <div className={styles1.cover}>
                    <img src='navbg.png' alt="Background" className={styles1.coverImage} />
                </div>
                <div className={styles1.guestBoxContainer}>
                    <div className={styles1.guestBox}>
                        <div className={styles1.guestBoxHeader}>
                            <div className={styles1.guestListText}>Guest List</div>
                            <input type="text" className={`form-control ${styles1.searchBar}`} placeholder="Search..." />
                            <div className={styles1.buttons}>
                                <Link className={`btn btn-light mx-2 rounded-pill custom d-flex flex-row justify-content-center align-items-center ${styles.customBrown} ${styles1.fontCustom}`} href="/">
                                    <i className={`bi bi-cloud-upload-fill ${styles1.icon}`}></i>
                                    Import
                                </Link>
                                <Link className={`btn btn-light mx-2 rounded-pill custom d-flex flex-row justify-content-center align-items-center ${styles.customBrown} ${styles1.fontCustom}`} href="/">
                                    <i className={`bi bi-send-fill ${styles1.icon}`}></i>
                                    Send
                                </Link>
                                <Link className={`btn btn-light mx-2 rounded-pill custom d-flex flex-row justify-content-center align-items-center ${styles.customBrown} ${styles1.fontCustom}`} href="/">
                                    <i className={`bi bi-plus-lg ${styles1.icon}`}></i>
                                    AddGuest
                                </Link>
                            </div>
                        </div>

                        <div className={styles1.guestBoxHeaderRow}>
                            <input
                                type="checkbox"
                                className={styles1.checkbox}
                                id="header-checkbox"
                                checked={headerChecked}
                                onChange={handleCheckboxChange}
                            />
                            <label htmlFor="header-checkbox" className={styles1.customCheckbox}></label>
                            <div className={styles1.guestName}><strong>Guest Name</strong></div>
                            <div className={styles1.email}><strong>Email</strong></div>
                            <div className={styles1.number}><strong>Number</strong></div>
                            <div className={styles1.icon}></div> {/* Empty for alignment */}
                        </div>

                        {guests.map((guest, index) => (
                            <GuestBox
                                key={index}
                                guest={guest}
                                index={index}
                                checked={checkedGuests[`checkbox-${index}`]}
                                onCheckboxChange={handleCheckboxChange}
                            />
                        ))}
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default GuestListPage;
