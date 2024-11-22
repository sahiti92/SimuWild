import React, { useEffect, useState } from "react";
import "./Scenario.css";
import axios from "axios";
import { getUserFromStorage } from "../../utils/getUser";
import { useNavigate } from "react-router-dom";

const Scenario5 = () => {
  const scenarioId = 5;
  const navigate = useNavigate();
  const [shouldIncrement, setShouldIncrement] = useState(false);

  useEffect(() => {
    const checkProgress = async () => {
      try {
        const token = getUserFromStorage();
        const response = await axios.get(
          //  "http://localhost:10000/api/v1/progress",
          "https://simuwild.onrender.com//api/v1/progress",
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

        if (scenarioProgress) {
          // Check if counter is 0 to decide on increment
          if (scenarioProgress.counter === 0) {
            setShouldIncrement(true);
          }
        }
      } catch (error) {
        console.error("Error fetching progress:", error);
      }
    };

    checkProgress();
  }, [scenarioId]);

  const handleClick = async () => {
    // try {
    //   const token = getUserFromStorage();
    //   if (shouldIncrement) {
    //     const incrementResponse = await axios.post(
    //       // "http://localhost:10000/api/v1/progress/increment-counter",
    //       "https://simuwild.onrender.com/api/v1/progress/increment-counter",
    //       { scenarioId },
    //       {
    //         headers: {
    //           "Content-Type": "application/json",
    //           Authorization: `Bearer ${token}`,
    //         },
    //       }
    //     );
    //     console.log("Counter incremented:", incrementResponse.data.message);
    //   }
    //   // Fetch progress to check the current counter and choices
    //   const response = await axios.get(
    //     //"http://localhost:10000/api/v1/progress",
    //     "https://simuwild.onrender.com/api/v1/progress",
    //     {
    //       headers: {
    //         "Content-Type": "application/json",
    //         Authorization: `Bearer ${token}`,
    //       },
    //     }
    //   );

    //   const progress = response.data;
    //   const scenarioProgress = progress.find(
    //     (item) => item.scenarioId === scenarioId
    //   );

    //   if (scenarioProgress) {
    //     const { counter, choices } = scenarioProgress;

    //     // Navigate based on counter value
    //     if (counter === 1) {
    //       navigate("/threeScene");
    //     } else if (counter === 2) {
    //       navigate("/tochoose");
    //     } else {
    //       // Further checks for choices
    //       switch (choices) {
    //         case 1:
    //           navigate("/outcome1s5");
    //           break;
    //         case 2:
    //           navigate("/outcome1s5");
    //           break;
    //         case 3:
    //           navigate("/outcome2s5");
    //           break;
    //         case 4:
    //           navigate("/outcome22s5");
    //           break;
    //         default:
    //           console.warn("Unexpected choice value:", choices);
    //       }
    //     }
    //   } else {
    //     console.warn("No progress found for this scenario.");
    //   }

    //   // Increment the counter only if shouldIncrement is true
    // } catch (error) {
    //   console.error(
    //     "Error handling navigation or incrementing counter:",
    //     error
    //   );
    // }

    navigate("/threeScene");
  };

  return (
    <div className="scenario-container">
      <div className="image-container">
        <img
          className="scenario-image"
          src="https://c4.wallpaperflare.com/wallpaper/861/749/290/wildlife-tiger-bengal-tiger-wilderness-wallpaper-preview.jpg"
          alt="Bengal tiger in the Sundarbans"
        />
        <div className="overlay">
          <h1 className="scenario-title">
            The Threat to Bengal Tigers in the Sundarbans
          </h1>
          <p className="scenario-description">
            The Bengal tiger population in the Sundarbans, the largest mangrove
            forest in the world, is under threat from rising sea levels due to
            climate change and habitat destruction. In 2019, several tigers were
            reported to have moved into villages, attacking livestock and people
            as their habitat shrank. The Sundarbans faces both ecological and
            human-induced pressures. The rise in sea levels has submerged parts
            of the forest, reducing the tigers' habitat. At the same time,
            illegal timber logging and deforestation further fragment their
            territory. In 2019, tiger-related attacks on humans peaked, leading
            to a public outcry.
          </p>
          <button className="small-play-button" onClick={handleClick}>
            Play
          </button>
        </div>
      </div>
    </div>
  );
};

export default Scenario5;
