// src/index.js

import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/global.css';  // Import global styles
import App from './App';         // Import the main App component

// Create the root element using ReactDOM.createRoot (React 18+)
const root = ReactDOM.createRoot(document.getElementById('root'));

// Render the App component inside React.StrictMode for highlighting potential problems
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

