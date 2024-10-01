import React from "react";
import { Link } from "react-router-dom";
import { Dropdown } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';
import 'bootstrap/dist/css/bootstrap.min.css'; 
import ftslogo from '../asserts/images/ftslogo.png'

function Header() {
  return (
    <nav className="d-flex justify-content-between align-items-center bg-dark text-white position-fixed w-100" 
         style={{ zIndex: 1000, height: '80px' }} 
    >
      <div className="d-inline-flex align-items-center">
        <img src={ftslogo} alt="Logo" style={{ width: '80px', height: '80px'}} />
        <h1 className="h6 ms-3 mb-0 fst-italic fs-5">Academy</h1>
      </div>
      <div className="d-flex align-items-center">
        <Dropdown>
          <Dropdown.Toggle variant="link" id="profile-dropdown" className="text-white">
            <FontAwesomeIcon icon={faUserCircle} size="xl"/> 
          </Dropdown.Toggle>

          <Dropdown.Menu align="end">
            <Dropdown.Item as={Link} to="/profile">Profile</Dropdown.Item>
            <Dropdown.Item as={Link} to="/signout">Sign Out</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>
    </nav>
  );
}

export default Header;
