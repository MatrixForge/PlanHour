'use client';

import { useRouter } from 'next/router';
import React, { useState, useEffect } from 'react';
import axios from '@/lib/axios';
import { Modal, Button, Form } from 'react-bootstrap';
import Link from 'next/link';

const ResetPassword: React.FC = () => {
    const [token, setToken] = useState<string | null>(null);
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const tokenFromUrl = params.get('token');
        setToken(tokenFromUrl);
    }, []);

    const handleResetPassword = async () => {
        if (password !== confirmPassword) {
            setMessage('Passwords do not match');
            return;
        }

    try {
      const response = await axios.post(`users/reset-password`, {
        token,
        newPassword: password,
      });
      setMessage(response.data.message);
    } catch (error: any) {
      console.error(
        "Reset password error:",
        error.response?.data?.message || error.message
      );
      setMessage("Failed to reset password");
    }
  };

  return (
<Modal show={true} onHide={() => {}}>
<Modal.Header closeButton>
        <Modal.Title>Reset Password</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form.Group controlId="formPassword">
          <Form.Control
            type="password"
            placeholder="Enter new password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="formConfirmPassword">
          <Form.Control
            type="password"
            placeholder="Confirm new password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </Form.Group>
        {message && <p>{message}</p>}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={handleResetPassword}>
          Reset Password
        </Button>
        <Link href="/" passHref>
          <Button variant="secondary" as="a">
            Home
          </Button>
        </Link>
      </Modal.Footer>
    </Modal>
  );
};

export default ResetPassword;
