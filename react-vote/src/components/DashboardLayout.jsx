import React, { useState, useEffect } from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const DashboardLayout = () => {
  const [username, setUsername] = useState("");
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const storedName = sessionStorage.getItem("Name");
    setUsername(storedName || "Guest");

    // Check screen size for responsiveness
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);
    handleResize(); // Run on mount to check initial screen size

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="d-flex flex-row container-fluid p-0 vh-100">
      {/* Sidebar */}
      {isMobile ? (
        <>
          {/* Offcanvas for Mobile */}
          <div
            className="offcanvas offcanvas-start"
            tabIndex="-1"
            id="offcanvasSidebar"
            aria-labelledby="offcanvasSidebarLabel"
            style={{ backgroundColor: "#292a2c", width: "200px" }} 
          >
            <div className="offcanvas-header">
              <h5 className="offcanvas-title text-light" id="offcanvasSidebarLabel">
                Menu
              </h5>
              <button
                type="button"
                className="btn-close text-reset"
                data-bs-dismiss="offcanvas"
                aria-label="Close"
              ></button>
            </div>
            <div className="offcanvas-body p-0">
              <Sidebar />
            </div>
          </div>
        </>
      ) : (
        <div
          className="position-fixed vh-100"
          style={{
            width: "220px", // Fixed width for the sidebar on larger screens
            backgroundColor: "#292a2c",
            zIndex: 1,
          }}
        >
          <Sidebar />
        </div>
      )}

      {/* Main Content */}
      <div
        className="flex-grow-1"
        style={{
          marginLeft: isMobile ? "0" : "220px", // Adjust margin for mobile
        }}
      >
        {/* Header */}
        <div
          className="position-fixed w-100"
          style={{
            height: "58px", // Fixed height for the header
            backgroundColor: "#F0F0F0",
            zIndex: 2,
            top: 0,
          }}
        >
          <Header username={username} isMobile={isMobile} />
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
