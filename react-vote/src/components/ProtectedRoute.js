// src/components/ProtectedRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';

// Function to decode JWT token and retrieve user data
const getUserFromToken = () => {
  const token = localStorage.getItem('Token') || sessionStorage.getItem('Token');
  if (token) {
    try {
      const decoded = JSON.parse(atob(token.split('.')[1])); // Decode the JWT token (Base64 URL)
      console.log("Decoded token:", decoded);  // Debugging: log the decoded token
      return decoded;
    } catch (error) {
      console.error('Invalid token format:', error);
      return null;
    }
  }
  return null;
};

// Function to protect routes based on the user's role
const ProtectedRoute = ({ children, requiredRole }) => {
  const user = getUserFromToken();

  if (!user) {
    console.warn("No valid token found; redirecting to signin.");
    return <Navigate to="/signin" replace />;
  }

  const userRole = user.Role || user.role;  // Access role with case flexibility
  console.log("User role:", userRole);  // Debugging: log the user's role
  
  // Allow access if the user has the required role or is an admin
  if (userRole !== requiredRole && userRole !== 'ADMIN') {
    console.warn(`Access denied for role ${userRole}. Redirecting to home.`);
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
