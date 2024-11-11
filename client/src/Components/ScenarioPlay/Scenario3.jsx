import React from 'react';
import './Scenario.css';

const Scenario3 = () => {
  return (
    <div className="scenario-container">
      <div className="image-container">
        <img
          className="scenario-image"
          src="https://wildlifesos.org/wp-content/uploads/2020/03/home-leopard-july.jpg"
          alt="Human-leopard encounters in urban Maharashtra"
        />
        <div className="overlay">
          <h1 className="scenario-title">Human-Leopard Encounters in Maharashtra</h1>
          <p className="scenario-description">
          Maharashtra has witnessed frequent encounters between humans and leopards due to urban encroachment into forests. In 2020, several incidents were reported where leopards strayed into the city of Mumbai, particularly in the Aarey Milk Colony and Sanjay Gandhi National Park areas, resulting in attacks on humans and pets. Rapid urbanization has diminished the leopards’ habitat, forcing them into closer contact with humans. In one specific case, a leopard killed a toddler in the Aarey Colony, triggering panic among the locals. Despite being natural predators, leopards have adapted to urban environments, complicating human-wildlife coexistence.
          </p>
          <button className="small-play-button">Play</button>
        </div>
      </div>
    </div>
  );
};

export default Scenario3;
