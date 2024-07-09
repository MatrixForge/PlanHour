'use client';
import React, { useState, FormEvent } from 'react';
import axios from 'axios';
import useAuthStore, { AuthState } from '../../store/useAuthStore'; // Adjust the import as per your Zustand store setup

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const setToken = useAuthStore((state: AuthState) => state.setToken); // Define AuthState type for state

  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await axios.post<{ token: string }>('/api/auth/login', { email, password });
      setToken(res.data.token);
    } catch (err: any) {
      console.error(err.response?.data || 'Login failed');
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <div>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
        />
      </div>
      <div>
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
        />
      </div>
      <button type="submit">Login</button>
    </form>
  );
};

export default Login;
