// src/components/AppContent.js

import React, { useContext } from 'react';
import Login from './Login';
import ThemeToggle from './ThemeToggle';
import CartDisplay from './CartDisplay';
import { AuthContext } from '../context/AuthContext';

/**
 * AppContent renders the main view of the app. It conditionally shows:
 * - Login form when user is not authenticated.
 * - Cart display (with add/remove operations) when logged in.
 * - Theme toggle and a welcome message with logout button.
 */
const AppContent = () => {
  const { authState, logout } = useContext(AuthContext);

  return (
    <div className="app-container">
      <header>
        <h1>Multi-Context App</h1>
        <ThemeToggle />
        {authState.isAuthenticated ? (
          <div>
            <span>Welcome, {authState.user}</span>
            <button onClick={logout}>Logout</button>
          </div>
        ) : (
          <p>Please login to manage your cart.</p>
        )}
      </header>
      <main>
        {authState.isAuthenticated ? <CartDisplay /> : <Login />}
      </main>
    </div>
  );
};

// Using React.memo to reduce unnecessary re-renders
export default React.memo(AppContent);
