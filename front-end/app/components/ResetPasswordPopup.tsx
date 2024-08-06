// components/ResetPasswordPopup.tsx

import React, { useState } from 'react';
import axios from '@/lib/axios';
import { Modal, Button, Form } from 'react-bootstrap';

interface ResetPasswordProps {
    show: boolean;
    handleClose: () => void;
}

const ResetPasswordPopup: React.FC<ResetPasswordProps> = ({ show, handleClose }) => {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');

    const handleResetPassword = async () => {
        try {
            const token = window.location.pathname.split('/reset/')[1];
            const response = await axios.post('/users/reset-password', {
                token,
                newPassword: password
            });
            setMessage(response.data.message);
        } catch (error:any) {
            console.error('Reset password error:', error.response?.data?.message || error.message);
            setMessage('Failed to reset password');
        }
    };

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Reset Password</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form.Group controlId="formPassword">
                    <Form.Control type="password" placeholder="Enter new password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </Form.Group>
                <Form.Group controlId="formConfirmPassword">
                    <Form.Control type="password" placeholder="Confirm new password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                </Form.Group>
                {message && <p>{message}</p>}
            </Modal.Body>
            <Modal.Footer>
               
                <Button variant="primary" onClick={handleResetPassword}>
                    Reset Password
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default ResetPasswordPopup;

