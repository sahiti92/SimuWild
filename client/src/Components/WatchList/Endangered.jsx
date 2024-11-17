import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./watchpage.css";

// Importing images
import melanochelys from "../../assets/en1.jpg";
import eutropis from "../../assets/en2.jpg";
import dasia from "../../assets/en3.jpg";
import cnemaspisGoaensis from "../../assets/en4.jpg";
import cnemaspisWynadensis from "../../assets/en5.jpg";
import ahaetulla from "../../assets/en6.jpg";
import rhinophis from "../../assets/en7.jpg";
import eurylepis from "../../assets/en8.jpg";
import otocryptis from "../../assets/en9.jpg";
import hemidactylus from "../../assets/en10.jpg";


const Endangered = () => {  // Changed from Critically_Endangered to Endangered
  const [activeSpeciesIndex, setActiveSpeciesIndex] = useState(null);
  const [pressedIndex, setPressedIndex] = useState(null);  // Track which item is being pressed
  const navigate = useNavigate();

  // Updated species data with new common names and corresponding images
  const speciesData = [
    { scientificName: "Melanochelys tricarinata", commonName: "Three-keeled Turtle", image: melanochelys },
    { scientificName: "Eutropis clivicola", commonName: "Jerdon's Smooth Lizard", image: eutropis },
    { scientificName: "Dasia subcaerulea", commonName: "Blue-tailed Skink", image: dasia },
    { scientificName: "Cnemaspis goaensis", commonName: "Goa Gecko", image: cnemaspisGoaensis },
    { scientificName: "Cnemaspis wynadensis", commonName: "Wayanad Gecko", image: cnemaspisWynadensis },
    { scientificName: "Ahaetulla perroteti", commonName: "Green Vine Snake", image: ahaetulla },
    { scientificName: "Rhinophis travancoricus", commonName: "Shield-tailed Snake", image: rhinophis },
    { scientificName: "Eurylepis poonaensis", commonName: "Poona Lizard", image: eurylepis },
    { scientificName: "Otocryptis beddomii", commonName: "Flap-necked Lizard", image: otocryptis },
    { scientificName: "Hemidactylus scabriceps", commonName: "Termite Gecko", image: hemidactylus },
  ];

  const handleSpeciesClick = (species, index) => {
    setActiveSpeciesIndex(index);
    navigate(`/species/${encodeURIComponent(species.scientificName)}`);
  };

  return (
    <div className="species-info">
      <h1
        style={{
          color: "#FFDF6C",
          fontSize: "3em",
          fontFamily: "Montserrat, sans-serif",
        }}
      >
        Endangered Species Information  {/* Changed from "Critically Endangered" to "Endangered" */}
      </h1>

      <div>
        <ul
          style={{
            display: "flex",
            flexWrap: "wrap",
            listStyleType: "none",
            padding: "0",
            margin: "0",
          }}
        >
          {speciesData.map((species, index) => (
            <li
              key={index}
              onClick={() => handleSpeciesClick(species, index)}
              onMouseDown={() => setPressedIndex(index)}  // Set pressed state when clicked
              onMouseUp={() => setPressedIndex(null)}  // Reset pressed state after release
              onMouseLeave={() => setPressedIndex(null)}  // Reset pressed state when mouse leaves
              style={{
                cursor: "pointer",
                fontSize: "20px",
                fontWeight: "bold",
                fontFamily: "Lato",
                margin: "10px",
                padding: "15px",
                backgroundColor: activeSpeciesIndex === index ? "lightblue" : "#f0f0f0",
                borderRadius: "10px",
                flexBasis: "calc(50% - 20px)",
                textAlign: "center",
                transition: "background-color 0.3s ease, transform 0.2s ease",
                transform:
                  activeSpeciesIndex === index
                    ? "scale(1.05)"  // Slightly enlarge the active species
                    : pressedIndex === index
                    ? "scale(0.9)"   // Scale down when clicked
                    : "scale(1)",    // Default size
              }}
            >
              <img
                src={species.image || "https://via.placeholder.com/100"}
                alt={species.scientificName}
                style={{
                  width: "500px", // Set a fixed width for all images
                  height: "300px", // Set a fixed height for all images
                  objectFit: "cover", // Ensures the image covers the box without distortion
                  borderRadius: "8px",
                  marginBottom: "10px",
                }}
              />
              <p>{species.scientificName}</p>
              <p style={{ fontSize: "14px", color: "#888" }}>
                {species.commonName}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Endangered;
