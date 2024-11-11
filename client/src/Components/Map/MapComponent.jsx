import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import mapboxgl from "mapbox-gl";
import { animalData } from "./animalData";
import "mapbox-gl/dist/mapbox-gl.css";
import "./MapComponent.css";

mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_TOKEN;
console.log("Mapbox Access Token:", mapboxgl.accessToken);

const MapComponent = () => {
  const mapContainerRef = useRef(null);
  const [animalInfo, setAnimalInfo] = useState(null);
  const [showAnimalImage, setShowAnimalImage] = useState(false);
  const [imagePosition, setImagePosition] = useState({ x: 0, y: 0 });
  const navigate = useNavigate();

  useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [78.9629, 20.5937],
      zoom: 4,
    });

    map.on("load", () => {
      Object.keys(animalData).forEach((state) => {
        const { coordinates } = animalData[state];
        const marker = new mapboxgl.Marker().setLngLat(coordinates).addTo(map);

        marker.getElement().addEventListener("click", (e) => {
          const { top, left } = e.target.getBoundingClientRect();
          setImagePosition({ x: left, y: top });
          setAnimalInfo(animalData[state]);
          setShowAnimalImage(true);

          setTimeout(() => {
            setShowAnimalImage(false);
          }, 20000);
        });
      });
    });

    return () => map.remove();
  }, []);

  return (
    <div style={{ position: "relative", height: "100vh" }}>
      <div ref={mapContainerRef} style={{ width: "100vw", height: "100vh" }} />
      <div className="quiz-button-container">
        <button className="start-quiz-button" onClick={() => navigate("/quiz")}>
          Start Quiz
        </button>
      </div>
      {showAnimalImage && animalInfo && (
        <div
          className="map-animal-image"
          style={{
            top: imagePosition.y,
            left: imagePosition.x,
            transform: "translate(-50%, -50%)",
            position: "absolute",
          }}
        >
          <img src={animalInfo.image} alt={animalInfo.name} />
          <h3>{animalInfo.name}</h3>
          <p>{animalInfo.info}</p>
        </div>
      )}
    </div>
  );
};

export default MapComponent;
