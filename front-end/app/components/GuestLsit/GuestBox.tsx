import React from 'react';
import styles1 from '@styles/guestBox.module.css'; 

interface GuestBoxProps {
  guest: {
    name: string;
    email: string;
    number: string;
  };
  index: number;
  checked: boolean;
  onCheckboxChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const GuestBox = ({ guest, index, checked, onCheckboxChange }: GuestBoxProps) => {
  return (
    <div className={styles1.guestBoxRow}>
      <input
        type="checkbox"
        className={styles1.checkbox}
        id={`checkbox-${index}`}
        checked={checked}
        onChange={onCheckboxChange}
      />
      <label htmlFor={`checkbox-${index}`} className={styles1.customCheckbox}></label>
      <div className={styles1.guestName}>{guest.name}</div>
      <div className={styles1.email}>{guest.email}</div>
      <div className={styles1.number}>{guest.number}</div>
      <div className={styles1.icon}><i className="bi bi-three-dots"></i></div> {/* Icon for options */}
    </div>
  );
};

export default GuestBox;
