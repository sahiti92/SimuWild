import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate for routing
import axios from "axios";
import { getUserFromStorage } from "../../../utils/getUser";

const ToChoose1 = () => {
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
      navigate("/eleph11");
    } else if (choice === "Choice 2") {
      navigate("/eleph12");
    }
  };

  const handleShowOutcomeClick = () => {
    setShowOutcomeScene(true);
  };

  

  const handleRestartClick = async () => {
    try {
      console.log("Resetting progress");
      const scenarioId = 1;
      await axios.post(
        "http://localhost:8001/api/v1/progress/reset",
        { scenarioId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setSelectedChoice("");
      setShowOutcomeScene(false);
      alert("Progress has been reset.");
      navigate("/eleph")
    } catch (error) {
      console.error("Error resetting progress:", error);
      alert(
        "Failed to reset progress: " +
          (error.response?.data?.error || "Unknown error")
      );
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
      ? " The elephants lose their natural habitat and start wandering into nearby villages in search of food, damaging crops, homes."
      : " Wildlife stays within their designated areas, preventing conflict with human settlements. However, the local economy experiences a slowdown due to limited expansion of agriculture and industry";

  return (
    <div style={styles.container}>
      <div style={styles.backgroundImage}>
        <div style={styles.choices}>
          <div
            onClick={() => handleChoiceClick("Choice 1")}
            style={styles.choice}
          >
            1.Support continued deforestation for economic development
          </div>
          <div
            onClick={() => handleChoiceClick("Choice 2")}
            style={styles.choice}
          >
            2.Stop deforestation
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
          Save and Exit
        </button>
      </div>
    </div>
  );
};

export default ToChoose1;
