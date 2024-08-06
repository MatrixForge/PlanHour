import React, { useRef } from "react";
import html2pdf from "html2pdf.js";
import styles from "@/styles/ExportPopup.module.css";
import styles_color from "../../styles/custom-colors.module.css";

const ExportPopup = ({ onClose, budgetData, totalCost }) => {
  // Overwriting budgetData and totalCost with dummy data
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
          <h3 className={styles.fontMontserrat6}>Ali Birthday</h3>
          <h4 className={styles.fontMontserrat6}>By Fiza</h4>
          <hr className={styles.pageBreak} />
          <p>
            <b>Date of Event:</b> 2024-12-31
          </p>
          <p>
            <b>Number of Guests:</b> 100
          </p>
          <p>
            <b>Description:</b> Lorem ipsum dolor sit amet consectetur
            adipisicing elit. A, commodi dicta eligendi placeat rerum fugiat
            veritatis quaerat eum non incidunt eaque molestias praesentium
            maxime quod?
          </p>
          <hr className={styles.pageBreak} />
          {Object.keys(budgetData).map((key) => (
            <div key={key} className={styles.vendorSection}>
              <h3 className={styles.fontMontserrat6}>
                {key.charAt(0).toUpperCase() + key.slice(1)}
              </h3>
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
