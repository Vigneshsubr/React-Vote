import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Navbar, Dropdown } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Inidalogo from '../asserts/images/Inida.png';
import '../App.css';

function Header({ onSidebarToggle, username }) {
  const navigate = useNavigate();
  const initial = username ? username.charAt(0).toUpperCase() : ''; // Get the first letter of the username

  const handleSignOut = () => {
    localStorage.removeItem('Token');
    sessionStorage.removeItem('Token');
    navigate('/signup');
  };

  return (
    <Navbar expand="lg" bg="light" variant="light" className="position-fixed w-100" style={{ zIndex: 1000, height: '80px' }}>
      <div className="container-fluid p-4">
        <Navbar.Brand as={Link} to="/" className="text-decoration-none">
          <img src={Inidalogo} alt="Logo" style={{ width: '50px', height: '50px' }} />
          <span className="ms-3 h5 mb-0">VOTEINDIA</span>
        </Navbar.Brand>

        <Link to="/dashboard/vote" className="ms-3 h6 mb-0 text-dark text-decoration-none">Voters</Link>
        <Link to="/dashboard/election" className="ms-3 h6 mb-0 text-dark text-decoration-none">Election</Link>
        <Link to="/dashboard/candidate" className="ms-3 h6 mb-0 text-dark text-decoration-none">Candidate</Link>
        <Link to="/dashboard/poll" className="ms-3 h6 mb-0 text-dark text-decoration-none">Poll</Link>
        <Link to="/dashboard/result" className="ms-3 h6 mb-0 text-dark text-decoration-none">Result</Link>

        <span className="ms-auto me-3 h6 mb-0">{username}</span>

        <Dropdown align="end">
          <Dropdown.Toggle variant="link" id="profile-dropdown" bsPrefix="custom-toggle"  className="text-dark p-0" style={{ borderRadius: '60%', width: '30px', height: '30px', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#ddd', color: '#333', fontSize: '20px', fontWeight: 'bold', textDecoration:'None'}}>
            {initial}
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item as={Link} to="/profile">Profile</Dropdown.Item>
            <Dropdown.Item onClick={handleSignOut}>Sign Out</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>
    </Navbar>
  );
}

export default Header;
