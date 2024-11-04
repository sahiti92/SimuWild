
import React, { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import { animalData } from "./animalData"; // Import your animal data
import "mapbox-gl/dist/mapbox-gl.css";
import "./MapComponent.css"; // Import CSS for animations

mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_TOKEN;

const MapComponent = () => {
  const mapContainerRef = useRef(null);
  const [animalInfo, setAnimalInfo] = useState(null);
  const [showAnimalImage, setShowAnimalImage] = useState(false);
  const [imagePosition, setImagePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: "mapbox://styles/ikshi/cm2ylosvs00qr01qwbzj6ax6k", // Replace with your style ID
      center: [78.9629, 20.5937], // Center on India
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

          // Hide image after a delay for effect
          setTimeout(() => {
            setShowAnimalImage(false);
          }, 5000); // Image stays for 3 seconds
        });
      });
    });

    return () => map.remove();
  }, []);

  return (
    <div style={{ position: "relative", height: "100vh" }}>
      <div ref={mapContainerRef} style={{ width: "100vw", height: "100vh" }} />
      {showAnimalImage && animalInfo && (
        <div
          className="animal-image"
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
