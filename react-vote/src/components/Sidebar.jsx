import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserPlus, faEdit, faSearch, faListDots } from '@fortawesome/free-solid-svg-icons';

const Sidebar = () => {
  const [hoveredLink, setHoveredLink] = useState(null);
  const location = useLocation(); 

  const handleMouseEnter = (link) => {
    setHoveredLink(link);
  };

  const handleMouseLeave = () => {
    setHoveredLink(null);
  };

  const getLinkStyle = (link, path) => ({
    backgroundColor: hoveredLink === link || location.pathname === path ? '#0d6efd' : 'transparent',
    color: 'white',
    textDecoration: 'none',
    fontSize: '1.1rem',
  });

  return (
    <div
      className="d-flex flex-column p-5 bg-dark text-white position-fixed" 
      style={{ width: '250px', height: '100vh' }} 
    >
      <ul className="nav nav-pills flex-column mb-auto">
        <li className="nav-item mb-4 mt-2">
          <Link
            to="/create"
            className="nav-link"
            style={getLinkStyle('createuser', '/createuser')}
            onMouseEnter={() => handleMouseEnter('createuser')}
            onMouseLeave={handleMouseLeave}
          >
            <FontAwesomeIcon icon={faUserPlus} className="me-2" />
            Create User
          </Link>
        </li>
        <li className="nav-item mb-4">
          <Link
            to="/update/id"
            className="nav-link pr-2"
            style={getLinkStyle('update', '/update/id')}
            onMouseEnter={() => handleMouseEnter('update')}
            onMouseLeave={handleMouseLeave}
          >
            <FontAwesomeIcon icon={faEdit} className="me-2" />
            Update User
          </Link>
        </li>
        <li className="nav-item mb-4 ">
          <Link
            to="/user/1"
            className="nav-link"
            style={getLinkStyle('get', '/user/1')}
            onMouseEnter={() => handleMouseEnter('get')}
            onMouseLeave={handleMouseLeave}
          >
            <FontAwesomeIcon icon={faSearch} className="me-2" />
            User Details
          </Link>
        </li>
        <li className="nav-item">
          <Link
            to="/list"
            className="nav-link"
            style={getLinkStyle('list', '/list')}
            onMouseEnter={() => handleMouseEnter('list')}
            onMouseLeave={handleMouseLeave}
          >
            <FontAwesomeIcon icon={faListDots} className="me-2" />
            List Users
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
