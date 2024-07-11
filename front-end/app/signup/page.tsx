"use client";
import React, { useState } from 'react';
import axios from 'axios';
import '../../styles/signup.css'; 
import 'bootstrap-icons/font/bootstrap-icons.css'; 
import Link from 'next/link';

const Signup = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        try {
            setLoading(true);
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                },
            };

            const { data } = await axios.post(
                '/api/users',
                { name, email, password },
                config
            );

            setMessage('Registration successful!');
            setError('');
            setLoading(false);

            // You can also save the user info to local storage or state here if needed
            // localStorage.setItem('userInfo', JSON.stringify(data));

        } catch (error: any) {
            setError(error.response && error.response.data.message 
                ? error.response.data.message 
                : error.message);
            setLoading(false);
        }
    };

    return (
        <div className='outerdiv'>
            <div className='flexContainer'>
                <div className='leftBox'>
                    <h1>Sign up</h1>
                    {error && <div className="alert alert-danger">{error}</div>}
                    {message && <div className="alert alert-success">{message}</div>}
                    {loading && <div>Loading...</div>}
                    <form onSubmit={submitHandler}>
                        <div className="form-group">
                            <input 
                                type="text" 
                                className="form-control" 
                                id="name" 
                                placeholder="Name" 
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>
                        <div className="form-group">
                            <input 
                                type="email" 
                                className="form-control" 
                                id="email" 
                                placeholder="Email" 
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div className="form-group">
                            <div className="icon-container">
                                <input 
                                    type={showPassword ? "text" : "password"} 
                                    className="form-control" 
                                    id="password" 
                                    placeholder="Password" 
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                                <i 
                                    className={`bi ${showPassword ? 'bi-eye-fill' : 'bi-eye-slash'} custom-icon`} 
                                    onClick={togglePasswordVisibility}
                                ></i>
                            </div>
                        </div>
                        <div className="form-group">
                            <input 
                                type="password" 
                                className="form-control" 
                                id="confirmPassword" 
                                placeholder="Confirm Password" 
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                            />
                        </div>
                        <button type="submit" className="btn btn-primary rounded-pill">Sign Up</button>
                        <p className="signin-link">Already have an account? <Link href="/login">Sign in</Link></p>
                    </form>
                </div>
                <div className='rightBox'>
                    <img src='/cover.png' alt="Cover" />
                </div>
            </div>
        </div>
    );
};

export default Signup;
