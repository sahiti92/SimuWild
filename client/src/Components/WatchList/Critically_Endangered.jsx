import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./watchpage.css";

// Importing images

import poecilotheria from "../../assets/cr1.jpg";
import haematopinus from "../../assets/cr2.jpg";
import hipposideros from "../../assets/cr3.jpg";
import cremnomys from "../../assets/cr4.jpg";
import viverra from "../../assets/cr5.png";
import raorchestes from "../../assets/cr6.jpg";
import cnemaspisAdii from "../../assets/cr7.jpg";
import rhinophis from "../../assets/cr8.jpg";
import rhinoptilus from "../../assets/cr9.jpg";
import cnemaspisAnaikattiensis from "../../assets/cr10.jpg";

const Critically_Endangered = () => {
  const [activeSpeciesIndex, setActiveSpeciesIndex] = useState(null);
  const [pressedIndex, setPressedIndex] = useState(null); // Track which item is being pressed
  const navigate = useNavigate();

  // Hardcoded species data with local image paths
  const speciesData = [
    {
      scientificName: "Poecilotheria metallica",
      commonName: "Metallic Blue Tarantula",
      image: poecilotheria,
    },
    {
      scientificName: "Haematopinus oliveri",
      commonName: "Oliver's Sucking Louse",
      image: haematopinus,
    },
    {
      scientificName: "Hipposideros hypophyllus",
      commonName: "Leaf-nosed Bat",
      image: hipposideros,
    },
    {
      scientificName: "Cremnomys elvira",
      commonName: "Elvira Rat",
      image: cremnomys,
    },
    {
      scientificName: "Viverra civettina",
      commonName: "Malabar Civet",
      image: viverra,
    },
    {
      scientificName: "Raorchestes aureus",
      commonName: "Golden Tree Frog",
      image: raorchestes,
    },
    {
      scientificName: "Cnemaspis adii",
      commonName: "Adi's Day Gecko",
      image: cnemaspisAdii,
    },
    {
      scientificName: "Rhinophis goweri",
      commonName: "Gower's Shieldtail",
      image: rhinophis,
    },
    {
      scientificName: "Rhinoptilus bitorquatus",
      commonName: "Jerdon's Courser",
      image: rhinoptilus,
    },
    {
      scientificName: "Cnemaspis anaikattiensis",
      commonName: "Anaikatti Day Gecko",
      image: cnemaspisAnaikattiensis,
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
        Critically Endangered Species Information
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

export default Critically_Endangered;
