import React, { useState, useEffect } from "react";
import "./Scenario.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Scenario1 = () => {
  const [progressExists, setProgressExists] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch user's progress to check if the scenario has been started
    axios
      .get("/api/progress", { withCredentials: true })
      .then((response) => {
        // Check if there’s any progress for ScenarioId 1
        const scenarioProgress = response.data.find((p) => p.ScenarioId === 1);
        setProgressExists(!!scenarioProgress);
      })
      .catch((error) => {
        console.error("Error fetching scenario progress:", error);
      });
  }, []);

  const handlePlayButtonClick = () => {
    navigate("/anim");
  };

  const handleContinueButtonClick = () => {
    navigate("/anim/continue");
  };

  const handleRestartButtonClick = () => {
    axios
      .delete(`/api/progress/reset`, { withCredentials: true })
      .then(() => {
        setProgressExists(false); // Reset local state
        navigate("/anim");
      })
      .catch((error) => {
        console.error("Error resetting progress:", error);
      });
  };

  return (
    <div className="scenario-container">
      <div className="image-container">
        <img
          className="scenario-image"
          src="https://hatibondhu.org/assets/img/hec.jpg"
          alt="Elephants foraging in a human settlement in Assam, damaging crops and homes"
        />
        <div className="overlay">
          <h1 className="scenario-title">Human-Elephant Conflict in Assam</h1>
          <p>
            {" "}
            In Assam's Sonitpur district, the destruction of natural habitats
            due to deforestation has led elephants to forage in human
            settlements, resulting in significant damage to crops and homes. In
            2020, elephants in this region trampled through villages and farms,
            seeking food, leading to the destruction of over 200 hectares of
            crops and the death of both humans and elephants. The expansion of
            tea plantations and infrastructure projects has fragmented the
            elephant corridors, cutting off traditional migration paths, forcing
            elephants into villages and farmlands. In retaliation, locals resort
            to violent measures, including electric fences, which lead to more
            elephant deaths.
          </p>
          {progressExists ? (
            <>
              <button
                className="small-continue-button"
                onClick={handleContinueButtonClick}
              >
                Continue
              </button>
              <button
                className="small-restart-button"
                onClick={handleRestartButtonClick}
              >
                Restart
              </button>
            </>
          ) : (
            <button
              className="small-play-button"
              onClick={handlePlayButtonClick}
            >
              Play
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Scenario1;
