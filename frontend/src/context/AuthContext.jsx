import React, { createContext, useContext, useState, useEffect } from 'react';
import api from '../services/api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('campus_erp_user');
    return savedUser ? JSON.parse(savedUser) : {
      name: 'Debasish Pradhan',
      email: 'student@campus.edu',
      role: 'student',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=250&q=80',
      batch: 'B.Tech CSE | Final Year',
      department: 'Computer Science & Engineering',
    };
  });
  const [token, setToken] = useState(() => localStorage.getItem('campus_erp_token'));
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (token) {
      localStorage.setItem('campus_erp_token', token);
    } else {
      localStorage.removeItem('campus_erp_token');
    }
  }, [token]);

  const loginUser = async (email, password, selectedRole) => {
    setLoading(true);
    try {
      const response = await api.post('/auth/login', { email, password, role: selectedRole });
      if (response.data.success) {
        setUser(response.data.user);
        setToken(response.data.token);
        localStorage.setItem('campus_erp_user', JSON.stringify(response.data.user));
        return { success: true };
      }
    } catch (err) {
      console.warn('Backend unavailable, using demo credentials for immediate testing:', err.message);
      // Fallback demo logins
      let demoUser = {
        name: 'Debasish Pradhan',
        email: email || 'student@campus.edu',
        role: selectedRole || 'student',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=250&q=80',
        batch: 'B.Tech CSE | Final Year',
        department: 'Computer Science & Engineering',
      };

      if (selectedRole === 'faculty') {
        demoUser = {
          name: 'Prof. S. Das',
          email: email || 'faculty@campus.edu',
          role: 'faculty',
          avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=250&q=80',
          department: 'Computer Science & Engineering',
          designation: 'Associate Professor',
        };
      } else if (selectedRole === 'admin') {
        demoUser = {
          name: 'Chief Administrator',
          email: email || 'admin@campus.edu',
          role: 'admin',
          avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=250&q=80',
          department: 'Academic Office',
        };
      }

      setUser(demoUser);
      setToken('demo_token_xyz_123');
      localStorage.setItem('campus_erp_user', JSON.stringify(demoUser));
      return { success: true };
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('campus_erp_user');
    localStorage.removeItem('campus_erp_token');
  };

  return (
    <AuthContext.Provider value={{ user, token, role: user?.role, loginUser, logout, loading, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
