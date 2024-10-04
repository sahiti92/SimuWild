// src/components/Dashboard/DashboardFooter.jsx
import React from "react";

const DshboardFooter = () => {
  return (
    <footer style={footerStyle}>
      <p>© 2024 Wildlife Conservation. All rights reserved.</p>
    </footer>
  );
};

const footerStyle = {
  backgroundColor: "#222", 
  color: "#FFD700", 
  padding: "10px", 
  textAlign: "center", 
  width: "100%", 
  position: "fixed", 
  bottom: 0, 
  left: 0, 
  right: 0, 
};

export default DshboardFooter;
