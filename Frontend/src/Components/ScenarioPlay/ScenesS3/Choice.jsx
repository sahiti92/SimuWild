import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { getUserFromStorage } from "../../../utils/getUser";

const ToChoose = () => {
  const [selectedChoice, setSelectedChoice] = useState("");
  const [showOutcomeScene, setShowOutcomeScene] = useState(false);
  const navigate = useNavigate();

  // Get the token from storage
  const token = getUserFromStorage();
  console.log(token);

  const handleChoiceClick = (choice) => {
    setSelectedChoice(choice);
    setShowOutcomeScene(false);

    // Navigate to the respective page based on choice
    if (choice === "Choice 1") {
      navigate("/outcome1S3");
    } else if (choice === "Choice 2") {
      navigate("/outcome2S3");
    }
  };

  const handleShowOutcomeClick = () => {
    setShowOutcomeScene(true);
  };

  const handleRestartClick = async () => {
    try {
      console.log("Resetting progress");
      const scenarioId = 5;
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
    } catch (error) {
      console.error("Error resetting progress:", error);
      alert(
        "Failed to reset progress: " +
          (error.response?.data?.error || "Unknown error")
      );
    }
    navigate("/scenarios");
  };

  const styles = {
    // Styles as defined previously
    container: {
      position: "relative",
      width: "100%",
      height: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    backgroundImage: {
      backgroundImage: "url('/rhinobg.png')",
      backgroundSize: "cover",
      backgroundPosition: "center",
      opacity: 0.8,
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
      boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.9)",
      transition: "transform 0.2s",
      color: "black",
      fontWeight:"600",
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
  const handleExitClick = () => {
    navigate("/scenarios");
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
           Take help pf armed rangers to stop poaching.
          </div>
          <div
            onClick={() => handleChoiceClick("Choice 2")}
            style={styles.choice}
          >
            Ignore the problems and continue with community development in the
            area.
          </div>
        </div>

        {selectedChoice && (
          <div style={styles.outcome}>
            <p>{outcomeText}</p>
            <button onClick={handleShowOutcomeClick}>Show Outcome Scene</button>
          </div>
        )}

<button onClick={handleRestartClick}
        style={{
          position: "absolute",
          top: "10px",
          left: "10px",
          padding: "10px 15px",
          backgroundColor: "rgba(0, 0, 0, 0.8)",
          color: "#fff",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
          zIndex: 1,
        }}
      >
        ReStart 
      </button>
      <button onClick={handleExitClick}
        style={{
          position: "absolute",
          top: "10px",
          right: "10px",
          padding: "10px 15px",
          backgroundColor: "rgba(0, 0, 0, 0.8)",
          color: "#fff",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
          zIndex: 1,
        }}
      >
        Save & exit 
      </button>
      </div>
    </div>
  );
};

export default ToChoose;