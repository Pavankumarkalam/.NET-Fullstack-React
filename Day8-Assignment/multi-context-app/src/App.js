// src/App.js

import React from 'react';
import AuthProvider from './context/AuthContext';
import CartProvider from './context/CartContext';
import ThemeProvider from './context/ThemeContext';
import AppContent from './components/AppContent';

/**
 * App is the root component that integrates all contexts:
 * AuthProvider, CartProvider, and ThemeProvider.
 */
function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <ThemeProvider>
          <AppContent />
        </ThemeProvider>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
