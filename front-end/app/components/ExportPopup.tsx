"use client";
import React, { useEffect, useRef, useState } from "react";
import html2pdf from "html2pdf.js";
import styles from "@/styles/ExportPopup.module.css";
import styles_color from "@/styles/custom-colors.module.css";
import useAuthStore from "@/store/authStore";
import { useFolderStore } from "@/store/folderStore";
import axios from "@/lib/axios";

const ExportPopup = ({ onClose, budgetData, totalCost, selectedVenues }) => {
  const { user } = useAuthStore();
  const { folderId, subFolderId } = useFolderStore();
  const [folderOrSubFolder, setFolderOrSubFolder] = useState<any>({});
  const contentRef = useRef();
  useEffect(() => {
    fetchData();
  }, [folderId, subFolderId]);

  const fetchData = async () => {
    try {
      let response;
      if (folderId && !subFolderId) {
        response = await axios.get(`events/folders/${folderId}`);
      } else if (subFolderId) {
        response = await axios.get(`events/subfolders/${subFolderId}`);
      }
      if (response) {
        const data = await response.data;
        setFolderOrSubFolder(data);
      }
    } catch (error) {
      console.log("error", error);
    }
  };
  const handleDownload = () => {
    const element = contentRef.current;
    const options = {
      filename: "budget-preview.pdf",
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
    };

    html2pdf().from(element).set(options).save();
  };

  const handleOutsideClick = (e) => {
    if (e.target.className.includes(styles.popupOverlay)) {
      onClose();
    }
  };
  // Extract selected vendor details
  const selectedVendorDetails = Object.keys(selectedVenues)
    .map((vendorType) => {
      const selectedId = selectedVenues[vendorType];
      const vendorList = budgetData[vendorType] || [];
      return vendorList.find((vendor) => vendor.vendorId._id === selectedId);
    })
    .filter(Boolean); // Filter out any undefined values

  return (
    <div className={styles.popupOverlay} onClick={handleOutsideClick}>
      <div className={styles.popupContent} onClick={(e) => e.stopPropagation()}>
        <div className={styles.popupHeader}>
          <h2 className={styles.fontCustom}>Budget Preview</h2>
          <div>
            <button
              className={`btn btn-light mx-2 rounded-pill px-4 ${styles.fontCustom} ${styles_color.customBrown}`}
              onClick={handleDownload}
            >
              Download PDF
            </button>
            <button className={styles.closeButton} onClick={onClose}>
              &times;
            </button>
          </div>
        </div>
        <div className={styles.popupBody} ref={contentRef}>
          <h3 className={styles.fontMontserrat6}>{folderOrSubFolder.title}</h3>
          <h4 className={styles.fontMontserrat6}>Planned By {user.name}</h4>
          <hr className={styles.pageBreak} />
          <p>
            <b>Date of Event:</b>
            {"    " +
              new Date(folderOrSubFolder.date).toLocaleDateString("en-GB", {
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
              })}
          </p>
          <p>
            <b>Number of Guests:</b> {folderOrSubFolder.noOfGuests}
          </p>
          <p>
            <b>Description:</b> {folderOrSubFolder.description}
          </p>
          <hr className={styles.pageBreak} />
          {selectedVendorDetails.map((vendor) => (
            <div key={vendor.vendorId._id} className={styles.vendorSection}>
              <h3 className={styles.fontMontserrat6}>
                {vendor.vendorId.vendorType.charAt(0).toUpperCase() +
                  vendor.vendorId.vendorType.slice(1)}
              </h3>
              <ul>
                <li>
                  <div className={styles.fontMontserrat7}>
                    {vendor.vendorId.name}
                  </div>
                  <div className={styles.fontSharpSans}>
                    <b>Location:</b> {vendor.vendorId.location} <br />
                    {vendor.vendorId.email && (
                      <>
                        <b>Email:</b> {vendor.vendorId.email} <br />
                      </>
                    )}
                    {vendor.vendorId.contact && (
                      <>
                        <b>Contact:</b> {vendor.vendorId.contact} <br />
                      </>
                    )}
                    <b>Cost:</b> PKR {vendor.vendorId.min}
                  </div>
                </li>
              </ul>
              <hr className={styles.pageBreak} />
            </div>
          ))}
          <div className={styles.cost}>
            <h3 className={`${styles.fontMontserrat6}`}>
              Total Cost: PKR {totalCost}
            </h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExportPopup;
