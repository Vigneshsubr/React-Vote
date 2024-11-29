import React from 'react';
import { Navigate } from 'react-router-dom';


const getUserFromToken = () => {
  const token = localStorage.getItem('Token') || sessionStorage.getItem('Token');
  if (token) {
    try {
      const decoded = JSON.parse(atob(token.split('.')[1])); 
      return decoded;
    } catch (error) {
      console.error('Invalid token format:', error);
      return null;
    }
  }
  return null;
};


const ProtectedRoute = ({ children, allowedRoles }) => {
  const user = getUserFromToken();

  if (!user) {
    console.warn('No valid token found; redirecting to signin.');
    return <Navigate to="/signin" replace />;
  }

  const userRole = user.Role || user.role;
  if (!allowedRoles.includes(userRole)) {
    console.warn(`Access denied for role ${userRole}. Redirecting to home.`);
    return <Navigate to="/signin" replace />;
  }

  return children;
};

export default ProtectedRoute;
