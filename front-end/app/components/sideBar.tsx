// Sidebar.tsx
import React from "react";
import Link from "next/link";
import styles from "../../styles/sidebar.module.css"; // Adjust the path as needed

const Sidebar: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
  return (
    <div className={`${styles.sidebar} ${isOpen ? styles.open : ""}`}>
      <button className={styles.closeBtn} onClick={onClose}>
        &times;
      </button>
      <ul className={styles.menu}>
        <li><Link href="/">Home</Link></li>
        <li><Link href="/BudgetPage">Budget Page</Link></li>
        <li><Link href="/toDoList">To-Do List</Link></li>
        <li><Link href="/guestListPage">Guest List</Link></li>
        <li><Link href="/eventify"> View Events</Link></li>
        <li><Link href="/addEvent"> Add Event</Link></li>


      </ul>
    </div>
  );
};

export default Sidebar;
