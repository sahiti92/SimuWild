// import React, { useEffect, useRef, useState } from 'react';
//import mapboxgl from "mapbox-gl";
// import { animalData } from './animalData'; // Import your animal data
//import "mapbox-gl/dist/mapbox-gl.css"; // Import Mapbox CSS

// mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_TOKEN;

// const MapComponent = () => {
//     const mapContainerRef = useRef(null);
//     const [animalInfo, setAnimalInfo] = useState(null);

//     useEffect(() => {
//         const map = new mapboxgl.Map({
//             container: mapContainerRef.current,
//             style: 'mapbox://styles/ikshi/cm2ylosvs00qr01qwbzj6ax6k', // Replace with your style ID
//             center: [78.9629, 20.5937], // Center on India
//             zoom: 4,
//         });

//         // Handle click events on the map
//         map.on('load', () => {
//             Object.keys(animalData).forEach(state => {
//                 const { coordinates } = animalData[state];
//                 const marker = new mapboxgl.Marker()
//                     .setLngLat(coordinates)
//                     .addTo(map);

//                 // Attach click event to the marker
//                 marker.getElement().addEventListener('click', () => {
//                     setAnimalInfo(animalData[state]);
//                 });
//             });
//         });

//         // Clean up on component unmount
//         return () => map.remove();
//     }, []);

//     return (
//         <div style={{ position: 'relative', height: '100vh' }}>
//             <div ref={mapContainerRef} style={{ width: '100vw', height: '100vh' }} />
//             {animalInfo && (
//                 <div style={{
//                     position: 'absolute',
//                     bottom: '10px',
//                     left: '10px',
//                     background: 'black',
//                     padding: '10px',
//                     borderRadius: '5px',
//                     boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
//                 }}>
//                     <h3>{animalInfo.name}</h3>
//                     <p>{animalInfo.info}</p>
//                     <img src={animalInfo.image} alt={animalInfo.name} style={{ width: '100px', height: 'auto' }} />
//                 </div>
//             )}
//         </div>
//     );
// };

// export default MapComponent;
import React, { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import { animalData } from "./animalData"; // Import your animal data
import "mapbox-gl/dist/mapbox-gl.css";
import "./MapComponent.css"; // Import CSS for animations

mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_TOKEN;

const MapComponent = () => {
  const mapContainerRef = useRef(null);
  const [showAnimalImage, setShowAnimalImage] = useState(false);
  const [animalImage, setAnimalImage] = useState("");
  const [animalName, setAnimalName] = useState(""); // New state for animal name
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
        const { coordinates, image, name } = animalData[state]; // Assume 'name' is in animalData
        const marker = new mapboxgl.Marker().setLngLat(coordinates).addTo(map);

        marker.getElement().addEventListener("click", (e) => {
          const { top, left } = e.target.getBoundingClientRect();

          setImagePosition({ x: left, y: top });
          setAnimalImage(image);
          setAnimalName(name); // Set the animal name
          setShowAnimalImage(true);

          // Hide the animal image and name after the animation completes
          setTimeout(() => {
            setShowAnimalImage(false);
          }, 10000); // Adjust this duration to match the animation
        });
      });
    });

    return () => map.remove();
  }, []);

  return (
    <div style={{ position: "relative", height: "100vh" }}>
      <div ref={mapContainerRef} style={{ width: "100vw", height: "100vh" }} />
      {showAnimalImage && (
        <>
          <img
            src={animalImage}
            alt="Animal"
            className="animal-image"
            style={{
              top: imagePosition.y,
              left: imagePosition.x,
            }}
          />
          <div
            className="animal-name"
            style={{
              top: imagePosition.y, // Position below the image
              left: imagePosition.x - 50,
            }}
          >
            {animalName}
          </div>
        </>
      )}
    </div>
  );
};

export default MapComponent;
