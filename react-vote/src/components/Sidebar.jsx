import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {jwtDecode} from "jwt-decode"; 
import Inidalogo from "../asserts/images/v1bg.jpg";
import { Icon } from "@iconify/react";

const Sidebar = () => {
  const location = useLocation(); 
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    
    const token = localStorage.getItem("Token")||sessionStorage.getItem("Token");
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        setUserRole(decodedToken.Role); 
      } catch (error) {
        console.error("Invalid token", error);
      }
    }
  }, []);

  const links = [
    { path: "/dashboard/voters", label: "Voters", icon: "mdi:user", visibleTo: ["ADMIN"] },
    { path: "/dashboard/createelection", label: "Election", icon: "mdi:vote", visibleTo: ["ADMIN"] },
    { path: "/dashboard/getcandidates", label: "Candidate", icon: "mdi:account", visibleTo: ["ADMIN"] },
    { path: "/dashboard/poll", label: "Poll", icon: "mdi:poll", visibleTo: ["ADMIN"] },
    { path: "/dashboard/viewresult", label: "Result", icon: "mdi:chart-bar", visibleTo: ["ADMIN", "VOTER"] },
    { path: "/dashboard/elections", label: "Vote", icon: "mdi-inbox", visibleTo: ["ADMIN","VOTER"] }


  ];

  return (
    <div
      className="col-12 col-sm-3 col-md-2 vh-100 position-fixed"
      style={{
        maxWidth: "220px",
        width: "100%",
        backgroundColor: "#292a2c",
        borderRight: "none",
        zIndex: 999,
        top: "0px",
      }}
    >
      <div className="text-center me-5 mb-2">
        <img src={Inidalogo} alt="Logo" style={{ width: "100px", height: "100px" }} />
      </div>
      <ul className="list-unstyled px-4 mt-4 py-3 sidebar-menu">
        {links
          .filter((item) => item.visibleTo.includes(userRole)) 
          .map((item) => (
            <li className="mb-4" key={item.path}>
              <Link
                to={item.path}
                className={`text-decoration-none d-block p-2 rounded ${
                  location.pathname === item.path ? "active" : "text-light"
                }`}
                style={{
                  transition: "background-color 0.3s",
                }}
              >
                <Icon icon={item.icon} style={{ marginRight: "8px", fontSize: "18px" }} />
                {item.label}
              </Link>
            </li>
          ))}
      </ul>
      <style>
        {`
          .sidebar-menu .text-light:hover {
            background-color: #697565;
            color: white;
          }
          .sidebar-menu .active {
            background-color: #009fff;
            color: white;
          }
          .sidebar-menu .active:hover {
            background-color: #229799;
          }
        `}
      </style>
    </div>
  );
};

export default Sidebar;
