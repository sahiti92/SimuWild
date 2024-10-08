import React, { useState, useEffect } from "react";
import Papa from "papaparse";
import { useNavigate } from "react-router-dom"; // Import navigation hook
import "./watchpage.css";
const SpeciesInfo = () => {
  const [speciesData, setSpeciesData] = useState({
    nearThreatened: [],
  });
  const [showAll, setShowAll] = useState(false); // Manage visibility of all species info
  const navigate = useNavigate(); // Initialize navigation

  // Path to your CSV files (replace with actual paths)
  const csvPaths = {
    nearThreatened: "../../../Near Threatened.csv",
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
  const handleSpeciesClick = (species) => {
    navigate(`/species/${encodeURIComponent(species.scientificName)}`);
  };

  // Toggle visibility of all species information
  const handleExploreClick = () => {
    setShowAll((prev) => !prev);
  };

  return (
    <div className="species-info">
      <h1>Species Information</h1>
      <button onClick={handleExploreClick}>
        {showAll ? "Hide All" : "Explore All Species"}
      </button>

      {showAll && (
        <div>
          {Object.entries(speciesData).map(([category, speciesList]) => (
            <div key={category}>
              <h2>{category.replace(/([A-Z])/g, " $1").toUpperCase()}</h2>
              {speciesList.length > 0 ? (
                <ul>
                  {speciesList.map((species, index) => (
                    <li
                      key={index}
                      onClick={() => handleSpeciesClick(species)} // Navigate to details page
                      style={{
                        cursor: "pointer",
                        color: "white",
                        fontSize: "16px",
                        fontWeight: "bold",
                        fontfamily: "Lato",
                      }}
                    >
                      {species.scientificName}
                    </li>
                  ))}
                </ul>
              ) : (
                <p>
                  Loading {category.replace(/([A-Z])/g, " $1").toLowerCase()}{" "}
                  data...
                </p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SpeciesInfo;
