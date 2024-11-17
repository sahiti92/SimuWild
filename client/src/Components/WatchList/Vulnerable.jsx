import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./watchpage.css";

// Importing images with updated names (vn1 to vn10)
import cnemaspisIndraneildasii from "../../assets/vn1.jpg";
import oligodonBrevicauda from "../../assets/vn2.jpg";
import melanophidiumBilineatum from "../../assets/vn3.jpg";
import uropeltisPhipsonii from "../../assets/vn4.jpg";
import cnemaspisJerdonii from "../../assets/vn5.jpg";
import cnemaspisIndica from "../../assets/vn6.jpg";
import ophiophagusHannah from "../../assets/vn7.jpg";
import elapheTaeniura from "../../assets/vn8.jpg";
import cnemaspisOtai from "../../assets/vn9.jpg";
import hemidactylusAlbofasciatus from "../../assets/vn10.jpg";

const Vulnerable = () => {
  const [activeSpeciesIndex, setActiveSpeciesIndex] = useState(null);
  const [pressedIndex, setPressedIndex] = useState(null);  // Track which item is being pressed
  const navigate = useNavigate();

  // Hardcoded species data with local image paths and updated species names
  const speciesData = [
    { scientificName: "Cnemaspis indraneildasii", commonName: "Indranil’s Gecko", image: cnemaspisIndraneildasii },
    { scientificName: "Oligodon brevicauda", commonName: "Short-tailed Kukri Snake", image: oligodonBrevicauda },
    { scientificName: "Melanophidium bilineatum", commonName: "Two-lined Black Shield Snake", image: melanophidiumBilineatum },
    { scientificName: "Uropeltis phipsonii", commonName: "Phipson’s Earth Snake", image: uropeltisPhipsonii },
    { scientificName: "Cnemaspis jerdonii", commonName: "Jerdon’s Gecko", image: cnemaspisJerdonii },
    { scientificName: "Cnemaspis indica", commonName: "Indian Gecko", image: cnemaspisIndica },
    { scientificName: "Ophiophagus hannah", commonName: "King Cobra", image: ophiophagusHannah },
    { scientificName: "Elaphe taeniura", commonName: "Striped Rat Snake", image: elapheTaeniura },
    { scientificName: "Cnemaspis otai", commonName: "Otai’s Gecko", image: cnemaspisOtai },
    { scientificName: "Hemidactylus albofasciatus", commonName: "White-banded Gecko", image: hemidactylusAlbofasciatus },
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
        Vulnerable Species Information
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

export default Vulnerable;
