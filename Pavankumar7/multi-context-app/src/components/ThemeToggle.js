// src/components/ThemeToggle.js

import React, { useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext';

/**
 * ThemeToggle component displays the current theme and a button to toggle it.
 */
const ThemeToggle = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <div style={{ marginBottom: '10px' }}>
      <span>Theme: {theme}</span>
      <button onClick={toggleTheme} style={{ marginLeft: '10px' }}>
        Toggle Theme
      </button>
    </div>
  );
};

export default React.memo(ThemeToggle);
