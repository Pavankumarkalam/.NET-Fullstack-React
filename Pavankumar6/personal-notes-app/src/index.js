import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { NotesProvider } from './context/NotesContext'; // Provides notes state via Context API
import * as serviceWorkerRegistration from './pwa/serviceWorker'; // For PWA offline support
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS

// Create the root element for the React app
const root = ReactDOM.createRoot(document.getElementById('root'));

// Render the React application wrapped within the context provider for state management
root.render(
  <NotesProvider>
    <App />
  </NotesProvider>
);

// Register the service worker to enable offline support for the PWA
serviceWorkerRegistration.register();
