import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { useNavigate } from "react-router-dom";

const ThreeScene = () => {
  const mountRef = useRef(null);
  const navigate = useNavigate(); // Hook to navigate programmatically

  useEffect(() => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    mountRef.current.appendChild(renderer.domElement);

    // Add orbit controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.25;
    controls.enableZoom = true;

    // Add lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(5, 10, 7.5);
    scene.add(directionalLight);

    // Add the sky sphere
    const skyGeometry = new THREE.SphereGeometry(500, 64, 64);
    const skyMaterial = new THREE.MeshBasicMaterial({
      color: 0x87ceeb, // Sky blue color
      side: THREE.BackSide, // Render inside of the sphere
    });
    const skySphere = new THREE.Mesh(skyGeometry, skyMaterial);
    scene.add(skySphere);

    // Load the GLTF models
    const loader = new GLTFLoader();
    loader.load("/pond.glb", (gltf) => scene.add(gltf.scene));
    loader.load("/tiger_eat.glb", (gltf) => {
      const tiger = gltf.scene;
      tiger.scale.set(2, 2, 2);
      tiger.position.set(5, 0, 0);
      tiger.rotation.set(0, Math.PI, 0);
      scene.add(tiger);
    });
    loader.load("/tiger_eat.glb", (gltf) => {
      const tiger = gltf.scene;
      tiger.scale.set(2, 2, 2);
      tiger.position.set(2, 0, 16);
      tiger.rotation.set(0, Math.PI, 0);
      scene.add(tiger);
    });
    loader.load("/tiger2.glb", (gltf) => {
      const tiger = gltf.scene;
      tiger.scale.set(-2, 2, 2);
      tiger.position.set(-4, -2, 0);
      tiger.rotation.set(0, Math.PI, 0);
      scene.add(tiger);
    });

    // Set camera position
    camera.position.set(22.443, 8.771, 13.888);

    const animate = () => {
      requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    };
    animate();

    // Handle window resize
    const handleResize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      renderer.setSize(width, height);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    };

    window.addEventListener("resize", handleResize);

    // Cleanup function
    return () => {
      //mountRef.current.removeChild(renderer.domElement);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Button click handler
  const handleButtonClick = () => {
    navigate("/tochoose");
  };

  return (
    <div ref={mountRef} style={{ position: "relative" }}>
      <button
        onClick={handleButtonClick}
        style={{
          position: "absolute",
          top: "10px",
          left: "10px",
          padding: "10px 15px",
          backgroundColor: "#007bff",
          color: "#fff",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
          zIndex: 1,
        }}
      >
        Start
      </button>
    </div>
  );
};

export default ThreeScene;
