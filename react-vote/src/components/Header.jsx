import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Dropdown } from "react-bootstrap";
import { Icon } from "@iconify/react"; // Import the Icon component

const Header = ({ username, isMobile }) => {
  const navigate = useNavigate();
  const firstLetter = username.charAt(0).toUpperCase();

  const handleSignOut = () => {
    localStorage.removeItem("Token");
    sessionStorage.removeItem("Token");
    navigate("/signup");
  };

  return (
    <div
      className="d-flex align-items-center justify-content-between px-3 py-3 text-dark shadow-sm"
      style={{
        width: isMobile ? "100%" : "calc(100% - 220px)", // Adjust width for sidebar
        backgroundColor: "#F0F0F0",
      }}
    >
      {/* Left side content */}
      <div className="d-flex align-items-center">
        {isMobile && (
          <button
            className="btn me-2"
            type="button"
            data-bs-toggle="offcanvas"
            data-bs-target="#offcanvasSidebar"
            aria-controls="offcanvasSidebar"
          >
            {/* Use Iconify for the offcanvas menu icon */}
            <Icon icon="mdi:menu" style={{ fontSize: "24px" }} />
          </button>
        )}
        <h5 className="mb-0" style={{ fontSize: "18px" }}>
          Dashboard
        </h5>
      </div>

      {/* Right side content */}
      <div className="d-flex align-items-center">
        <span className="fw-bold" style={{ fontSize: "16px" }}>
          {username}
        </span>
        <Dropdown align="end">
          <Dropdown.Toggle
            className="rounded-circle bg-secondary text-white d-flex align-items-center justify-content-center ms-2"
            bsPrefix="custom-toggle"
            style={{
              width: "30px",
              height: "30px",
              fontSize: "19px",
              cursor: "pointer",
            }}
            id="dropdown-custom-components"
          >
            {firstLetter}
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item as={Link} to="/profile">
              Profile
            </Dropdown.Item>
            <Dropdown.Item onClick={handleSignOut}>
              Sign Out
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>
    </div>
  );
};

export default Header;
