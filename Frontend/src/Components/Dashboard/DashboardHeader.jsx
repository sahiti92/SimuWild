// src/components/Dashboard/DashboardHeader.jsx
import React from "react";

const DashboardHeader = () => {
  return (
    <header style={headerStyle}>
      <nav>
        <ul style={navStyle}>
          <li style={navItemStyle}>About Us</li>
          <li style={navItemStyle}>Our Work</li>
          <li style={navItemStyle}>Contact</li>
        </ul>
      </nav>
      <h1 style={titleStyle}>Wildlife Conservation</h1>
    </header>
  );
};

const headerStyle = {
  backgroundColor: "#222", 
  color: "#FFD700", 
  padding: "10px", 
  margin: "0px",
  textAlign: "center", 
  width: "100%", 
  position: "relative", 
};

const titleStyle = {
  fontSize: "2.5rem",
  margin: "0", 
};

const navStyle = {
  listStyle: "none", 
  display: "flex", 
  justifyContent: "center", 
  gap: "20px",
  padding: "0", 
  margin: "0 0 10px 0", 
};

const navItemStyle = {
  color: "#FFD700",
  textDecoration: "none", 
  fontSize: "1.2rem", 
  transition: "color 0.3s", 
};

export default DashboardHeader;
