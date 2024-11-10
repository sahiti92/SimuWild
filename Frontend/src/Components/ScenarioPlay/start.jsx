import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './start.css';
import axios from 'axios';

const SliderComponent = ({ backgroundImage }) => {
  const [sliderValue, setSliderValue] = useState(0);
  const navigate = useNavigate();

  const handleSliderChange = (e) => {
    const value = e.target.value;
    setSliderValue(value);
    
    // Redirect to a new page when the slider reaches the end
    if (value >= 100) {
      navigate('/choose');
    }
  };

  return (
    <div 
      className="background" 
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className="card">
        <p className="slider-description">
        Kaziranga National Park, home to the endangered one-horned rhino, faces a serious threat from poaching. Despite efforts to protect the animals, poachers often manage to evade detection, putting both wildlife and local communities at risk.

        In this experience, you'll explore different choices that could impact the park. Will strict patrols by armed rangers stop poaching, or will a community-centered approach work better?

        Click 'Start' to begin and see how each choice shapes the future of Kaziranga's rhinos and their habitat.
        </p>
        
        <div className="slider-container">
          <span className="start-text">Start</span>
          <input 
            type="range" 
            min="0" 
            max="100" 
            value={sliderValue} 
            className="slider" 
            onChange={handleSliderChange} 
          />
        </div>
      </div>
    </div>
  );
};

export default SliderComponent;
