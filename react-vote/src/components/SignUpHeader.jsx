import React from "react";
import { Link } from "react-router-dom";
import { Navbar, Nav } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Inidalogo from '../asserts/images/Inida.png' // Your logo

function SignUpHeader() {
  return (
    <Navbar expand="lg" bg="light" variant="light" className="position-fixed w-100" style={{ zIndex: 1000, height: '80px', top: 0 }}>
      <div className="container">
       
        <Navbar.Brand as={Link} to="/">
          <img src={Inidalogo} alt="Logo" style={{ width: '50px', height: '50px' }} />
          <span className="ms-3 h5 mb-0">Academy</span>
        </Navbar.Brand>

       
        <Navbar.Toggle aria-controls="basic-navbar-nav" />

       
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link as={Link} to="/signup">Sign Up</Nav.Link>
            <Nav.Link as={Link} to="/signin">Sign In</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </div>
    </Navbar>
  );
}

export default SignUpHeader;
