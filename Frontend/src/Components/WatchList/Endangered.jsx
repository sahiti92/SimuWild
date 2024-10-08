import React, { useState, useEffect } from "react";
import Papa from "papaparse";
import { useNavigate } from "react-router-dom"; // Import navigation hook
import "./watchpage.css";

const Endangered = () => {
  const [speciesData, setSpeciesData] = useState({
    endangered: [],
  });
  const [showAll, setShowAll] = useState(false); // Manage visibility of all species info
  const [activeSpeciesIndex, setActiveSpeciesIndex] = useState(null); // Track the active species
  const navigate = useNavigate(); // Initialize navigation

  // Path to your CSV files (replace with actual paths)
  const csvPaths = {
    endangered: "../../../Endangered.csv",
  };

  // Fetch and parse CSV
  const fetchSpeciesData = async (category) => {
    try {
      const response = await fetch(csvPaths[category]);
      const csvText = await response.text();
      Papa.parse(csvText, {
        header: true,
        complete: (result) => {
          setSpeciesData((prevData) => ({
            ...prevData,
            [category]: result.data,
          }));
        },
        error: (error) => {
          console.error(`Error parsing CSV for ${category}: `, error);
        },
      });
    } catch (error) {
      console.error(`Error fetching CSV file for ${category}: `, error);
    }
  };

  useEffect(() => {
    Object.keys(csvPaths).forEach((category) => {
      fetchSpeciesData(category);
    });
  }, []);

  // Handle click to navigate to the species detail page
  const handleSpeciesClick = (species, index) => {
    setActiveSpeciesIndex(index); // Set the active index
    navigate(`/species/${encodeURIComponent(species.scientificName)}`);
  };

  // Toggle visibility of all species information
  const handleExploreClick = () => {
    setShowAll((prev) => !prev);
  };

  return (
    <div className="species-info">
      <h1 style={{ color: '#FFDF6C', fontSize: '3em', fontFamily: 'Montserrat, sans-serif' }}>
        Species Information
      </h1>

      <div>
        {Object.entries(speciesData).map(([category, speciesList]) => (
          <div key={category}>
            <h2 style={{ color: '#FFCF58', fontSize: '2em' }}>
              {category.replace(/([A-Z])/g, " $1").toUpperCase()}
            </h2>
            {speciesList.length > 0 ? (
              <ul style={{ display: "flex", flexWrap: "wrap", listStyleType: "none", padding: "0", margin: "0" }}>
                {speciesList.map((species, index) => (
                  <li
                    key={index}
                    onClick={() => handleSpeciesClick(species, index)} // Pass index to handleSpeciesClick
                    style={{
                      cursor: "pointer",
                      fontSize: "16px",
                      fontWeight: "bold",
                      fontFamily: "Lato",
                      margin: "5px",
                      padding: "10px",
                      backgroundColor: activeSpeciesIndex === index ? "lightblue" : "#f0f0f0", // Change color if active
                      borderRadius: "5px",
                      flexBasis: "calc(20% - 10px)", // 20% width per item, subtracting margin
                      textAlign: "center",
                      transition: "background-color 0.3s ease", // Smooth transition for background color
                    }}
                  >
                    {species.scientificName}
                  </li>
                ))}
              </ul>
            ) : (
              <p>
                Loading {category.replace(/([A-Z])/g, " $1").toLowerCase()} data...
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Endangered;
