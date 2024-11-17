import React, { useState } from "react";
import "./ScenarioHomePage.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { getUserFromStorage } from "../../utils/getUser";
const ScenarioHomePage = () => {
  const [backgroundImage, setBackgroundImage] = useState(
    "https://hatibondhu.org/assets/img/hec.jpg"
  );
  const [heading, setHeading] = useState("Human-Elephant Conflict");
  const [description, setDescription] = useState(
    "Human-elephant conflict in India often arises due to habitat loss."
  );
  const navigate = useNavigate();
  const [pageLink, setPageLink] = useState("./scenario1");
  const [headingKey, setHeadingKey] = useState(0);

  const changeBackground = (image, newHeading, newDescription, newPageLink) => {
    setBackgroundImage(image);
    setHeading(newHeading);
    setDescription(newDescription);
    setHeadingKey((prevKey) => prevKey + 1);
    setPageLink(newPageLink);
  };
  async function getCounterByScenario(scenarioId) {
    try {
      const token = getUserFromStorage();
      const response = await axios.get(
        // "http://localhost:10000/api/v1/progress",
        "https://simuwild.onrender.com/api/v1/progress",
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const progressData = response.data;
      const scenarioProgress = progressData.find(
        (progress) => progress.scenarioId === scenarioId
      );
      if (scenarioProgress) {
        console.log("Counter value:", scenarioProgress.counter);
        return scenarioProgress.counter;
      } else {
        console.log("No progress found for the specified scenarioId");
        return null;
      }
    } catch (error) {
      console.error("Error fetching progress data:", error);
      return null;
    }
  }
  const goToPage = () => {
    navigate(pageLink);
  };
  return (
    <div className="app">
      <div
        className="background"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      ></div>

      <div key={headingKey} className="heading-container">
        {heading}
        <p className="subscript">{description}</p>
      </div>
      <button className="play-button" onClick={goToPage}>
        Play to Know More
      </button>

      <div className="image-gallery">
        <img
          src="https://wildlifesos.org/wp-content/uploads/2020/03/home-leopard-july.jpg"
          alt="Image 6"
          className="thumbnail"
          onMouseEnter={() =>
            changeBackground(
              "https://wildlifesos.org/wp-content/uploads/2020/03/home-leopard-july.jpg",
              "Leopard in India",
              "In the urban jungle, who is the real intruder—humans or leopards?",
              "./scenario3"
            )
          }
          onClick={() =>
            changeBackground(
              "https://wildlifesos.org/wp-content/uploads/2020/03/home-leopard-july.jpg",
              "Leopard in India",
              "In the urban jungle, who is the real intruder—humans or leopards?",
              "./scenario3"
            )
          }
        />
        <img
          src="https://hatibondhu.org/assets/img/hec.jpg"
          alt="Image 1"
          className="thumbnail"
          onMouseEnter={() =>
            changeBackground(
              "https://hatibondhu.org/assets/img/hec.jpg",
              "Human-Elephant Conflict",
              "When giants lose their homes, can coexistence be the key to survival?",
              "./scenario1"
            )
          }
          onClick={() =>
            changeBackground(
              "https://hatibondhu.org/assets/img/hec.jpg",
              "Human-Elephant Conflict",
              "When giants lose their homes, can coexistence be the key to survival?",
              "./scenario1"
            )
          }
        />

        <img
          src="https://t3.ftcdn.net/jpg/06/61/07/06/360_F_661070665_QykUihBeWNCNuCmT0N0NI4wYvl68NzgC.jpg"
          alt="Image 4"
          className="thumbnail"
          onMouseEnter={() =>
            changeBackground(
              "https://t3.ftcdn.net/jpg/06/61/07/06/360_F_661070665_QykUihBeWNCNuCmT0N0NI4wYvl68NzgC.jpg",
              "Rhino Conservation",
              "As poaching rises, can the rhino's ancient home still offer refuge?",
              "./scenario2"
            )
          }
          onClick={() =>
            changeBackground(
              "https://rhinos.org/wp-content/uploads/2024/07/1720542345016.jpeg",
              "Rhino Conservation",
              "As poaching rises, can the rhino's ancient home still offer refuge?",
              "./Scenario2"
            )
          }
        />
        <img
          src="https://c4.wallpaperflare.com/wallpaper/861/749/290/wildlife-tiger-bengal-tiger-wilderness-wallpaper-preview.jpg"
          alt="Image 5"
          className="thumbnail"
          onMouseEnter={() =>
            changeBackground(
              "https://c4.wallpaperflare.com/wallpaper/861/749/290/wildlife-tiger-bengal-tiger-wilderness-wallpaper-preview.jpg",
              "Sundarban Tiger",
              "As the seas rise, will the Sundarbans’ last tigers sink or survive?",
              "./scenario5"
            )
          }
          onClick={() =>
            changeBackground(
              "https://c4.wallpaperflare.com/wallpaper/861/749/290/wildlife-tiger-bengal-tiger-wilderness-wallpaper-preview.jpg",
              "Sundarban Tiger",
              "As the seas rise, will the Sundarbans’ last tigers sink or survive?",
              "./Scenario5"
            )
          }
        />
      </div>
    </div>
  );
};

export default ScenarioHomePage;
