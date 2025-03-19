// src/components/Login.js

import React, { useState, useContext, useCallback } from 'react';
import { AuthContext } from '../context/AuthContext';

/**
 * Login component allows the user to login by entering a username and password.
 * Only the credentials username: "Mani" and password: "Mani@123" are accepted.
 * On submission, the authentication state is updated.
 */
const Login = () => {
  const { login } = useContext(AuthContext);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  /**
   * Handles the login form submission.
   * Validates credentials and, if correct, logs in the user.
   *
   * @param {Event} e - The form submission event.
   */
  const handleLogin = useCallback(
    (e) => {
      e.preventDefault();
      if (username.trim() === 'Mani' && password === 'Mani@123') {
        // Login is successful
        login('Mani');
        setError('');
        setUsername('');
        setPassword('');
      } else {
        // Credentials are invalid
        setError('Invalid credentials');
      }
    },
    [username, password, login]
  );

  return (
    <form onSubmit={handleLogin}>
      <h2>Login</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <div>
        <input
          type="text"
          placeholder="Enter username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div style={{ marginTop: '10px' }}>
        <input
          type="password"
          placeholder="Enter password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <button type="submit" style={{ marginTop: '10px' }}>
        Login
      </button>
    </form>
  );
};

export default React.memo(Login);
