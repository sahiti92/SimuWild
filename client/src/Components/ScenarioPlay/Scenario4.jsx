import React from 'react';
import './Scenario.css'; 

const Scenario4 = () => {
  return (
    <div className="scenario-container">
      <div className="image-container">
        <img
          className="scenario-image"
          src="https://cdn.pixabay.com/photo/2023/09/03/11/48/ai-generated-8230554_1280.jpg"
          alt="The Great Indian Bustard in its natural habitat"
        />
        <div className="overlay">
          <h1 className="scenario-title">Saving the Great Indian Bustard in Rajasthan</h1>
          <p className="scenario-description">
          The Great Indian Bustard (GIB), one of the rarest bird species in the world, is critically endangered due to habitat loss and collisions with power lines. In 2021, two GIBs died in Rajasthan after colliding with power lines in the Jaisalmer desert. The area, home to the last remaining GIBs, is crisscrossed by high-voltage power lines from solar energy projects. The development of renewable energy projects in GIB habitats presents a dilemma between conservation and sustainable development. As GIBs are large and slow to take flight, they are highly vulnerable to power lines.
          </p>
          <button className="small-play-button">Play</button>
        </div>
      </div>
    </div>
  );
};

export default Scenario4;
