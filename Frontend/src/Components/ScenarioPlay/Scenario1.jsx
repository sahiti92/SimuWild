import React, { useState, useEffect } from "react";
import "./Scenario.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { getUserFromStorage } from "../../utils/getUser";
const Scenario1 = () => {
  // const [progressExists, setProgressExists] = useState(false);
  const navigate = useNavigate();
  const scenarioId = 1;
  const [shouldIncrement, setShouldIncrement] = useState(false);

  useEffect(() => {
    const checkProgress = async () => {
      try {
        const token = getUserFromStorage();
        const response = await axios.get(
          "http://localhost:8001/api/v1/progress",
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const progress = response.data;
        const scenarioProgress = progress.find(
          (item) => item.scenarioId === scenarioId
        );
        if (scenarioProgress && scenarioProgress.counter === 0) {
          setShouldIncrement(true);
        }
        console.log("sp");
        console.log(scenarioProgress.counter);
      } catch (error) {
        console.error("Error fetching progress:", error);
      }
    };

    checkProgress();
  }, [scenarioId]);

  const handlePlayButtonClick = async () => {
    try {
      const token = getUserFromStorage();

      // Only call increment API if shouldIncrement is true
      if (shouldIncrement) {
        const response = await axios.post(
          "http://localhost:8001/api/v1/progress/increment-counter",
          { scenarioId },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        console.log(response.data.message); // Display response message
      }
    } catch (error) {
      console.error("Error incrementing counter:", error);
    }
    navigate("/eleph");
  };

  const handleRestartButtonClick = () => {
    axios
      .delete(`/api/progress/reset`, { withCredentials: true })
      .then(() => {
        setProgressExists(false); // Reset local state
        navigate("/eleph");
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

          <button className="small-play-button" onClick={handlePlayButtonClick}>
            Play
          </button>
        </div>
      </div>
    </div>
  );
};

export default Scenario1;
