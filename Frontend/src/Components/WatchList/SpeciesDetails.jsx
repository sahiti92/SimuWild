import React, { useEffect, useState } from "react";
import Papa from "papaparse";
import { useParams } from "react-router-dom";
import "./SpeciesDetails.css";
const SpeciesDetails = () => {
  const { scientificName } = useParams();
  const [species, setSpecies] = useState(null);
  const csvPaths = {
    endangered: "../../../Endangered.csv",
    criticallyEndangered: "../../../CriticallyEndangered.csv",
    vulnerable: "../../../Vulnerable.csv",
    nearThreatened: "../../../NearThreatened.csv",
  };

  // Fetch species data to find the matching species
  const fetchSpeciesData = async () => {
    for (const [category, path] of Object.entries(csvPaths)) {
      try {
        const response = await fetch(path);
        const csvText = await response.text();
        Papa.parse(csvText, {
          header: true,
          complete: (result) => {
            const foundSpecies = result.data.find(
              (sp) => sp.scientificName === decodeURIComponent(scientificName)
            );
            if (foundSpecies) {
              setSpecies(foundSpecies);
            }
          },
          error: (error) => {
            console.error(`Error parsing CSV for ${category}: `, error);
          },
        });
      } catch (error) {
        console.error(`Error fetching CSV file for ${category}: `, error);
      }
    }
  };

  useEffect(() => {
    fetchSpeciesData();
  }, [scientificName]);

  return species ? (
    <div className="species-details">
      <h1>{species.scientificName}</h1>
      <div className="species-grid">
        <div>
          <strong>Threats</strong>
          <br />
          <span dangerouslySetInnerHTML={{ __html: species.threats }} />
        </div>
        <div>
          <strong>Habitat</strong>
          <br />
          <span dangerouslySetInnerHTML={{ __html: species.habitat }} />
        </div>
        <div>
          <strong>Conservation Actions</strong>
          <br />
          <span
            dangerouslySetInnerHTML={{ __html: species.conservationActions }}
          />
        </div>
        <div>
          <strong>UseTrade</strong>
          <br />
          <span dangerouslySetInnerHTML={{ __html: species.useTrade }} />
        </div>
      </div>
    </div>
  ) : (
    <p>Loading species details...</p>
  );
};

export default SpeciesDetails;
