import React, { useRef } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import styles from "@/styles/ExportPopup.module.css";
import styles_color from "@/styles/custom-colors.module.css";

interface Vendor {
  _id: string;
  name: string;
  location: string;
  email: string;
  contact: string;
  min: number;
}

interface ExportPopupProps {
  onClose: () => void;
  budgetData: {
    venue: Vendor[];
    restaurants: Vendor[];
    caterer: Vendor[];
    photographer: Vendor[];
    decor: Vendor[];
  };
  totalCost: number;
}

const ExportPopup: React.FC<ExportPopupProps> = ({
  onClose,
  budgetData,
  totalCost,
}) => {
  const contentRef = useRef<HTMLDivElement>(null);

  const downloadPDF = async () => {
    const element = contentRef.current;
    if (element) {
      const pdf = new jsPDF("p", "mm", "a4");
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      const margins = 0; // Adjust margins as needed
      const pageHeight = pdfHeight - 2 * margins;

      const canvas = await html2canvas(element, { scale: 2 });
      const imgData = canvas.toDataURL("image/png");
      const imgProps = pdf.getImageProperties(imgData);
      const imgHeight = (imgProps.height * pdfWidth) / imgProps.width;

      let position = 0;
      let remainingHeight = imgHeight;

      while (remainingHeight > 0) {
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

        if (remainingHeight > 0) {
          pdf.addPage();
        }
      }

      pdf.save("budget.pdf");
    }
  };

  const handleOutsideClick = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).className.includes(styles.popupOverlay)) {
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
            >
              Download PDF
            </button>
            <button className={styles.closeButton} onClick={onClose}>
              &times;
            </button>
          </div>
        </div>
        <div className={styles.popupBody} ref={contentRef}>
          <h4 className={styles.fontMontserrat6}>Selected Venues</h4>
          {Object.entries(budgetData).map(
            ([key, vendors]) =>
              vendors.length > 0 && (
                <div key={key} className={styles.vendorSection}>
                  <h4 className={styles.fontMontserrat6}>
                    {key.charAt(0).toUpperCase() + key.slice(1)}
                  </h4>
                  <ul>
                    {vendors.map((vendor) => (
                      <li key={vendor._id}>
                        <div className={styles.fontMontserrat7}>
                          {vendor.name}
                        </div>
                        <div className={styles.fontSharpSans}>
                          <b>Location:</b> {vendor.location} <br />
                          {vendor.email && (
                            <>
                              <b>Email:</b> {vendor.email} <br />
                            </>
                          )}
                          <b>Number:</b> {vendor.contact} <br />
                          <b>Cost:</b> PKR {vendor.min}
                        </div>
                      </li>
                    ))}
                  </ul>
                  <hr className={styles.pageBreak} />
                </div>
              )
          )}
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
