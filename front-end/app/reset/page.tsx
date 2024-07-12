"use client"
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { Form, Button, Container, Card } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const ResetPasswordPage: React.FC = () => {
    const router = useRouter();
    const [token, setToken] = useState<string | null>(null);
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');

    useEffect(() => {
        const urlToken = window.location.pathname.split('/reset/')[1];
        setToken(urlToken);
    }, []);

    const handleResetPassword = async () => {
        if (password !== confirmPassword) {
            setMessage('Passwords do not match');
            return;
        }

        try {
            const response = await axios.post('/api/users/reset-password', {
                token,
                newPassword: password,
            });
            setMessage(response.data.message);
            router.push('/login');
        } catch (error: any) {
            console.error('Reset password error:', error.response?.data?.message || error.message);
            setMessage(error.response?.data?.message || 'Failed to reset password');
        }
    };

    return (
        <Container className="d-flex justify-content-center align-items-center min-vh-100">
            <Card className="p-4 shadow" style={{ width: '100%', maxWidth: '400px' }}>
                <h2 className="mb-4 text-center">Reset Password</h2>
                <Form>
                    <Form.Group controlId="formPassword" className="mb-3">
                        <Form.Label>New Password</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="Enter new password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group controlId="formConfirmPassword" className="mb-3">
                        <Form.Label>Confirm New Password</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="Confirm new password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                    </Form.Group>
                    {message && <p className="text-danger">{message}</p>}
                    <Button variant="primary" className="w-100" onClick={handleResetPassword}>
                        Reset Password
                    </Button>
                </Form>
            </Card>
        </Container>
    );
};

export default ResetPasswordPage;
