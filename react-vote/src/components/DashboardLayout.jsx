import React, { useState, useEffect } from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import electronic from "../asserts/images/electronic.jpg"; 

const DashboardLayout = () => {
  const [username, setUsername] = useState("");
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const storedName = sessionStorage.getItem("Name");
    setUsername(storedName || "Guest");

    
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);
    handleResize(); 

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="d-flex flex-row container-fluid p-0 vh-100">
      
      {isMobile ? (
        <>
          
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
            width: "220px", 
            backgroundColor: "#292a2c",
            zIndex: 1,
          }}
        >
          <Sidebar />
        </div>
      )}

      
      <div
        className="flex-grow-1"
        style={{
          marginLeft: isMobile ? "0" : "220px", 
        }}
      >
       
        <div
          className="position-fixed w-100"
          style={{
            height: "58px", 
            backgroundColor: "#F0F0F0",
            zIndex: 2,
            top: 0,
          }}
        >
          <Header username={username} isMobile={isMobile} />
        </div>

       
        <div
          className="content"
          style={{
            marginTop: "56px", 
            backgroundImage: `url(${electronic})`,
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat", 
            backgroundPosition: "center",
            minHeight: "calc(100vh - 56px)", 
          }}
        >
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;

