import React from 'react';
import styles from '../../styles/TermsOfServicePrivacyPolicy.module.css';

const TermsOfService = ({ onClose }) => {
  return (
    <>
      <h2 className='d-flex align-items-center justify-content-center'>Terms of Service</h2>
      <div className={styles.popupContent}>
        <div className={`${styles.popupparagraphs}`}>
          Welcome to Plan Hour! These terms of service ("Terms") apply to your access and use of our web application ("Service"). Please read them carefully.
        </div>
        <div className={`${styles.popupparagraphs}`}>
          <div className={`${styles.popupparagraphheaders}`}>1. Acceptance of Terms</div>
          <div>Plan Hour is a web application designed to help users plan and manage events such as birthdays, weddings, and corporate gatherings. The Service includes features like event templates, venue recommendations, check-lists, timelines, guest list management, digital invitations, vendor databases, and budgeting tools.</div>
        </div>
        <div className={`${styles.popupparagraphs}`}>
          <div className={`${styles.popupparagraphheaders}`}>2. Description of Service</div>
          <div>By accessing or using Plan Hour, you agree to be bound by these Terms. If you do not agree to these Terms, do not use our Service.</div>
        </div>
        <div className={`${styles.popupparagraphs}`}>
          <div className={`${styles.popupparagraphheaders}`}>3. User Responsibilities</div>
          <div>Users are responsible for providing accurate information, maintaining the confidentiality of their account, and for all activities that occur under their account.</div>
        </div>
        <div className={`${styles.popupparagraphs}`}>
          <div className={`${styles.popupparagraphheaders}`}>4. Prohibited Activities</div>
          <div>Users are prohibited from using the Service for any illegal activities, transmitting harmful content, or violating the rights of others.</div>
        </div>
        <div className={`${styles.popupparagraphs}`}>
          <div className={`${styles.popupparagraphheaders}`}>5. Termination</div>
          <div>We may terminate or suspend your access to the Service without notice if you violate these Terms or engage in conduct that we deem harmful.</div>
        </div>
        <div className={`${styles.popupparagraphs}`}>
          <div className={`${styles.popupparagraphheaders}`}>6. Limitation of Liability</div>
          <div>Plan Hour will not be liable for any indirect, incidental, or consequential damages arising from the use of the Service.</div>
        </div>
        <div className={`${styles.popupparagraphs}`}>
          <div className={`${styles.popupparagraphheaders}`}>7. Changes to Terms</div>
          <div>We reserve the right to modify these Terms at any time. We will notify users of any changes by posting the new Terms on the Service. Your continued use of the Service after any such changes constitutes your acceptance of the new Terms.</div>
        </div>
      </div>
    </>
  );
};

export default TermsOfService;
