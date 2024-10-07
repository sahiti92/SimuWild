import React, { useState, useEffect } from "react";
import Papa from "papaparse";

const SpeciesInfo = () => {
  const [speciesData, setSpeciesData] = useState({
    endangered: [],
    criticallyEndangered: [],
    vulnerable: [],
    nearThreatened: [],
  });
  const [selectedSpecies, setSelectedSpecies] = useState(null);
  const [showAll, setShowAll] = useState(false); // Manage visibility of all species info

  // Path to your CSV files (replace with actual paths)
  const csvPaths = {
    endangered: "../../../Endangered.csv",
    criticallyEndangered: "../../../CriticallyEndangered.csv",
    vulnerable: "../../../Vulnerable.csv",
    nearThreatened: "../../../NearThreatened.csv",
  };

  // Function to fetch and parse CSV for each category
  const fetchSpeciesData = async (category) => {
    try {
      const response = await fetch(csvPaths[category]);
      const csvText = await response.text();
      // Parse the CSV file
      Papa.parse(csvText, {
        header: true, // Treat first row as headers
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

  // Fetch species data for all categories when the component mounts
  useEffect(() => {
    Object.keys(csvPaths).forEach((category) => {
      fetchSpeciesData(category);
    });
  }, []);

  // Handle click on a species to display its details
  const handleSpeciesClick = (species) => {
    setSelectedSpecies(species);
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
              <h2>{category.replace(/([A-Z])/g, ' $1').toUpperCase()}</h2>
              {speciesList.length > 0 ? (
                <ul>
                  {speciesList.map((species, index) => (
                    <li
                      key={index}
                      onClick={() => handleSpeciesClick(species)} // Handle click
                      style={{ cursor: "pointer", color: "blue" }} // Make clickable
                    >
                      {species.scientificName}
                    </li>
                  ))}
                </ul>
              ) : (
                <p>Loading {category.replace(/([A-Z])/g, ' $1').toLowerCase()} data...</p>
              )}
            </div>
          ))}
        </div>
      )}

      {selectedSpecies && (
        <div className="species-details">
          <h2>Details for {selectedSpecies.scientificName}</h2>
          <p>
            <strong>Rationale:</strong>
            <span
              dangerouslySetInnerHTML={{ __html: selectedSpecies.rationale }} // Display HTML
            ></span>
          </p>
        </div>
      )}
    </div>
  );
};

export default SpeciesInfo;
