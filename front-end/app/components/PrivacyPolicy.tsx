import React from "react";
import styles from "../../styles/TermsOfServicePrivacyPolicy.module.css";

const PrivacyPolicy = ({ onClose }) => {
  return (
    <>
      <h2 className="d-flex align-items-center justify-content-center">
        Privacy Policy
      </h2>
      <div className={styles.popupContent}>
        <div className={`${styles.popupparagraphs}`}>
          Plan Hour ("we," "our," "us") is committed to protecting your privacy.
          This Privacy Policy explains how we collect, use, disclose, and
          safeguard your information when you use our web application
          ("Service").
        </div>
        <div className={`${styles.popupparagraphs}`}>
          <div className={`${styles.popupparagraphheaders}`}>
            1. Information We Collect
          </div>
          <div>
            We may collect personal information that you voluntarily provide to
            us when you create an account, use our Service, or contact us. This
            information may include your name, email address, event details, and
            payment information.
          </div>
        </div>
        <div className={`${styles.popupparagraphs}`}>
          <div className={`${styles.popupparagraphheaders}`}>
            2. How We Use Your Information
          </div>
          <div>
            We use the information we collect to provide, operate, and maintain
            our Service, to improve, personalize, and expand our Service, and to
            understand and analyze how you use our Service.
          </div>
        </div>
        <div className={`${styles.popupparagraphs}`}>
          <div className={`${styles.popupparagraphheaders}`}>
            3. Sharing Your Information
          </div>
          <div>
            We may share your information with third parties to provide and
            improve our Service, comply with legal obligations, and protect and
            defend our rights.
          </div>
        </div>
        <div className={`${styles.popupparagraphs}`}>
          <div className={`${styles.popupparagraphheaders}`}>
            4. Data Security
          </div>
          <div>
            We implement security measures to protect your information from
            unauthorized access and use. However, no internet transmission is
            completely secure, and we cannot guarantee its absolute security.
          </div>
        </div>
        <div className={`${styles.popupparagraphs}`}>
          <div className={`${styles.popupparagraphheaders}`}>
            5. Your Privacy Rights
          </div>
          <div>
            Depending on your location, you may have certain rights regarding
            your personal information, such as accessing, correcting, or
            deleting your data. Please contact us to exercise these rights.
          </div>
        </div>
        <div className={`${styles.popupparagraphs}`}>
          <div className={`${styles.popupparagraphheaders}`}>
            6. Changes to This Privacy Policy
          </div>
          <div>
            We may update this Privacy Policy from time to time. We will notify
            users of any changes by posting the new Privacy Policy on the
            Service. Your continued use of the Service after any such changes
            constitutes your acceptance of the new Privacy Policy.
          </div>
        </div>
      </div>
    </>
  );
};

export default PrivacyPolicy;
