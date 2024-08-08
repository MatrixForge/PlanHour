"use client";
import Link from "next/link";
import React, { useEffect } from "react";
import styles from "@styles/folderOptions.module.css";
import Image from "next/image";
import { useFolderStore } from "../../../store/folderStore";
import axios from "@/lib/axios";

const FolderOptionsModal = ({ show, handleClose, folderID }) => {
  const { folderId, hasSubfolder, setHasSubfolder } = useFolderStore();

  useEffect(() => {
    console.log("maaa", folderID);

    console.log("wow11", hasSubfolder);

    if(folderID==undefined)
    {
        return;
    }

    const checkSubfolders = async () => {
      try {
        const response = await axios.get(`/events/check-subfolders/${folderId}`);
        const data = response.data;
  
        setHasSubfolder(data.hasSubfolders);
  
        console.log('killppp',data.hasSubfolders)
  
        console.log('sub folder2222222 is',hasSubfolder)
  
      } catch (error) {
        console.error("Error checking subfolders:", error);
      }
    };
  
    checkSubfolders();


  }, [folderID]);


  

  return (
    <div className={`${styles.popup} ${show ? styles.show : ""}`}>
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
            {/* Conditionally render the buttons based on subfolder existence */}
            {hasSubfolder ? (
              <Link href="/sub-event">
                <button className={`${styles.button1}`}>
                  <Image
                    className={`${styles.optionsIcon}`}
                    src="/folder_icon.png"
                    alt="add-plan-icon"
                    width={30}
                    height={30}
                  />
                  <div className={`${styles.optionsText}`}>Go to Sub Event</div>
                </button>
              </Link>
            ) : (
              <>
                <Link href="/sub-event">
                  <button className={`${styles.button1}`}>
                    <Image
                      className={`${styles.optionsIcon}`}
                      src="/folder_icon.png"
                      alt="add-plan-icon"
                      width={30}
                      height={30}
                    />
                    <div className={`${styles.optionsText}`}>
                      Go to Sub Event
                    </div>
                  </button>
                </Link>
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
                <Link href="to-do-list">
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
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FolderOptionsModal;
