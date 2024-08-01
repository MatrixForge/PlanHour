"use client"
// lib/axios.ts
import axios, { AxiosError } from 'axios';
import { Router } from 'next/router';

// Create an instance of axios with custom config
const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL, // baseURL from environment variables
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add token to headers
instance.interceptors.request.use(
  (config) => {
    const token =
      typeof window !== "undefined"
        ? localStorage.getItem("token")
          ? localStorage.getItem("token")
          : sessionStorage.getItem("token")
        : null;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor for handling responses
instance.interceptors.response.use(
  (response) => response,
  (error) => {
    // You can handle responses errors globally here
    if (error.response.status === 401) {
      // Handle unauthorized errors (e.g., redirect to login)

    }
    return Promise.reject(error);
  }
);

export default instance;
