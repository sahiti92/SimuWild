import React from 'react';
import './Scenario.css'; // Make sure this CSS file is correctly linked

const Scenario5 = () => {
  return (
    <div className="scenario-container">
      <div className="image-container">
        <img
          className="scenario-image"
          src="https://imgs.mongabay.com/wp-content/uploads/sites/20/2017/10/06125834/Sundarban-tiger.jpg"
          alt="Elephants foraging in a human settlement in Assam, damaging crops and homes"
        />
        <div className="overlay">
          <h1 className="scenario-title">Human-Elephant Conflict in Assam</h1>
          <p className="scenario-description">
            In Assam's Sonitpur district, the destruction of natural habitats due to deforestation has led elephants to forage in human settlements, resulting in significant damage to crops and homes. In 2020, elephants in this region trampled through villages and farms, seeking food, leading to the destruction of over 200 hectares of crops and the death of both humans and elephants. The expansion of tea plantations and infrastructure projects has fragmented the elephant corridors, cutting off traditional migration paths, forcing elephants into villages and farmlands. In retaliation, locals resort to violent measures, including electric fences, which lead to more elephant deaths.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Scenario5;
