// src/App.js
import React, { lazy, Suspense, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { checkAuth } from "./redux/actions";
import Navbar from "./components/Navbar";
import "./App.css";

// Lazy load pages
const Home = lazy(() => import("./pages/Home"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const Login = lazy(() => import("./pages/Login"));
const Profile = lazy(() => import("./pages/Profile"));

// ProtectedRoute component for v6:
const ProtectedRoute = ({ element: Element, isAuthenticated }) =>
  isAuthenticated ? <Element /> : <Navigate to="/login" replace />;

const App = () => {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);

  return (
    <div className="App">
      <Navbar />
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />

          {/* Use ProtectedRoute wrapper via element prop */}
          <Route
            path="/dashboard"
            element={<ProtectedRoute element={Dashboard} isAuthenticated={isAuthenticated} />}
          />
          <Route
            path="/profile"
            element={<ProtectedRoute element={Profile} isAuthenticated={isAuthenticated} />}
          />

          {/* Redirect unmatched routes to Home */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Suspense>
    </div>
  );
};

export default App;
