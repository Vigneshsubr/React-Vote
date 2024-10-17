import React, { useState, useEffect } from 'react';
import Header from './Header'; // Header for the dashboard
import Sidebar from './Sidebar'; // Sidebar for navigation
import 'bootstrap/dist/css/bootstrap.min.css';
import { Outlet } from 'react-router-dom';

const DashboardLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [username, setUsername] = useState("");

  const handleSidebarToggle = () => setSidebarOpen(!sidebarOpen);
  const handleSidebarClose = () => setSidebarOpen(false);

  useEffect(() => {
    // Get the name from sessionStorage
    const storedName = sessionStorage.getItem('Name');
    console.log("Stored Name in sessionStorage: ", storedName); // Debug log
    if (storedName) {
        setUsername(storedName); // Set the username from sessionStorage
    } else {
        setUsername("Guest"); // Fallback to 'Guest' if no name is found
    }
}, []);

// Empty dependency array ensures this effect runs once when the component mounts

  return (
    <div className="d-flex flex-column" style={{ minHeight: '100vh' }}>
      <Header onSidebarToggle={handleSidebarToggle} username={username} /> {/* Pass the dynamic username */}
      <Sidebar show={sidebarOpen} handleClose={handleSidebarClose} />

      <div className="d-flex" style={{ flexGrow: 1, overflow: 'hidden', marginTop: '80px' }}>
        {/* Main content */}
        <main className="flex-grow-1 p-3" style={{ overflowY: 'auto' }}>
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
