import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { getUserFromStorage } from "../../../utils/getUser";

const ToChoose = () => {
  const [selectedChoice, setSelectedChoice] = useState("");
  const navigate = useNavigate();

  // Get the token from storage
  const token = getUserFromStorage();
  console.log(token);

  const handleChoiceClick = (choice) => {
    setSelectedChoice((prevChoice) => (prevChoice === choice ? "" : choice)); // Toggle choice
  };

  const handleSubChoiceClick = (subChoice) => {
    // Navigate to the respective page based on sub-choice
    if (subChoice === "SubChoice 1.1") {
      navigate("/outcome1s5");
    } else if (subChoice === "SubChoice 1.2") {
      navigate("/outcome1s5");
    } else if (subChoice === "SubChoice 2.1") {
      navigate("/outcome2s5");
    } else if (subChoice === "SubChoice 2.2") {
      navigate("/outcome22s5");
    }
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
      alert("Progress has been reset.");
    } catch (error) {
      console.error("Error resetting progress:", error);
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
      width: "400px",
    },
    subChoicesContainer: {
      display: "flex",
      flexDirection: "column",
      gap: "10px",
      marginTop: "10px",
      paddingLeft: "20px", // Indentation for sub-choices
      width: "300px",
      left: "40%",
    },
    subChoice: {
      padding: "15px",
      backgroundColor: "rgba(240, 240, 240, 0.9)",
      borderRadius: "5px",
      cursor: "pointer",
      boxShadow: "0px 2px 6px rgba(0, 0, 0, 0.1)",
      color: "black",
      fontFamily: "Arial, sans-serif",
      height: "40px",
      textAlign: "center",
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

  return (
    <div style={styles.container}>
      <div style={styles.backgroundImage}>
        <div style={styles.choices}>
          <div>
            <div
              onClick={() => handleChoiceClick("Choice 1")}
              style={styles.choice}
            >
              Help protect the tigers' habitat.
            </div>
            {selectedChoice === "Choice 1" && (
              <div style={styles.subChoicesContainer}>
                <div
                  onClick={() => handleSubChoiceClick("SubChoice 1.1")}
                  style={styles.subChoice}
                >
                  1.1 Work with local communities to conserve resources.
                </div>
                <div
                  onClick={() => handleSubChoiceClick("SubChoice 1.2")}
                  style={styles.subChoice}
                >
                  1.2 Focus on stricter laws for habitat protection.
                </div>
              </div>
            )}
          </div>

          <div>
            <div
              onClick={() => handleChoiceClick("Choice 2")}
              style={styles.choice}
            >
              Deforestation
            </div>
            {selectedChoice === "Choice 2" && (
              <div style={styles.subChoicesContainer}>
                <div
                  onClick={() => handleSubChoiceClick("SubChoice 2.1")}
                  style={styles.subChoice}
                >
                  2.1 Support large-scale industrial projects.
                </div>
                <div
                  onClick={() => handleSubChoiceClick("SubChoice 2.2")}
                  style={styles.subChoice}
                >
                  2.2 Allow Timber logging to continue.
                </div>
              </div>
            )}
          </div>
        </div>

        <button onClick={handleRestartClick} style={styles.restartButton}>
          Restart
        </button>
        <button
          onClick={() => navigate("/save-exit")}
          style={{
            position: "absolute",
            top: "10px",
            right: "10px",
            padding: "10px 15px",
            backgroundColor: "red",
            color: "#fff",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            zIndex: 1,
          }}
        >
          Save & Exit
        </button>
      </div>
    </div>
  );
};

export default ToChoose;
