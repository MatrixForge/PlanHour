"use client";
import React, { useState } from 'react';
import '../../styles/signin.css'; 
import 'bootstrap-icons/font/bootstrap-icons.css'; 
import Link from 'next/link';

const Signup = () => {
    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div className='outerdiv'>
            <div className='flexContainer'>
                <div className='leftBox'>
                    <h1>Log in</h1>
                    <div className="form-group">
                        <input type="email" className="form-control" id="email" aria-describedby="emailHelp" placeholder="Email" />
                    </div>
                    <div className="form-group">
                        <div className="icon-container">
                            <input 
                                type={showPassword ? "text" : "password"} 
                                className="form-control" 
                                id="password" 
                                placeholder="Password" 
                            />
                            <i 
                                className={`bi ${showPassword ? 'bi-eye-fill' : 'bi-eye-slash'} custom-icon`} 
                                onClick={togglePasswordVisibility}
                            ></i>
                        </div>
                    </div>
                    <div className="form-options">
                        <div className="form-check">
                            <input type="checkbox" className="form-check-input" id="rememberMe" />
                            <label className="form-check-label" htmlFor="rememberMe">Remember Me</label>
                        </div>
                        <Link href="/forgot-password" className="forgot-password">Forgot Password?</Link>
                    </div>
                    <button type="submit" className="btn btn-primary rounded-pill">Login</button>
                    <p className="signin-link">Don't have an account? <Link href="/signup">Sign Up</Link></p>
                </div>
                <div className='rightBox'>
                    <img src='/cover.png' alt="Cover" />
                </div>
            </div>
        </div>
    );
};

export default Signup;
