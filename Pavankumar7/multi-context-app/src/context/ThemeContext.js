// src/context/ThemeContext.js

import React, { createContext, useState, useEffect, useCallback } from 'react';

// Create a context for the theme
export const ThemeContext = createContext();

/**
 * ThemeProvider wraps its children and provides theme state.
 * It persists the theme preference in localStorage, applies a CSS class to the document body,
 * and also sets inline styles for background and text color.
 */
const ThemeProvider = ({ children }) => {
  // Retrieve initial theme from localStorage (defaulting to 'light')
  const initialTheme = localStorage.getItem('theme') || 'light';
  const [theme, setTheme] = useState(initialTheme);

  useEffect(() => {
    // Persist the theme in localStorage
    localStorage.setItem('theme', theme);
    
    // Clear all theme-related classes from the body and add the current one
    document.body.classList.remove('light', 'dark');
    document.body.classList.add(theme);
    
    // Set inline styles to guarantee background & text colors update immediately
    if (theme === 'light') {
      document.body.style.backgroundColor = '#f9f9f9';
      document.body.style.color = '#000';
    } else {
      document.body.style.backgroundColor = '#333';
      document.body.style.color = '#fff';
    }
  }, [theme]);

  /**
   * toggleTheme switches the current theme between 'light' and 'dark'
   */
  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
