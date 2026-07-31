import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const getInitialUser = () => {
    const saved = localStorage.getItem('km_user_profile');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        // Fall back to null
      }
    }
    return null;
  };

  const [user, setUserState] = useState(getInitialUser);

  const setUser = (updater) => {
    setUserState(prev => {
      const next = typeof updater === 'function' ? updater(prev) : updater;
      if (next) {
        localStorage.setItem('km_user_profile', JSON.stringify(next));
      } else {
        localStorage.removeItem('km_user_profile');
      }
      return next;
    });
  };

  const [token, setToken] = useState(localStorage.getItem('km_token') || null);
  const [isSplashActive, setIsSplashActive] = useState(false);

  const login = (userData, jwtToken) => {
    setUser(userData);
    if (jwtToken) {
      setToken(jwtToken);
      localStorage.setItem('km_token', jwtToken);
    }
    setIsSplashActive(true);
  };

  const finishLoginSplash = () => {
    setIsSplashActive(false);
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    setIsSplashActive(false);
    localStorage.removeItem('km_token');
    localStorage.removeItem('km_user_profile');
  };

  const switchRole = (newRole) => {
    setUser(prev => ({
      ...prev,
      role: newRole,
      name: newRole === 'farmer' ? 'Ramesh Patel' : newRole === 'expert' ? 'Dr. Anita Sharma' : 'Admin Officer',
      email: `${newRole}@krishimitra.ai`
    }));
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout, switchRole, setUser, isSplashActive, finishLoginSplash }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
