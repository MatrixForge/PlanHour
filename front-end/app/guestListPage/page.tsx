"use client";
import React, { useState, useEffect } from 'react';
import CustomNavbar from '../components/NavBar';
import Footer from '../components/footer';
import GuestBox from '../components/GuestLsit/GuestBox';
import styles from '../../styles/custom-colors.module.css'; 
import styles1 from '../../styles/guestList.module.css'; 
import Link from 'next/link';
import Papa from 'papaparse';

const GuestListPage = () => {
    const [checkedGuests, setCheckedGuests] = useState<{ [key: string]: boolean }>({});
    const [headerChecked, setHeaderChecked] = useState(false);
    const [guests, setGuests] = useState<Array<{ name: string; email: string; number: string }>>([]);

    const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { id, checked } = event.target;

        if (id === 'header-checkbox') {
            setHeaderChecked(checked);
            setCheckedGuests((prev) => {
                const newCheckedGuests = Object.keys(prev).reduce((acc, key) => {
                    acc[key] = checked;
                    return acc;
                }, {} as { [key: string]: boolean });
                return newCheckedGuests;
            });
        } else {
            setCheckedGuests((prev) => ({
                ...prev,
                [id]: checked
            }));
        }
    };

    const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            Papa.parse(file, {
                header: true,
                complete: (results) => {
                    const guestsData = results.data as Array<{ name: string; email: string; number: string }>;
                    setGuests(guestsData);
                    localStorage.setItem('guests', JSON.stringify(guestsData));
                },
                skipEmptyLines: true
            });
        }
    };

    useEffect(() => {
        const savedGuests = localStorage.getItem('guests');
        if (savedGuests) {
            setGuests(JSON.parse(savedGuests));
        }
    }, []);

    useEffect(() => {
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
                                <button 
                                    className={`btn btn-light mx-2 rounded-pill custom d-flex flex-row justify-content-center align-items-center ${styles.customBrown} ${styles1.fontCustom}`}
                                    onClick={() => document.getElementById('file-input')?.click()}
                                >
                                    <i className={`bi bi-cloud-upload-fill ${styles1.icon}`}></i>
                                    Import
                                </button>
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
            <input
                type="file"
                id="file-input"
                style={{ display: 'none' }}
                accept=".csv"
                onChange={handleFileUpload}
            />
            <Footer />
        </div>
    );
};

export default GuestListPage;
