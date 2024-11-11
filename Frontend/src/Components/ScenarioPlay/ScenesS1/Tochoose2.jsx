import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate for routing
import axios from "axios";
import { getUserFromStorage } from "../../../utils/getUser";

const ToChoose2 = () => {
  const [selectedChoice, setSelectedChoice] = useState("");
  const [showOutcomeScene, setShowOutcomeScene] = useState(false);
  const navigate = useNavigate(); // Initialize navigate for routing

  // Assuming a valid token is available in localStorage
  const token = getUserFromStorage();

  const handleChoiceClick = (choice) => {
    setSelectedChoice(choice);
    setShowOutcomeScene(false);
     // Navigate to the respective page based on choice
     if (choice === "Choice 1") {
      navigate("/eleph21");
    } else if (choice === "Choice 2") {
      navigate("/eleph12");
    }
  };

  const handleShowOutcomeClick = () => {
    setShowOutcomeScene(true);
  };

  const handleRestartClick = async () => {
    try {
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
      alert("Failed to reset progress: " + (error.response?.data?.error || "Unknown error"));
    }
  };

  const handleExitClick = () => {
    navigate("/scenarios/scenario1"); // Navigate to Scenario1 when Exit is clicked
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
      backgroundImage: "url('/bg1.png')",
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
      color: "black",
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
    },
    outcomeScene: {
      marginTop: "20px",
      backgroundColor: "rgba(255, 255, 255, 0.9)",
      padding: "15px",
      borderRadius: "5px",
      textAlign: "center",
      boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
      color: "black",
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
      fontSize: "16px",
    },
    exitButton: {
      position: "absolute",
      top: "20px",
      right: "20px", // Positioning to the top-right corner
      padding: "10px 15px",
      backgroundColor: "red", // Red color for the Exit button
      color: "white",
      border: "none",
      borderRadius: "5px",
      cursor: "pointer",
      fontSize: "16px",
    },
  };

  const outcomeText =
    selectedChoice === "Choice 1"
      ? " The fences prevent elephants from entering villages but lead to injuries and deaths among the animals. The conflict is somewhat mitigated short-term but sparks criticism from conservation groups.."
      : " Moving the elephants to a sanctuary provides temporary relief to villagers. However, the sanctuary becomes overcrowded, leading to environmental stress and resource depletion. The crisis shifts, creating new issues at the sanctuary.";

  return (
    <div style={styles.container}>
      <div style={styles.backgroundImage}>
        <div style={styles.choices}>
          <div
            onClick={() => handleChoiceClick("Choice 1")}
            style={styles.choice}
          >
            1. Install Electric Fences Around Villages
          </div>
          <div
            onClick={() => handleChoiceClick("Choice 2")}
            style={styles.choice}
          >
            2.Relocate Elephants to a Sanctuary
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
        <button style={styles.exitButton} onClick={handleExitClick}>
          Exit
        </button>
      </div>
    </div>
  );
};

export default ToChoose2;
