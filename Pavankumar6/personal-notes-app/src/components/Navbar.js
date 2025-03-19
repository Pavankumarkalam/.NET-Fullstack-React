import React from 'react';
import { Link } from 'react-router-dom';

// Simple Navbar component for navigation between pages
const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        {/* App brand */}
        <Link className="navbar-brand" to="/">Personal Notes</Link>
        <div className="collapse navbar-collapse">
          <ul className="navbar-nav ms-auto">
            {/* Link to Home page */}
            <li className="nav-item">
              <Link className="nav-link" to="/">Home</Link>
            </li>
            {/* Link to Notes page */}
            <li className="nav-item">
              <Link className="nav-link" to="/notes">Notes</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
