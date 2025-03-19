// src/App.js

import React, { useState, useContext } from "react";
import { UserContext } from "./context/UserContext";
import TaskDashboard from "./components/TaskDashboard";
import Login from "./components/Login";
import "./App.css";

function App() {
  const { user, setUser } = useContext(UserContext);
  const [theme, setTheme] = useState("light");

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  const handleLogout = () => {
    setUser(null);
  };

  return (
    <div className={`app-container ${theme}`}>
      <div className="header">
        <button className="theme-toggle" onClick={toggleTheme}>
          Toggle Theme
        </button>
        {user && (
          <button className="logout-btn" onClick={handleLogout}>
            Logout
          </button>
        )}
      </div>
      {user ? <TaskDashboard /> : <Login />}
    </div>
  );
}

export default App;


