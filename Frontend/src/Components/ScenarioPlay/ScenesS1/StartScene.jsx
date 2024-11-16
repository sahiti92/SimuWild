import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { useNavigate } from "react-router-dom";
import { getUserFromStorage } from "../../../utils/getUser";
import axios from "axios";

const ElephantAnim = () => {
  const scenarioId = 1;
  const navigate = useNavigate();
  const mountRef = useRef(null);
  const [shouldIncrement, setShouldIncrement] = useState(false);
  useEffect(() => {
    const checkProgress = async () => {
      try {
        const token = getUserFromStorage();
        const response = await axios.get(
          "http://localhost:10000/api/v1/progress",
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const progress = response.data;
        const scenarioProgress = progress.find(
          (item) => item.scenarioId === scenarioId
        );
        if (
          scenarioProgress &&
          (scenarioProgress.counter === 1 || scenarioProgress.counter === 0)
        ) {
          setShouldIncrement(true);
        }
        console.log("sp");
        console.log(scenarioProgress.counter);
      } catch (error) {
        console.error("Error fetching progress:", error);
      }
    };

    checkProgress();
  }, [scenarioId]);
  const handleClick = async () => {
    try {
      const token = getUserFromStorage();

      // Only call increment API if shouldIncrement is true
      if (shouldIncrement) {
        const response = await axios.post(
          "http://localhost:10000/api/v1/progress/increment-counter",
          { scenarioId },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log("counter incremented from 1 ");
        console.log(response.data.message); // Display response message
      }
    } catch (error) {
      console.error("Error incrementing counter:", error);
    }
    navigate("/tochoose1");
  };
  const handleclick2 = async () => {
    navigate("/scenarios/scenario1");
  };

  useEffect(() => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      100,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    const renderer = new THREE.WebGLRenderer();
    const clock = new THREE.Clock();

    renderer.setSize(window.innerWidth, window.innerHeight);
    mountRef.current.appendChild(renderer.domElement);

    //scene.background = new THREE.Color(0x87CEEB);

    const light = new THREE.DirectionalLight(0xffffff, 1);
    light.position.set(10, 10, 5).normalize();
    scene.add(light);

    const ambientLight = new THREE.AmbientLight(0xffffff, 2);
    scene.add(ambientLight);

    const pointLight1 = new THREE.PointLight(0xffffff, 1, 100);
    pointLight1.position.set(0, 50, 0);
    scene.add(pointLight1);

    const pointLight2 = new THREE.PointLight(0xffffff, 1, 100);
    pointLight2.position.set(100, 50, -100);
    scene.add(pointLight2);

    const planeGeometry = new THREE.PlaneGeometry(1500, 1500);
    const grassPlaneMaterial = new THREE.MeshStandardMaterial({
      color: 0x302d26,
    });
    const plane = new THREE.Mesh(planeGeometry, grassPlaneMaterial);
    plane.rotation.x = -Math.PI / 2;
    plane.position.y = -10;
    scene.add(plane);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.1;
    controls.screenSpacePanning = false;
    controls.maxPolarAngle = Math.PI / 2;
    controls.minDistance = 50;
    controls.maxDistance = 300;
    camera.position.set(10, 50, -50);

    renderer.shadowMap.enabled = false;

    const loader = new GLTFLoader();
    loader.load("./elephant.glb", (gltf) => {
      const model = gltf.scene;
      const elephants = [];

      const elephantPositions = [
        { x: -400, z: -100 },
        { x: -300, z: -30 },
        { x: -430, z: 0 },
        { x: -390, z: -20 },
        { x: -200, z: 180 },
        { x: -350, z: 180 },
        { x: -300, z: 180 },
        { x: -475, z: 100 },
        { x: -450, z: -100 },
        { x: -500, z: 200 },
        { x: -450, z: 50 },
        { x: -500, z: -250 },
      ];

      elephantPositions.forEach((pos) => {
        const clonedElephant = model.clone();
        clonedElephant.position.set(pos.x, -5, pos.z);
        clonedElephant.rotation.y = Math.random() * Math.PI * 2;
        elephants.push(clonedElephant);
        scene.add(clonedElephant);
      });
      loader.load(
        // './barbed_wire.glb', // Ensure this path is correct
        "/village.glb",
        (gltf) => {
          const fence = gltf.scene;
          fence.position.set(200, -10, 100);
          fence.scale.set(4, 4, 3);
          fence.rotation.y = (3 * Math.PI) / 2; // 45 degrees rotation on the Y-axis
          //fence.rotation.z = Math.PI;     // 180 degrees rotation on the Z-axis

          scene.add(fence);
        },
        undefined,
        (error) => {
          console.error("An error occurred while loading thse model:", error);
        }
      );

      if (gltf.animations && gltf.animations.length) {
        const mixers = elephants.map((elephant) => {
          const mixer = new THREE.AnimationMixer(elephant);
          const action = mixer.clipAction(gltf.animations[0]);
          action.play();
          return mixer;
        });

        animate(mixers);
      } else {
        animate();
      }
    });
    const textureLoader = new THREE.TextureLoader();
    textureLoader.load("/sky_scene1.jpg", (texture) => {
      scene.background = texture;
    });
    // Load the Forest and Green Field Models
    loader.load("./forest.glb", (gltf) => {
      const forest = gltf.scene;
      const forestPositions = [
        //{ x: -50, z: 50 },
        { x: -580, z: 280 },
        { x: -580, z: 580 },
        { x: -580, z: -10 },
        { x: -580, z: -280 },
        { x: -580, z: -580 },
        { x: -280, z: 280 },
        { x: -280, z: 580 },
        { x: -280, z: -10 },
        { x: -280, z: -280 },
        { x: -280, z: -580 },
      ];

      forestPositions.forEach((pos) => {
        const clonedForest = forest.clone();
        clonedForest.scale.set(20, 20, 20);
        clonedForest.position.set(pos.x, -10, pos.z);
        scene.add(clonedForest);
      });
    });

    // Animation loop
    const animate = (mixers = []) => {
      requestAnimationFrame(() => animate(mixers));
      const delta = clock.getDelta();

      mixers.forEach((mixer) => mixer.update(delta));
      controls.update();
      renderer.render(scene, camera);
    };

    // Handle window resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      // mountRef.current.removeChild(renderer.domElement);
      renderer.dispose();
    };
  }, []);
  return (
    <div ref={mountRef} style={{ position: "relative", height: "100vh" }}>
      <button
        onClick={handleClick}
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
      <button
        onClick={handleclick2}
        style={{
          position: "absolute",
          top: "10px",
          right: "10px",
          padding: "10px 15px",
          backgroundColor: "red",
          color: "#fff",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
          zIndex: 1,
        }}
      >
        Exit
      </button>
      <footer
        style={{
          position: "absolute",
          bottom: "20px",
          width: "100%",
          textAlign: "center",
          color: "white",
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          padding: "10px",
          fontSize: "18px",
        }}
      >
        Sonitpur, a district in Assam, is home to vast stretches of tropical
        forests that shelter India’s magnificent Asian elephants. This provides
        essential pathways for elephant herds, supporting their natural
        migration and feeding patterns. Here traditional elephant corridors
        coexist with human settlements,forming an ancient sanctuary that
        balances both wildlife and humans. But now,people started cutting down
        the trees for their benefits.Press start to see what happens next.
      </footer>
    </div>
  );
};

export default ElephantAnim;
