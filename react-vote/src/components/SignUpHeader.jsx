import React from "react";
import { Link } from "react-router-dom";
import { Navbar, Nav } from 'react-bootstrap';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faUserCircle } from '@fortawesome/free-solid-svg-icons';
import 'bootstrap/dist/css/bootstrap.min.css';
import Inidalogo from '../asserts/images/Inida.png' // Your logo

function SignUpHeader() {
  return (
    <Navbar expand="lg" bg="light" variant="light" className="position-fixed w-100" style={{ zIndex: 1000, height: '80px' }}>
      <div className="container">
        {/* Logo and Brand Name */}
        <Navbar.Brand as={Link} to="/">
          <img src={Inidalogo} alt="Logo" style={{ width: '50px', height: '50px' }} />
          <span className="ms-3 h5 mb-0">Academy</span>
        </Navbar.Brand>

        {/* Toggle Button for Mobile */}
        <Navbar.Toggle aria-controls="basic-navbar-nav" />

        {/* Collapsible Menu */}
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link as={Link} to="/signup">Sign Up</Nav.Link>
            <Nav.Link as={Link} to="/signin">Sign In</Nav.Link>

            {/* <Dropdown align="end">
              <Dropdown.Toggle variant="link" id="profile-dropdown" className="text-dark">
                <FontAwesomeIcon icon={faUserCircle} size="xl" />
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item as={Link} to="/profile">Profile</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown> */}
          </Nav>
        </Navbar.Collapse>
      </div>
    </Navbar>
  );
}

export default SignUpHeader;
