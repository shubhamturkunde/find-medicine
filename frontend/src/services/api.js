import axios from 'axios';

// Automatically detect local development (http://localhost:5000/api via Vite proxy) vs production Vercel deployment
const API_BASE_URL = import.meta.env.VITE_API_URL || 
  (import.meta.env.DEV ? '/api' : 'https://find-medicine-mjp8.vercel.app/api');

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor to add JWT token from localStorage if present
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('pharmacistToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

export default api;
