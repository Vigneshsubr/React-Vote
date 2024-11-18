import React, { useState, useEffect } from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const DashboardLayout = () => {
  const [username, setUsername] = useState("");

  useEffect(() => {
    const storedName = sessionStorage.getItem("Name");
    setUsername(storedName || "Guest");
  }, []);

  return (
    <div className="d-flex flex-row container-fluid p-0 vh-100">
      {/* Sidebar */}
      <div
        className="position-fixed vh-100"
        style={{
          width: "220px", // Fixed width for the sidebar
          backgroundColor: "#292a2c",
          zIndex: 1,
        }}
      >
        <Sidebar />
      </div>

      {/* Main Content */}
      <div
        className="flex-grow-1"
        style={{
          marginLeft: "220px", // Align content to start after the sidebar
        }}
      >
        {/* Header */}
        <div
          className="position-fixed w-100"
          style={{
            height: "56px", // Fixed height for the header
            backgroundColor: "#F0F0F0",
            zIndex: 2,
            top: 0,
          }}
        >
          <Header username={username} />
        </div>

        {/* Page Content */}
        <div
          className="content"
          style={{
            marginTop: "56px", // Align content to start below the header
          }}
        >
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
