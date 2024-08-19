import React from "react";
import "./Sidebar.css";

const Sidebar = ({ onSelect }) => {
  return (
    <aside className="sidebar">
      <div className="logo"><img src="L-mobile-logo-transparent.png" style={{ width: '150px', height: 'auto' }} />
        <hr />
      </div>
      <ul>
        <li onClick={() => onSelect("Dashboard")}>
          <i className="fas fa-home"></i> Dashboard
        </li>
        <li onClick={() => onSelect("Articles")}>
          <i className="fas fa-tasks"></i> Articles
        </li>
        <li onClick={() => onSelect("People")}>
          <i className="fas fa-users"></i> People
        </li>
        <li onClick={() => onSelect("Companies")}>
          <i className="fas fa-building"></i> Companies
        </li>
        <li onClick={() => onSelect("Users")}>
          <i className="fas fa-newspaper"></i> Users
        </li>
      </ul>
    </aside>
  );
};

export default Sidebar;
