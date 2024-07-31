import React from "react";
import styles from "@styles/footer.module.css";
import Image from "next/image";

const Footer = () => {
  return (
    <div
      className={`d-flex justify-content-center align-items-center ${styles.footerBackground}`}
    >
      <div className="d-flex flex-column align-items-center">
        <div className="mb-3 text-center">
          <div className={styles.text1}>
            Simplify your scheduling, maximize your time.
          </div>
          <div className={styles.text2}>Request More Information</div>
          <div className={styles.text3}>
            Plan Hour: The perfect solution for streamlined scheduling and
            effective time management
          </div>
          <div className="d-flex align-items-center justify-content-center">
            <button
              className={`shadow-lg d-flex align-items-center justify-content-center ${styles.button1}`}
            >
              Contact Us
            </button>
          </div>
        </div>
        <div
          className={`d-flex align-items-center justify-content-between ${styles.bottom} py-3`}
        >
          <div className="d-flex align-items-center">
            <div className="d-flex bottomtext1 me-5">
              <div className="mx-2">Terms of Service</div>
              <div className="mx-2">Privacy Policy</div>
            </div>
          </div>
          <div className="ms-5 me-5">
            © Plan Hour 2024. ALL RIGHTS RESERVED.
          </div>
          <div className="bottomtext3 d-flex justify-content-center align-items-center ms-5">
            <div className="mx-2">
              <Image
                src="/linkedin.png"
                width={50}
                height={50}
                alt={"Linkedin"}
              />
            </div>
            <div className="mx-2">
              <Image
                src="/Facebook.png"
                width={50}
                height={50}
                alt={"Facebook"}
              />
            </div>
            <div className="mx-2">
              <Image
                src="/instagram.png"
                width={50}
                height={50}
                alt={"Instagram"}
              />
            </div>
            <div className="mx-2">
              <Image
                src="/Youtube.png"
                width={50}
                height={50}
                alt={"Youtube"}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
