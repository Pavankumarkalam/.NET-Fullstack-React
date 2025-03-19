// src/context/AuthContext.js

import React, { createContext, useState, useEffect, useCallback } from 'react';

// Create a context for authentication
export const AuthContext = createContext();

/**
 * AuthProvider wraps its children and provides authentication state.
 * It persists user sessions using localStorage.
 */
const AuthProvider = ({ children }) => {
  // Get stored user from localStorage, if any
  const storedUser = localStorage.getItem('user');
  const initialAuthState = storedUser
    ? { isAuthenticated: true, user: storedUser }
    : { isAuthenticated: false, user: null };

  const [authState, setAuthState] = useState(initialAuthState);

  // Update localStorage when authState changes
  useEffect(() => {
    if (authState.isAuthenticated) {
      localStorage.setItem('user', authState.user);
    } else {
      localStorage.removeItem('user');
    }
  }, [authState]);

  // Login updates auth state and persists the user
  const login = useCallback((username) => {
    setAuthState({ isAuthenticated: true, user: username });
  }, []);

  // Logout clears auth state and removes user from storage
  const logout = useCallback(() => {
    setAuthState({ isAuthenticated: false, user: null });
  }, []);

  return (
    <AuthContext.Provider value={{ authState, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
