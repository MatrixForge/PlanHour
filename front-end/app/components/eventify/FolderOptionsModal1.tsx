"use client";
import React from "react";
import styles from "@styles/folderOptions.module.css";
import Link from "next/link";
import Image from "next/image";

const FolderOptionsModal = ({ show, handleClose }) => {
  return (
    <div className={`${styles.popup1} ${show ? styles.show : ""}`}>
      <div
        className={styles.coverImage}
        style={{ backgroundImage: `url('/cover.png')` }}
      >
        <button className={styles.closeButton} onClick={handleClose}>
          <i className="bi bi-x-lg"></i>
        </button>
        <div className={styles.optionsBackground}>
          <h2 className={`${styles.optionsHeader}`}>Navigate</h2>
          <div className={styles.options}>
            <Link href="/add-event">
              <button className={`${styles.button2}`}>
                <Image
                  className={`${styles.optionsIcon}`}
                  src="/clipboard.png"
                  alt="add-plan-icon"
                  width={30}
                  height={30}
                />
                <div className={`${styles.optionsText}`}>Add Plan</div>
              </button>
            </Link>
            <Link href="toDoList">
              <button className={`${styles.button3}`}>
                <Image
                  className={`${styles.optionsIcon}`}
                  src="/checklist.png"
                  alt="add-plan-icon"
                  width={30}
                  height={30}
                />
                <div className={`${styles.optionsText}`}>To-Do</div>
              </button>
            </Link>
            <Link href="budget">
              <button className={`${styles.button1}`}>
                <Image
                  className={`${styles.optionsIcon}`}
                  src="/budget.png"
                  alt="add-plan-icon"
                  width={30}
                  height={30}
                />
                <div className={`${styles.optionsText}`}>Budget</div>
              </button>
            </Link>
            <Link href="guestListPage">
              <button className={`${styles.button2}`}>
                <Image
                  className={`${styles.optionsIcon}`}
                  src="/group.png"
                  alt="add-plan-icon"
                  width={30}
                  height={30}
                />
                <div className={`${styles.optionsText}`}>Guest List</div>
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FolderOptionsModal;
