// components/ForgotPasswordPopup.tsx

import React, { useState } from 'react';
import axios from '@/lib/axios';
import { Modal, Button, Form } from 'react-bootstrap';

interface ForgotPasswordPopupProps {
    show: boolean;
    handleClose: () => void;
}

const ForgotPasswordPopup: React.FC<ForgotPasswordPopupProps> = ({ show, handleClose }) => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

    const handleForgotPassword = async () => {
        try {
            const response = await axios.post('/users/forgot-password', { email });
            setMessage(response.data.message);
        } catch (error: any) {
            const errorMessage = error.response?.data?.message || error.message;
            console.error('Forgot password error:', errorMessage);
            setMessage(errorMessage);
        }
    };

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Forgot Password</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form.Group controlId="formEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </Form.Group>
                {message && <p>{message}</p>}
            </Modal.Body>
            <Modal.Footer>
             
                <Button variant="primary" onClick={handleForgotPassword}>
                    Send Reset Link
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default ForgotPasswordPopup;
