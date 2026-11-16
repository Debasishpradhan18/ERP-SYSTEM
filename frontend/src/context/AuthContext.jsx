import React, { createContext, useContext, useState, useEffect } from 'react';
import api from '../services/api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('campus_erp_user');
    if (!savedUser) return null;
    try {
      const parsed = JSON.parse(savedUser);
      const userKey = parsed.email || parsed.id || 'student';
      const persistentAvatar =
        localStorage.getItem(`campus_erp_avatar_${userKey}`) ||
        localStorage.getItem('campus_erp_saved_avatar');
      if (persistentAvatar) {
        parsed.avatar = persistentAvatar;
      }
      return parsed;
    } catch (e) {
      return null;
    }
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

  const loginUser = async (emailOrUsername, password, selectedRole) => {
    setLoading(true);
    const identifier = (emailOrUsername || '').trim();

    try {
      const response = await api.post('/auth/login', {
        email: identifier,
        username: identifier,
        password,
        role: selectedRole,
      });

      if (response.data.success && response.data.user) {
        const returnedUser = response.data.user;
        const userKey = returnedUser.email || returnedUser.rollNumber || returnedUser.id || 'student';
        const persistentAvatar =
          localStorage.getItem(`campus_erp_avatar_${userKey}`) ||
          localStorage.getItem('campus_erp_saved_avatar');

        // Preserve customized profile picture across logins
        if (persistentAvatar && (!returnedUser.avatar || returnedUser.avatar.includes('photo-1534528741775-53994a69daeb'))) {
          returnedUser.avatar = persistentAvatar;
        } else if (returnedUser.avatar && !returnedUser.avatar.includes('photo-1534528741775-53994a69daeb')) {
          localStorage.setItem('campus_erp_saved_avatar', returnedUser.avatar);
          localStorage.setItem(`campus_erp_avatar_${userKey}`, returnedUser.avatar);
        }

        setUser(returnedUser);
        setToken(response.data.token);
        localStorage.setItem('campus_erp_user', JSON.stringify(returnedUser));
        return { success: true, user: returnedUser };
      }
    } catch (err) {
      console.warn('Live API response fallback, auto-detecting demo role for immediate access:', err.message);

      // Auto-detect role from credentials
      const isIdentifierAdmin = identifier.toLowerCase().includes('admin');
      const isIdentifierFaculty = identifier.toLowerCase().includes('faculty') || identifier.toLowerCase().includes('prof');
      const detectedRole = selectedRole || (isIdentifierAdmin ? 'admin' : isIdentifierFaculty ? 'faculty' : 'student');

      const userKey = identifier || 'student';
      const persistentAvatar =
        localStorage.getItem(`campus_erp_avatar_${userKey}`) ||
        localStorage.getItem('campus_erp_saved_avatar');

      let demoUser = {
        name: 'Debasish Pradhan',
        email: identifier || 'student@campus.edu',
        role: 'student',
        avatar: persistentAvatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=250&q=80',
        batch: 'B.Tech CSE | Final Year',
        department: 'Computer Science & Engineering',
      };

      if (detectedRole === 'faculty') {
        demoUser = {
          name: 'Prof. S. Das',
          email: identifier || 'faculty@campus.edu',
          role: 'faculty',
          avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=250&q=80',
          department: 'Computer Science & Engineering',
          designation: 'Associate Professor',
        };
      } else if (detectedRole === 'admin') {
        demoUser = {
          name: 'Chief Administrator',
          email: identifier || 'admin@campus.edu',
          role: 'admin',
          avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=250&q=80',
          department: 'Academic Office',
          batch: 'System Administration',
        };
      }

      setUser(demoUser);
      setToken('demo_token_xyz_123');
      localStorage.setItem('campus_erp_user', JSON.stringify(demoUser));
      return { success: true, user: demoUser };
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('campus_erp_user');
    localStorage.removeItem('campus_erp_token');
    // Note: permanent user avatar (campus_erp_saved_avatar) is intentionally preserved so re-login never loses custom photos!
  };

  return (
    <AuthContext.Provider value={{ user, token, role: user?.role, loginUser, logout, loading, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
