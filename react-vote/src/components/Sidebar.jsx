import React from 'react';
import { Link } from 'react-router-dom';
import { Offcanvas } from 'react-bootstrap';

const Sidebar = ({ show, handleClose }) => {
  return (
    <Offcanvas show={show} onHide={handleClose} placement="start" style={{ backgroundColor: '#f8f9fa', width: '250px' }}>
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>Menu</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        <ul className="list-unstyled">
          <li className="mb-2">
            <Link 
              to="/dashboard/getvoters" 
              onClick={handleClose} 
              className="text-decoration-none text-dark p-2 d-block rounded hover-link"
              style={{ transition: 'background-color 0.3s', borderRadius: '5px' }} 
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#e2e6ea'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
            >
              Get Voters
            </Link>
          </li>
          <li className="mb-2">
            <Link 
              to="/dashboard/createvoters" 
              onClick={handleClose} 
              className="text-decoration-none text-dark p-2 d-block rounded hover-link"
              style={{ transition: 'background-color 0.3s', borderRadius: '5px' }} 
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#e2e6ea'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
            >
              Create Voters
            </Link>
          </li>
          <li className="mb-2">
            <Link 
              to="/dashboard/userdetails" 
              onClick={handleClose} 
              className="text-decoration-none text-dark p-2 d-block rounded hover-link"
              style={{ transition: 'background-color 0.3s', borderRadius: '5px' }} 
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#e2e6ea'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
            >
              User Details
            </Link>
          </li>
          <li className="mb-2">
            <Link 
              to="/dashboard/updateusers" 
              onClick={handleClose} 
              className="text-decoration-none text-dark p-2 d-block rounded hover-link"
              style={{ transition: 'background-color 0.3s', borderRadius: '5px' }} 
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#e2e6ea'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
            >
              Update Users
            </Link>
          </li>
          {/* Add more sidebar links as needed */}
        </ul>
      </Offcanvas.Body>
    </Offcanvas>
  );
};

export default Sidebar;
