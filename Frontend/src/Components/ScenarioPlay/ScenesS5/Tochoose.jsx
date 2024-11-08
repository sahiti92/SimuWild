import React, { useState } from "react";
import axios from "axios";
import { getUserFromStorage } from "../../../utils/getUser";
//! Get the token

const ToChoose = () => {
  const [selectedChoice, setSelectedChoice] = useState("");
  const [showOutcomeScene, setShowOutcomeScene] = useState(false);

  // Assuming a valid token is available in localStorage (you may get it from a global state or props)
  const token = getUserFromStorage(); // Replace with your actual method of fetching the token
  console.log(token);
  const handleChoiceClick = (choice) => {
    setSelectedChoice(choice);
    setShowOutcomeScene(false);
  };

  const handleShowOutcomeClick = () => {
    setShowOutcomeScene(true);
  };

  const handleRestartClick = async () => {
    try {
      console.log(" To");
      console.log(token);
      await axios.delete("http://localhost:8001/api/v1/progress/reset", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setSelectedChoice("");
      setShowOutcomeScene(false);
      alert("Progress has been reset.");
    } catch (error) {
      console.error("Error resetting progress:", error);
      console.log("Server Response:", error.response?.data);
      alert(
        "Failed to reset progress: " +
          (error.response?.data?.error || "Unknown error")
      );
    }
  };

  const styles = {
    container: {
      position: "relative",
      width: "100%",
      height: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    backgroundImage: {
      backgroundImage: "url('/bg.png')",
      backgroundSize: "cover",
      backgroundPosition: "center",
      opacity: 0.5,
      width: "100vw",
      height: "100vh",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      position: "fixed",
    },
    choices: {
      display: "flex",
      flexDirection: "column",
      gap: "20px",
    },
    choice: {
      padding: "20px",
      backgroundColor: "rgba(255, 255, 255, 0.8)",
      borderRadius: "7px",
      cursor: "pointer",
      boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
      transition: "transform 0.2s",
      color: "black",
      fontFamily: "Arial, sans-serif",
      height: "50px",
      textAlign: "center",
    },
    outcome: {
      marginTop: "20px",
      backgroundColor: "rgba(255, 255, 255, 0.8)",
      padding: "10px",
      borderRadius: "5px",
      textAlign: "center",
      boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
      color: "black",
      position: "relative",
    },
    outcomeScene: {
      marginTop: "20px",
      backgroundColor: "rgba(255, 255, 255, 0.9)",
      padding: "15px",
      borderRadius: "5px",
      textAlign: "center",
      boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
      color: "black",
      position: "relative",
    },
    restartButton: {
      position: "absolute",
      top: "20px",
      left: "20px",
      padding: "10px 15px",
      backgroundColor: "#ff6666",
      color: "white",
      border: "none",
      borderRadius: "5px",
      cursor: "pointer",
      boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
      fontSize: "16px",
    },
  };

  const outcomeText =
    selectedChoice === "Choice 1"
      ? "By working together, there is hope for both the tigers and their home."
      : "If we do nothing, both people and tigers will face serious consequences as their lives clash.";

  return (
    <div style={styles.container}>
      <div style={styles.backgroundImage}>
        <div style={styles.choices}>
          <div
            onClick={() => handleChoiceClick("Choice 1")}
            style={styles.choice}
          >
            1. Help protect the tigers' habitat.
          </div>
          <div
            onClick={() => handleChoiceClick("Choice 2")}
            style={styles.choice}
          >
            2. Ignore the problems and continue with development projects in the
            area.
          </div>
        </div>

        {selectedChoice && (
          <div style={styles.outcome}>
            <p>{outcomeText}</p>
            <button onClick={handleShowOutcomeClick}>Show Outcome Scene</button>
          </div>
        )}

        {showOutcomeScene && (
          <div style={styles.outcomeScene}>
            <p>{outcomeText}</p>
          </div>
        )}

        <button style={styles.restartButton} onClick={handleRestartClick}>
          Restart
        </button>
      </div>
    </div>
  );
};

export default ToChoose;
