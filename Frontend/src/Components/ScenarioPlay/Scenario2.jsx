import React from 'react';
import './Scenario.css'; 
import { useNavigate } from 'react-router-dom';
const Scenario2 = () => {
  const navigate =  useNavigate();
  return (
    <div className="scenario-container">
      <div className="image-container">
        <img
          className="scenario-image"
          src="https://t3.ftcdn.net/jpg/06/61/07/06/360_F_661070665_QykUihBeWNCNuCmT0N0NI4wYvl68NzgC.jpg"
          alt="Kaziranga National Park and Poaching of the one-horned rhino"
        />
        <div className="overlay">
          <h1 className="scenario-title">
            Kaziranga National Park and Poaching of the One-Horned Rhino
          </h1>
          <p className="scenario-description">
            Kaziranga National Park in Assam, home to over two-thirds of the
            world’s population of one-horned rhinoceros, has long battled the
            threat of poaching. In 2016, there was an alarming rise in poaching
            incidents, where more than 17 rhinos were killed for their horns,
            despite anti-poaching measures in place. The illegal wildlife trade,
            particularly the demand for rhino horns in East Asia for traditional
            medicine, drives poaching. Poachers often cross the Brahmaputra
            River during floods to target rhinos, taking advantage of the
            challenging terrain and the park’s proximity to international
            borders.
          </p>
          <button className="small-play-button" onClick={() => navigate("../../startS3")}>Play</button>
        </div>
      </div>
    </div>
  );
};

export default Scenario2;
