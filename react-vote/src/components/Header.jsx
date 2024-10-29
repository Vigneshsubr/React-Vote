import React from "react";
import { Link } from "react-router-dom";
import { Navbar, Dropdown} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {  faUserCircle } from '@fortawesome/free-solid-svg-icons';
import 'bootstrap/dist/css/bootstrap.min.css';
import Inidalogo from '../asserts/images/Inida.png'; // Your logo
import '../App.css'; // Ensure this import is present

function Header({ onSidebarToggle, username }) {
  return (
    <Navbar expand="lg" bg="light" variant="light" className="position-fixed w-100" style={{ zIndex: 1000, height: '80px' }}>
      <div className="container">
        {/* <Button onClick={onSidebarToggle} variant="link" className="text-dark me-3">
          <FontAwesomeIcon icon={faBars} size="lg" />
        </Button> */}
        <Navbar.Brand as={Link} to="/">
          <img src={Inidalogo} alt="Logo" style={{ width: '50px', height: '50px' }} />
          <span className="ms-3 h5 mb-0">VOTEINDIA</span>
        </Navbar.Brand>
        
        {/* Display logged-in username */}
        <Link to="/dashboard/vote" className="ms-3 h6 mb-0 text-dark text-decoration-none">Voters</Link>
        <Link to="/dashboard/election" className="ms-3 h6 mb-0 text-dark text-decoration-none">Election</Link>
        <Link to="/dashboard/candidate" className="ms-3 h6 mb-0 text-dark text-decoration-none">Candidate</Link>
        <Link to="/dashboard/poll" className="ms-3 h6 mb-0 text-dark text-decoration-none">Poll</Link>
        <span className="ms-auto me-3 h6 mb-0">{username}</span>

        <Dropdown align="end">
          <Dropdown.Toggle variant="link" id="profile-dropdown" className="text-dark">
            <FontAwesomeIcon icon={faUserCircle} size="xl" />
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item as={Link} to="/profile">Profile</Dropdown.Item>
            <Dropdown.Item as={Link} to="/signup">Sign Out</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>


        {/* Add Voters Link to Navbar */}
       
      </div>
    </Navbar>
  );
}

export default Header;
