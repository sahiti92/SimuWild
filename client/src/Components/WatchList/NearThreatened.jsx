import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./watchpage.css";

// Importing images with updated names (nt1 to nt10)
import NajaOxiana from "../../assets/nt1.jpg";
import EryxJohnii from "../../assets/nt2.jpg";
import HemidactylusAnamallensis from "../../assets/nt3.jpg";
import CnemaspisSisparensis from "../../assets/nt4.jpg";
import CnemaspisHeteropholis from "../../assets/nt5.jpg";
import CnemaspisNairi from "../../assets/nt6.jpg";
import TrimeresurusMacrolepis from "../../assets/nt7.jpg";
import EryxWhitakeri from "../../assets/nt8.jpg";
import CnemaspisOrnata from "../../assets/nt9.jpg";
import EryxConicus from "../../assets/nt10.png";

const SpeciesInfo = () => {
  const [activeSpeciesIndex, setActiveSpeciesIndex] = useState(null);
  const [pressedIndex, setPressedIndex] = useState(null); // Track which item is being pressed
  const navigate = useNavigate();

  // Hardcoded species data with local image paths and updated species names
  const speciesData = [
    {
      scientificName: "Naja oxiana",
      commonName: "Oxian Cobra",
      image: NajaOxiana,
    },
    {
      scientificName: "Eryx johnii",
      commonName: "John's Sand Boa",
      image: EryxJohnii,
    },
    {
      scientificName: "Hemidactylus anamallensis",
      commonName: "Anamalai Lizard",
      image: HemidactylusAnamallensis,
    },
    {
      scientificName: "Cnemaspis sisparensis",
      commonName: "Sispara Lizard",
      image: CnemaspisSisparensis,
    },
    {
      scientificName: "Cnemaspis heteropholis",
      commonName: "Mixed Scale Gecko",
      image: CnemaspisHeteropholis,
    },
    {
      scientificName: "Cnemaspis nairi",
      commonName: "Nair's Gecko",
      image: CnemaspisNairi,
    },
    {
      scientificName: "Trimeresurus macrolepis",
      commonName: "Big Scale Viper",
      image: TrimeresurusMacrolepis,
    },
    {
      scientificName: "Eryx whitakeri",
      commonName: "Whitaker Boa",
      image: EryxWhitakeri,
    },
    {
      scientificName: "Cnemaspis ornata",
      commonName: "Ornate Gecko",
      image: CnemaspisOrnata,
    },
    {
      scientificName: "Eryx conicus",
      commonName: "Cone Boa",
      image: EryxConicus,
    },
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
        Species Information
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
              onMouseDown={() => setPressedIndex(index)} // Set pressed state when clicked
              onMouseUp={() => setPressedIndex(null)} // Reset pressed state after release
              onMouseLeave={() => setPressedIndex(null)} // Reset pressed state when mouse leaves
              style={{
                cursor: "pointer",
                fontSize: "20px",
                fontWeight: "bold",
                fontFamily: "Lato",
                margin: "10px",
                padding: "15px",
                backgroundColor:
                  activeSpeciesIndex === index ? "lightblue" : "#f0f0f0",
                borderRadius: "10px",
                flexBasis: "calc(50% - 20px)",
                textAlign: "center",
                transition: "background-color 0.3s ease, transform 0.2s ease",
                transform:
                  activeSpeciesIndex === index
                    ? "scale(1.05)" // Slightly enlarge the active species
                    : pressedIndex === index
                    ? "scale(0.9)" // Scale down when clicked
                    : "scale(1)", // Default size
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

export default SpeciesInfo;
