import React from 'react';
import './Scenario.css'; // Make sure this CSS file is correctly linked

const Scenario2 = () => {
  return (
    <div className="scenario-container">
      <div className="image-container">
        <img
          className="scenario-image"
          src="https://rhinos.org/wp-content/uploads/2024/07/1720542345016.jpeg"
          alt="Kaziranga National Park and Poaching of the one-horned rhino"
        />
        <div className="overlay">
          <h1 className="scenario-title">Kaziranga National Park and Poaching of the One-Horned Rhino</h1>
          <p className="scenario-description">
          Kaziranga National Park in Assam, home to over two-thirds of the world’s population of one-horned rhinoceros, has long battled the threat of poaching. In 2016, there was an alarming rise in poaching incidents, where more than 17 rhinos were killed for their horns, despite anti-poaching measures in place. The illegal wildlife trade, particularly the demand for rhino horns in East Asia for traditional medicine, drives poaching. Poachers often cross the Brahmaputra River during floods to target rhinos, taking advantage of the challenging terrain and the park’s proximity to international borders.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Scenario2;
