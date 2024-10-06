import React from 'react';
import './Scenario.css'; // Make sure this CSS file is correctly linked

const Scenario5 = () => {
  return (
    <div className="scenario-container">
      <div className="image-container">
        <img
          className="scenario-image"
          src="https://imgs.mongabay.com/wp-content/uploads/sites/20/2017/10/06125834/Sundarban-tiger.jpg"
          alt="Bengal tiger in the Sundarbans"
        />
        <div className="overlay">
          <h1 className="scenario-title">The Threat to Bengal Tigers in the Sundarbans</h1>
          <p className="scenario-description">
          The Bengal tiger population in the Sundarbans, the largest mangrove forest in the world, is under threat from rising sea levels due to climate change and habitat destruction. In 2019, several tigers were reported to have moved into villages, attacking livestock and people as their habitat shrank. The Sundarbans faces both ecological and human-induced pressures. The rise in sea levels has submerged parts of the forest, reducing the tigers' habitat. At the same time, illegal timber logging and deforestation further fragment their territory. In 2019, tiger-related attacks on humans peaked, leading to a public outcry.
           </p>
        </div>
      </div>
    </div>
  );
};

export default Scenario5;
