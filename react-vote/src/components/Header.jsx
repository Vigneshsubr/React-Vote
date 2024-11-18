import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Dropdown } from "react-bootstrap"; // Importing necessary components from React Bootstrap

const Header = ({ username }) => {
  //const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();
  const firstLetter = username.charAt(0).toUpperCase();

  // Handle sign out and redirect to signup page
  const handleSignOut = () => {
    localStorage.removeItem("Token");
    sessionStorage.removeItem("Token");
    navigate("/signup");
  };

  return (
    <div
      className="d-flex align-items-center justify-content-between px-3 py-3 text-dark shadow-sm"
      style={{
        width: "calc(100% - 220px)", // Adjust width for sidebar (assuming sidebar width is 220px)
        backgroundColor: "#F0F0F0",
      }}
    >
      {/* Left side content */}
      <div className="d-flex align-items-center">
        <h5 className="mb-0" style={{ fontSize: "18px" }}>
          Dashboard
        </h5>
      </div>

      {/* Right side content */}
      <div className="d-flex align-items-center">
        <span className="fw-bold" style={{ fontSize: "16px" }}>
          {username}
        </span>
        {/* React Bootstrap Dropdown */}
        <Dropdown align="end">
          <Dropdown.Toggle
            className="rounded-circle bg-primary text-white d-flex align-items-center justify-content-center ms-2"
             bsPrefix="custom-toggle"
            style={{
              width: "30px", // Reduced circle size
              height: "30px",
              fontSize: "19px", // Reduced font size for letter
              cursor: "pointer",
            }}
            id="dropdown-custom-components"
          >
            {firstLetter}
          </Dropdown.Toggle>

          <Dropdown.Menu
            style={{
              borderRadius: "5px",
              boxShadow: "0 0 5px rgba(0,0,0,0.15)",
              backgroundColor: "white", // Added background to dropdown
            }}
          >
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
