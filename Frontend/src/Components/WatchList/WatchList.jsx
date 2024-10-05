import React from "react";
import "./Watchlist.css"; // Import the CSS file

const Watchlist = () => {
  const species = [
    { img: "/assam_roofed_turtle.jpg", name: "Assam Roofed Turtle" },
    { img: "/Muskdeer.jpg", name: "Musk Deer" },
    { img: "/bear.JPG", name: "Bear" },
    { img: "/Elephant.jpg", name: "Elephant" },
    {
      img: "/Great-Indian-one-horned-rhinoceros-India.jpg",
      name: "Rhinoceros",
    },
    { img: "/Humpback_Whale.jpg", name: "Humpback Whale" },
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
