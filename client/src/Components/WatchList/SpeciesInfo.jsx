import React, { useState, useEffect } from "react";
import Papa from "papaparse";
import { useNavigate } from "react-router-dom";

const SpeciesInfo = () => {
  const [speciesData, setSpeciesData] = useState({
    endangered: [],
    criticallyEndangered: [],
    vulnerable: [],
    nearThreatened: [],
  });
  const [showAll, setShowAll] = useState(false); 
  const navigate = useNavigate(); 
  
  const csvPaths = {
    endangered: "../../../Endangered.csv",
    criticallyEndangered: "../../../CriticallyEndangered.csv",
    vulnerable: "../../../Vulnerable.csv",
    nearThreatened: "../../../NearThreatened.csv",
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


  const handleSpeciesClick = (species) => {
    navigate(`/species/${encodeURIComponent(species.scientificName)}`);
  };


  const handleExploreClick = () => {
    setShowAll((prev) => !prev);
  };

  return (
    <div className="species-info">
      <h1>Species Information</h1>

      <div>
        {Object.entries(speciesData).map(([category, speciesList]) => (
          <div key={category}>
            <h2>{category.replace(/([A-Z])/g, " $1").toUpperCase()}</h2>
            {speciesList.length > 0 ? (
              <ul>
                {speciesList.map((species, index) => (
                  <li
                    key={index}
                    onClick={() => handleSpeciesClick(species)} 
                    style={{ cursor: "pointer", color: "blue" }}
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
    </div>
  );
};

export default SpeciesInfo;
