"use client";

import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";
import axios from "@/lib/axios";
import { Modal, Button, Form } from "react-bootstrap";
import styles from "@styles/googleCalendarEventForm.module.css";
import Link from "next/link";

const ResetPassword: React.FC = () => {
  const [token, setToken] = useState<string | null>(null);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isClient, setIsClient] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const tokenFromUrl = params.get("token");
      setToken(tokenFromUrl);
      setIsClient(true);
    }
  });

  const handleResetPassword = async () => {
    if (password !== confirmPassword) {
      setMessage("Passwords do not match");
      return;
    }

    try {
      const response = await axios.post(`users/reset-password`, {
        token,
        newPassword: password,
      });
      setMessage(response.data.message);
         // Redirect to home after successful reset
         if (response.data.success) {
          router.push(`${process.env.NEXT_PUBLIC_API_HOME_URL}`);
        }

    } catch (error: any) {
      console.error(
        "Reset password error:",
        error.response?.data?.message || error.message
      );
      setMessage("Failed to reset password");
    }
  };

  // Render only when on client side
  if (!isClient) return null;

  return (
    <div className={`${styles.popup} ${styles.show}`}>
      <div
        className={styles.coverImage}
        style={{ backgroundImage: `url('/cover.png')` }}
      >
        <div
          className={`${styles.optionsBackground} ${styles.optionsBackground1}`}
        >
          <h2 className={`${styles.optionsHeader}`}>Reset Password</h2>
          <div className={styles.options}>
            <div className={`mb-3 ${styles.formGroup}`}>
              <label htmlFor="title" className={`${styles.formLabel}`}>
                Enter New Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={`${styles.formControl}`}
                id="title"
                required
              />
            </div>
            <div className={`mb-3 ${styles.formGroup}`}>
              <label htmlFor="title" className={`${styles.formLabel}`}>
                Confirm Password
              </label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className={`${styles.formControl}`}
                id="title"
                required
              />
            </div>
            <div className={`${styles.formActions}`}>
              <Button
                variant="primary"
                className={`${styles.cancelButton}`}
                onClick={handleResetPassword}
              >
                Reset Password
              </Button>
              <Link href="/" passHref>
                <Button
                  variant="secondary"
                  className={`${styles.saveButton}`}
                  as="a"
                >
                  Home
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
    // <Modal show={true} onHide={() => {}}>
    //   <Modal.Header>
    //     <Modal.Title>Reset Password</Modal.Title>
    //   </Modal.Header>
    //   <Modal.Body>
    //     <Form.Group controlId="formPassword">
    //       <Form.Control
    //         type="password"
    //         placeholder="Enter new password"
    //         value={password}
    //         onChange={(e) => setPassword(e.target.value)}
    //       />
    //     </Form.Group>
    //     <Form.Group controlId="formConfirmPassword">
    //       <Form.Control
    //         type="password"
    //         placeholder="Confirm new password"
    //         value={confirmPassword}
    //         onChange={(e) => setConfirmPassword(e.target.value)}
    //       />
    //     </Form.Group>
    //     {message && <p>{message}</p>}
    //   </Modal.Body>
    //   <Modal.Footer>
    //     <Button variant="primary" onClick={handleResetPassword}>
    //       Reset Password
    //     </Button>
    //     <Link href="/" passHref>
    //       <Button variant="secondary" as="a">
    //         Home
    //       </Button>
    //     </Link>
    //   </Modal.Footer>
    // </Modal>
  );
};

export default ResetPassword;
