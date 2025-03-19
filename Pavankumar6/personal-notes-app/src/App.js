import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Notes from './pages/Notes';

// Main App component that sets up routing and displays the Navbar
function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        {/* Route for Home page */}
        <Route path="/" element={<Home />} />
        {/* Route for Notes page */}
        <Route path="/notes" element={<Notes />} />
      </Routes>
    </Router>
  );
}

export default App;
