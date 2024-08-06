"use client"
import React, { useRef } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import styles from "@/styles/ExportPopup.module.css";
import styles_color from "@/styles/custom-colors.module.css";

const ExportPopup = ({ onClose, budgetData, totalCost }) => {
  // Dummy data for testing
  budgetData = {
    venue: [
      {
        _id: "1",
        name: "Venue A",
        location: "Location A",
        email: "venueA@example.com",
        number: "1234567890",
        min: 1000,
      },
    ],
    restaurants: [
      {
        _id: "2",
        name: "Restaurant A",
        location: "Location A",
        email: "restaurantA@example.com",
        number: "1234567890",
        min: 1500,
      },
    ],
    caterer: [
      {
        _id: "3",
        name: "Caterer A",
        location: "Location A",
        email: "catererA@example.com",
        number: "1234567890",
        min: 1200,
      },
    ],
    photographer: [
      {
        _id: "4",
        name: "Photographer A",
        location: "Location A",
        email: "photographerA@example.com",
        number: "1234567890",
        min: 1800,
      },
    ],
    decor: [
      {
        _id: "5",
        name: "Decor A",
        location: "Location A",
        email: "decorA@example.com",
        number: "1234567890",
        min: 1100,
      },
    ],
  };
  totalCost = 18300; // Dummy total cost

  const contentRef = useRef();

  const downloadPDF = async () => {
    const element = contentRef.current;
    if (element) {
      const pdf = new jsPDF("p", "mm", "a4");
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      const margins = 0; // Adjust margins as needed
      const pageHeight = pdfHeight - 2 * margins;

      // Use html2canvas to create a canvas from the content
      const canvas = await html2canvas(element, { scale: 2 });
      const imgData = canvas.toDataURL("image/png");
      const imgProps = pdf.getImageProperties(imgData);
      const imgHeight = (imgProps.height * pdfWidth) / imgProps.width;

      // Split the content into pages
      let position = 0;
      let remainingHeight = imgHeight;

      while (remainingHeight > 0) {
        // Adjust height if it's the last page
        let height = Math.min(pageHeight, remainingHeight);

        pdf.addImage(
          imgData,
          "PNG",
          margins,
          -position + margins,
          pdfWidth - 2 * margins,
          height
        );

        remainingHeight -= height;
        position += height;
      }

      pdf.save("budget.pdf");
    }
  };

  const handleOutsideClick = (e) => {
    if (e.target.className.includes(styles.popupOverlay)) {
      onClose();
    }
  };

  return (
    <div className={styles.popupOverlay} onClick={handleOutsideClick}>
      <div className={styles.popupContent} onClick={(e) => e.stopPropagation()}>
        <div className={styles.popupHeader}>
          <h2 className={styles.fontCustom}>Budget Preview</h2>
          <div>
            <button
              onClick={downloadPDF}
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
          <h4 className={styles.fontMontserrat6}>Ali Birthday</h4>
          <h5 className={styles.fontMontserrat6}>By Fiza</h5>
          <hr className={styles.pageBreak} />
          <p>
            <b>Date of Event:</b> 2024-12-31
          </p>
          <p>
            <b>Number of Guests:</b> 100
          </p>
          <p>
            <b>Description:</b> Lorem
          </p>
          <hr className={styles.pageBreak} />
          {Object.keys(budgetData).map((key) => (
            <div key={key} className={styles.vendorSection}>
              <h4 className={styles.fontMontserrat6}>
                {key.charAt(0).toUpperCase() + key.slice(1)}
              </h4>
              <ul>
                {budgetData[key].map((vendor) => (
                  <li key={vendor._id}>
                    <div className={styles.fontMontserrat7}>{vendor.name}</div>
                    <div className={styles.fontSharpSans}>
                      <b>Location:</b> {vendor.location} <br />
                      <b>Email:</b> {vendor.email} <br />
                      <b>Number:</b> {vendor.number} <br />
                      <b>Cost:</b> PKR {vendor.min}
                    </div>
                  </li>
                ))}
              </ul>
              <hr className={styles.pageBreak} />
            </div>
          ))}
          <div className={styles.cost}>
            <h4 className={styles.fontMontserrat6}>
              Total Cost: PKR {totalCost}
            </h4>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExportPopup;
