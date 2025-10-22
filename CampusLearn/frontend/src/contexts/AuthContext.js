import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
    return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const API_BASE = 'http://localhost:5000/api';

    // Enhanced fetch function with better error handling
    const apiRequest = async (endpoint, options = {}) => {
        const token = localStorage.getItem('token');

        const config = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                ...(token && { 'Authorization': `Bearer ${token}` }),
                ...options.headers,
            },
            ...options
        };

        // Remove headers from options if they're already in config
        delete config.headers.headers;

        try {
            const response = await fetch(`${API_BASE}${endpoint}`, config);

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({
                    message: `HTTP error! status: ${response.status}`
                }));
                throw new Error(errorData.message || `Request failed with status ${response.status}`);
            }

            return await response.json();
        } catch (error) {
            console.error('API Request failed:', error);
            throw error;
        }
    };

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            verifyToken(token);
        } else {
            setLoading(false);
        }
    }, []);

    const verifyToken = async (token) => {
        try {
            const data = await apiRequest('/auth/verify');
            setCurrentUser(data.user);
        } catch (error) {
            console.error('Token verification failed:', error);
            localStorage.removeItem('token');
            setCurrentUser(null);
        } finally {
            setLoading(false);
        }
    };

    const login = async (email, password) => {
        try {
            const data = await apiRequest('/auth/login', {
                method: 'POST',
                body: JSON.stringify({ email, password })
            });

            if (data.token) {
                localStorage.setItem('token', data.token);
                setCurrentUser(data.user);
                return data.user;
            } else {
                throw new Error('No token received');
            }
        } catch (error) {
            console.error('Login failed:', error);
            throw error;
        }
    };

    const register = async (userData) => {
        try {
            const data = await apiRequest('/auth/register', {
                method: 'POST',
                body: JSON.stringify(userData)
            });

            if (data.token) {
                localStorage.setItem('token', data.token);
                setCurrentUser(data.user);
                return data.user;
            } else {
                throw new Error('No token received');
            }
        } catch (error) {
            console.error('Registration failed:', error);
            throw error;
        }
    };

    const logout = () => {
        localStorage.removeItem('token');
        setCurrentUser(null);
    };

    const value = {
        currentUser,
        login,
        register,
        logout,
        apiRequest
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
};