import React from "react";
import { useNavigate } from "react-router-dom";

export default function RoleSelection() {
  const navigate = useNavigate();
  const handleRoleClick = (role) => {
    if (role === "civilian") {
      navigate("/choice31"); 
    } else if (role === "poacher") {
      navigate("/poacher");
    }
  };

  return (
    <div style={styles.container}>
      {/* Overlay for choices */}
      <div style={styles.overlay}>
        <h1 style={styles.title}>What would you be?</h1>
        <p style={styles.description}>
          You have the option to play a role between a civilian and a poacher.
        </p>
        <div style={styles.buttonContainer}>
          <button
            style={styles.userButton}
            onMouseOver={(e) =>
              (e.target.style.background = styles.userButtonHover.background)
            }
            onMouseOut={(e) =>
              (e.target.style.background = styles.userButton.background)
            }
            onClick={() => handleRoleClick("civilian")}
          >
            Civilian
          </button>
          <button
            style={styles.poacherButton}
            onMouseOver={(e) =>
              (e.target.style.background = styles.poacherButtonHover.background)
            }
            onMouseOut={(e) =>
              (e.target.style.background = styles.poacherButton.background)
            }
            onClick={() => handleRoleClick("poacher")}
          >
            Poacher
          </button>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    position: "relative",
    width: "100vw",
    height: "100vh",
    backgroundImage: "url('./RHINO.jpg')", // Replace with your image path
    backgroundSize: "cover",
    backgroundPosition: "center",
    display: "flex",
    alignItems: "center",
    marginLeft: "10px",
    justifyContent: "flex-start",
    padding: "5%",
    overflow: "hidden",
  },
  overlay: {
    position: "relative",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    color: "white",
    padding: "30px",
    textAlign: "center",
    borderRadius: "15px",
    maxWidth: "400px",
    cursor: "pointer",
    transition: "box-shadow 0.3s ease", 
  },
  title: {
    fontSize: "2.5rem",
    marginBottom: "15px",
    textShadow: "0 2px 5px rgba(0, 0, 0, 0.7)",
    fontWeight: "bold",
  },
  description: {
    fontSize: "1.2rem",
    marginBottom: "20px",
    lineHeight: "1.6",
    textShadow: "0 1px 3px rgba(0, 0, 0, 0.5)",
  },
  buttonContainer: {
    display: "flex",
    gap: "20px",
    justifyContent: "center",
  },
  userButton: {
    background: "linear-gradient(45deg, #776551,#6E5D4B)",
    fontSize: "1.5rem",
    padding: "10px 20px",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    transition: "all 0.3s ease",
    color: "white",
    textShadow: "0 1px 3px rgba(0, 0, 0, 0.7)",
  },
  userButtonHover: {
    background: "linear-gradient(45deg,#E0BE99,#BFA282)", 
  },
  poacherButton: {
    background: "linear-gradient(45deg, #776551,#6E5D4B)", 
    fontSize: "1.5rem",
    padding: "10px 20px",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    transition: "all 0.3s ease",
    color: "white",
    textShadow: "0 1px 3px rgba(0, 0, 0, 0.7)",
  },
  poacherButtonHover: {
    background: "linear-gradient(45deg, #E0BE99,#BFA282)",
  },
};