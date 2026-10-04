import React, { createContext, useState, useEffect } from 'react';
import api from '../services/api';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [pharmacist, setPharmacist] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkLoggedIn = async () => {
      const token = localStorage.getItem('pharmacistToken');
      if (token) {
        try {
          const res = await api.get('/auth/me');
          setPharmacist(res.data);
        } catch (error) {
          console.error('Session expired or invalid token:', error);
          localStorage.removeItem('pharmacistToken');
          setPharmacist(null);
        }
      }
      setLoading(false);
    };

    checkLoggedIn();
  }, []);

  const login = async (email, password) => {
    const res = await api.post('/auth/login', { email, password });
    localStorage.setItem('pharmacistToken', res.data.token);
    setPharmacist(res.data);
    return res.data;
  };

  const register = async (pharmacistData) => {
    const res = await api.post('/auth/register', pharmacistData);
    localStorage.setItem('pharmacistToken', res.data.token);
    setPharmacist(res.data);
    return res.data;
  };

  const logout = () => {
    localStorage.removeItem('pharmacistToken');
    setPharmacist(null);
  };

  return (
    <AuthContext.Provider
      value={{
        pharmacist,
        loading,
        login,
        register,
        logout,
        isAuthenticated: !!pharmacist
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
