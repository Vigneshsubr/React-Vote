import React from 'react';
import { Navigate } from 'react-router-dom';

// Function to decode JWT token and retrieve user data
const getUserFromToken = () => {
  const token = localStorage.getItem('Token') || sessionStorage.getItem('Token');
  if (token) {
    try {
      const decoded = JSON.parse(atob(token.split('.')[1])); // Decode the JWT token (Base64 URL)
      return decoded;
    } catch (error) {
      console.error('Invalid token format:', error);
      return null;
    }
  }
  return null;
};

// Function to protect routes based on the user's role(s)
const ProtectedRoute = ({ children, allowedRoles }) => {
  const user = getUserFromToken();

  if (!user) {
    console.warn('No valid token found; redirecting to signin.');
    return <Navigate to="/signin" replace />;
  }

  const userRole = user.Role || user.role; // Support for different case formats
  if (!allowedRoles.includes(userRole)) {
    console.warn(`Access denied for role ${userRole}. Redirecting to home.`);
    return <Navigate to="/signin" replace />;
  }

  return children;
};

export default ProtectedRoute;
