import React from 'react';
import './Watchlist.css'; // Import the CSS file

const Watchlist = () => {
  const species = [
    { img: '/assam_roofed_turtle.png', },
    { img: '/Muskdeer.jpg', },
    { img: '/Shark.png' },
    { img: '/Elephant.jpg'},
    { img: '/assam_roofed_turtle.png'},
    { img: '/assam_roofed_turtle.png' }
   
  ];

  return (
    <div className="grid-container">
      {species.map((specie, index) => (
        <div key={index} className="grid-item">
          <img src={specie.img} alt={specie.name} />
          <div className="species-name">{specie.name}</div>
        </div>
      ))}
    </div>
  );
};

export default Watchlist;
