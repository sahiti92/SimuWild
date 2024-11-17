import React, { useState, useEffect } from "react";
import Papa from "papaparse";
import { useNavigate } from "react-router-dom";
import "./watchpage.css";

const Endangered = () => {
  const [speciesData, setSpeciesData] = useState({
    endangered: [],
  });
  const [showAll, setShowAll] = useState(false);
  const [activeSpeciesIndex, setActiveSpeciesIndex] = useState(null);
  const navigate = useNavigate();

  const csvPaths = {
    endangered: "../../../Endangered.csv",
  };

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

  const handleSpeciesClick = (species, index) => {
    setActiveSpeciesIndex(index);
    navigate(`/species/${encodeURIComponent(species.scientificName)}`);
  };

  const handleExploreClick = () => {
    setShowAll((prev) => !prev);
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
        {Object.entries(speciesData).map(([category, speciesList]) => (
          <div key={category}>
            <h2 style={{ color: "#FFCF58", fontSize: "2em" }}>
              {category.replace(/([A-Z])/g, " $1").toUpperCase()}
            </h2>
            {speciesList.length > 0 ? (
              <ul
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  listStyleType: "none",
                  padding: "0",
                  margin: "0",
                }}
              >
                {speciesList.map((species, index) => (
                  <li
                    key={index}
                    onClick={() => handleSpeciesClick(species, index)}
                    style={{
                      cursor: "pointer",
                      fontSize: "16px",
                      fontWeight: "bold",
                      fontFamily: "Lato",
                      margin: "5px",
                      padding: "10px",
                      backgroundColor:
                        activeSpeciesIndex === index ? "lightblue" : "#f0f0f0",
                      borderRadius: "5px",
                      flexBasis: "calc(20% - 10px)",
                      textAlign: "center",
                      transition: "background-color 0.3s ease",
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
    </div>
  );
};

export default Endangered;
