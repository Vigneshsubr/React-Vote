import React, { useState, useEffect } from 'react';
import Header from './Header'; // Header for the dashboard
import 'bootstrap/dist/css/bootstrap.min.css';
import { Outlet } from 'react-router-dom';

const DashboardLayout = () => {
  const [username, setUsername] = useState("");

  useEffect(() => {
    // Get the name from sessionStorage
    const storedName = sessionStorage.getItem('Name');
    if (storedName) {
      setUsername(storedName); // Set the username from sessionStorage
    } else {
      setUsername("Guest"); // Fallback to 'Guest' if no name is found
    }
  }, []);

  return (
    <div className="d-flex flex-column" style={{ minHeight: '100vh' }}>
      {/* Header with dynamic username */}
      <Header username={username} /> 

      {/* Main content below the header */}
      <div className="d-flex" style={{ flexGrow: 1, overflow: 'hidden', marginTop: '80px' }}>
        <main className="flex-grow-1 " style={{ overflowY: 'auto' }}>
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
