import React from "react";
import { Link, useLocation } from "react-router-dom";
import Inidalogo from "../asserts/images/ch1.jpg";
import { Icon } from "@iconify/react";

const Sidebar = () => {
  const location = useLocation(); // Get the current path

  return (
    <div
      className="col-12 col-sm-3 col-md-2 vh-100 position-fixed"
      style={{
        maxWidth: "220px",
        width: "100%",
        backgroundColor: "#292a2c", // Elephant color (dark grey)
        borderRight: "none",
        zIndex: 999,
        top: "0px",
      }}
    >
      <div className="text-center me-5 mb-2">
        <img src={Inidalogo} alt="Logo" style={{ width: "80px", height: "80px" }} />
      </div>
      <ul className="list-unstyled px-3 mt-5 py-3 sidebar-menu">
        {[
          { path: "/dashboard/voters", label: "Voters", icon: "mdi:user" },
          { path: "/dashboard/election", label: "Election", icon: "mdi:vote" },
          { path: "/dashboard/candidate", label: "Candidate", icon: "mdi:account" },
          { path: "/dashboard/poll", label: "Poll", icon: "mdi:poll" },
          { path: "/dashboard/result", label: "Result", icon: "mdi:chart-bar" },
        ].map((item) => (
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
            background-color: #697565; /* Hover color for sidebar links */
            color: white;
          }
          .sidebar-menu .active {
            background-color: #009fff; /* Slightly lighter grey for active tab */
            color: white;
          }
          .sidebar-menu .active:hover {
            background-color: #229799; /* Active tab also turns blue on hover */
          }
        `}
      </style>
    </div>
  );
};

export default Sidebar;
