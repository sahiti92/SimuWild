// import React, { useEffect, useRef } from 'react';
// import * as THREE from 'three';
// import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
// import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
// import { useNavigate } from "react-router-dom"; // Import useNavigate for routing
// const ElephantAnim11 = () => {
//   const mountRef = useRef(null);
//   const navigate=useNavigate();

//   useEffect(() => {
//     const scene = new THREE.Scene();
//     const camera = new THREE.PerspectiveCamera(100, window.innerWidth / window.innerHeight, 0.1, 1000);
//     const renderer = new THREE.WebGLRenderer();
//     const clock = new THREE.Clock();

//     renderer.setSize(window.innerWidth, window.innerHeight);
//     mountRef.current.appendChild(renderer.domElement);

//     const light = new THREE.DirectionalLight(0xffffff, 1);
//     light.position.set(10, 10, 5).normalize();
//     scene.add(light);

//     const ambientLight = new THREE.AmbientLight(0xffffff, 2);
//     scene.add(ambientLight);

//     const pointLight1 = new THREE.PointLight(0xffffff, 1, 100);
//     pointLight1.position.set(0, 50, 0);
//     scene.add(pointLight1);

//     const pointLight2 = new THREE.PointLight(0xffffff, 1, 100);
//     pointLight2.position.set(100, 50, -100);
//     scene.add(pointLight2);

//     const planeGeometry = new THREE.PlaneGeometry(1500, 1500);
//     const grassPlaneMaterial = new THREE.MeshStandardMaterial({ color: 0x302D26 });
//     const plane = new THREE.Mesh(planeGeometry, grassPlaneMaterial);
//     plane.rotation.x = -Math.PI / 2;
//     plane.position.y = -10;
//     scene.add(plane);

//     const controls = new OrbitControls(camera, renderer.domElement);
//     controls.enableDamping = true;
//     controls.dampingFactor = 0.1;
//     controls.screenSpacePanning = false;
//     controls.maxPolarAngle = Math.PI / 2;
//     controls.minDistance = 50;
//     controls.maxDistance = 300;
//     camera.position.set(0, 50, 250);

//     renderer.shadowMap.enabled = false;

//     const loader = new GLTFLoader();
//     loader.load('./elephant.glb', (gltf) => {
//       const model = gltf.scene;
//       const elephants = [];
//       const elephantPositions = [
//         { x: -400, z: -100 },
//         { x: -300, z: -30 },
//         { x: -430, z: 0 },
//         { x: -390, z: -20 },
//         { x: -200, z: 180 },
//         { x: -350, z: 180 },
//         { x: -300, z: 180 },
//         { x: -475, z: 100 },
//         { x: -450, z: -100 },
//         { x: -500, z: 200 },
//         { x: -450, z: 50 },
//         { x: -500, z: -250 },
//       ];

//       elephantPositions.forEach(pos => {
//         const clonedElephant = model.clone();
//         clonedElephant.position.set(pos.x, -5, pos.z);
//         clonedElephant.rotation.y = Math.random() * Math.PI * 2;
//         elephants.push(clonedElephant);
//         scene.add(clonedElephant);
//       });

//       loader.load('/village.glb', (gltf) => {
//         const fence = gltf.scene;
//         fence.position.set(200, -10, 100);
//         fence.scale.set(4, 4, 3);
//         fence.rotation.y = 3 * Math.PI / 2;
//         scene.add(fence);
//       });

//       if (gltf.animations && gltf.animations.length) {
//         const mixers = elephants.map(elephant => {
//           const mixer = new THREE.AnimationMixer(elephant);
//           const action = mixer.clipAction(gltf.animations[0]);
//           action.play();
//           return mixer;
//         });
//         animate(mixers);
//       } else {
//         animate();
//       }
//     });

//     const textureLoader = new THREE.TextureLoader();
//     textureLoader.load("/sky_scene1.jpg", (texture) => {
//       scene.background = texture;
//     });

//     loader.load('./forest.glb', (gltf) => {
//       const forest = gltf.scene;
//       const forestPositions = [
//         { x: -580, z: 280 },
//         { x: -580, z: 580 },
//         { x: -580, z: -10 },
//         { x: -580, z: -280 },
//         { x: -580, z: -580 },
//       ];

//       forestPositions.forEach(pos => {
//         const clonedForest = forest.clone();
//         clonedForest.scale.set(20, 20, 20);
//         clonedForest.position.set(pos.x, -10, pos.z);
//         scene.add(clonedForest);
//       });
//     });

//     loader.load('/broken_house.glb', (gltf) => {
//       const house = gltf.scene;
//       const housePositions = [{ x: -280, z: 280 }];

//       housePositions.forEach(pos => {
//         const clonedHouse = house.clone();
//         clonedHouse.scale.set(10, 1, 1);
//         clonedHouse.position.set(pos.x, -10, pos.z);
//         scene.add(clonedHouse);
//       });
//     });

//     loader.load('./green_field.glb', (gltf) => {
//       const field = gltf.scene;
//       const fieldPositions = [];

//       fieldPositions.forEach(pos => {
//         const clonedField = field.clone();
//         clonedField.scale.set(10, 10, 10);
//         clonedField.position.set(pos.x, -10, pos.z);
//         scene.add(clonedField);
//       });
//     });

//     loader.load('/road_roller_truck.glb', (gltf) => {
//       const truck = gltf.scene;
//       const truckPositions = [
//         { x: 180, z: 280 },
//         { x: 180, z: 580 },
//       ];

//       truckPositions.forEach(pos => {
//         const ct = truck.clone();
//         ct.scale.set(20, 20, 20);
//         ct.position.set(pos.x, -10, pos.z);
//         scene.add(ct);
//       });
//     });

//     const animate = (mixers = []) => {
//       requestAnimationFrame(() => animate(mixers));
//       const delta = clock.getDelta();

//       mixers.forEach(mixer => mixer.update(delta));
//       controls.update();
//       renderer.render(scene, camera);
//     };

//     const handleResize = () => {
//       camera.aspect = window.innerWidth / window.innerHeight;
//       camera.updateProjectionMatrix();
//       renderer.setSize(window.innerWidth, window.innerHeight);
//     };
    
 
//     window.addEventListener('resize', handleResize);

//     return () => {
//       window.removeEventListener('resize', handleResize);
//       renderer.dispose();
//     };
//   }, []);


//   const handleRestartClick = async () => {
//     try {
//       console.log("Resetting progress");
//       const scenarioId = 1;
//       await axios.post(
//         "http://localhost:8001/api/v1/progress/reset",
//         { scenarioId },
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );

//       setSelectedChoice("");
//       setShowOutcomeScene(false);
//       alert("Progress has been reset.");
//       navigate("/eleph")
//     } catch (error) {
//       console.error("Error resetting progress:", error);
//       alert(
//         "Failed to reset progress: " +
//           (error.response?.data?.error || "Unknown error")
//       );
//     }
//   };


//   const handleSaveAndExit = () => {
//     navigate("/scenarios/scenario1"); // Navigate to Scenario1 when Exit is clicked

//     // Add save logic here
//   };

//   return (
//     <div ref={mountRef} style={{ width: '100vw', height: '100vh', position: 'relative' }}>
//       <button
//         onClick={handleRestartClick}
//         style={{
//           position: "absolute",
//           top: "10px",
//           left: "10px",
//           padding: "10px 15px",
//           backgroundColor: "#007bff",
//           color: "#fff",
//           border: "none",
//           borderRadius: "5px",
//           cursor: "pointer",
//           zIndex: 1,
//         }}
//       >
//         Restart
//       </button>
//       <button
//         onClick={handleSaveAndExit}
//         style={{
//           position: "absolute",
//           top: "10px",
//           right: "10px",
//           padding: "10px 15px",
//           backgroundColor: "red",
//           color: "#fff",
//           border: "none",
//           borderRadius: "5px",
//           cursor: "pointer",
//           zIndex: 1,
//         }}
//       >
//         Save & Exit
//       </button>
//       <footer
//         style={{
//           position: "absolute",
//           bottom: "20px",
//           width: "100%",
//           textAlign: "center",
//           color: "white",
//           backgroundColor: "rgba(0, 0, 0, 0.5)",
//           padding: "10px",
//           fontSize: "18px",
//         }}
//       >
//         Continued construction and habitat destruction threaten tiger
//         populations, reducing their numbers and forcing them closer to human
//         communities. This increased proximity poses risks for both tigers and
//         people, leading to potential conflicts and endangering lives on both
//         sides. Protecting tiger habitats is essential for harmonious
//         coexistence.
//       </footer>
//     </div>
//   );
// };

// export default ElephantAnim11;

import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { useNavigate } from "react-router-dom"; // Import useNavigate for routing
import axios from "axios";
import { Canvas, useFrame } from '@react-three/fiber';
const ElephantAnim11 = () => {
  const mountRef = useRef(null);
  const navigate = useNavigate();
  const [showFooter, setShowFooter] = useState(false);
  const forestModels = useRef([]); // Use a ref to store forest models so we can access them later

  useEffect(() => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(100, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer();
    const clock = new THREE.Clock();

    renderer.setSize(window.innerWidth, window.innerHeight);
    mountRef.current.appendChild(renderer.domElement);

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
    const grassPlaneMaterial = new THREE.MeshStandardMaterial({ color: 0x302D26 });
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
    camera.position.set(0, 50, 250);

    renderer.shadowMap.enabled = false;

    const loader = new GLTFLoader();
    loader.load('./elephant.glb', (gltf) => {
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

      elephantPositions.forEach(pos => {
        const clonedElephant = model.clone();
        clonedElephant.position.set(pos.x, -5, pos.z);
        clonedElephant.rotation.y = Math.random() * Math.PI * 2;
        elephants.push(clonedElephant);
        scene.add(clonedElephant);
      });

      loader.load('/village.glb', (gltf) => {
        const fence = gltf.scene;
        fence.position.set(200, -10, 100);
        fence.scale.set(4, 4, 3);
        fence.rotation.y = 3 * Math.PI / 2;
        scene.add(fence);
      });

      if (gltf.animations && gltf.animations.length) {
        const mixers = elephants.map(elephant => {
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

    // Load forest GLBs
    // loader.load('./forest.glb', (gltf) => {
    //   const forest = gltf.scene;
    //   const forestPositions = [
    //     { x: -580, z: 280 },
    //     { x: -580, z: 580 },
    //     { x: -580, z: -10 },
    //     { x: -580, z: -280 },
    //     { x: -580, z: -580 },
    //   ];

    //   forestPositions.forEach(pos => {
    //     const clonedForest = forest.clone();
    //     clonedForest.scale.set(20, 20, 20);
    //     clonedForest.position.set(pos.x, -10, pos.z);
    //     forestModels.current.push(clonedForest); // Store forests in ref array
    //     scene.add(clonedForest);
    //   });
    // });
    loader.load('./forest.glb', (gltf) => {
      const forest = gltf.scene;
    
      // First 5 forest models at different positions
      const forestPositions = [
        { x: -580, z: 280 },
        { x: -580, z: 580 },
        { x: -580, z: -10 },
        { x: -580, z: -280 },
        { x: -580, z: -580 }
      ];
    
      // Clone and add the first 5 models
      forestPositions.forEach((pos) => {
        const clonedForest = forest.clone();
        clonedForest.scale.set(20, 20, 20);
        clonedForest.position.set(pos.x, -10, pos.z);
        scene.add(clonedForest);
      });
    
    
    });
    
    // Remaining models (houses, fields, etc.)
    loader.load('/broken_house.glb', (gltf) => {
      const house = gltf.scene;
      const housePositions = [{ x: -280, z: 280 }];

      housePositions.forEach(pos => {
        const clonedHouse = house.clone();
        clonedHouse.scale.set(10, 1, 1);
        clonedHouse.position.set(pos.x, -10, pos.z);
        scene.add(clonedHouse);
      });
    });

    loader.load('./green_field.glb', (gltf) => {
      const field = gltf.scene;
      const fieldPositions = [];

      fieldPositions.forEach(pos => {
        const clonedField = field.clone();
        clonedField.scale.set(10, 10, 10);
        clonedField.position.set(pos.x, -10, pos.z);
        scene.add(clonedField);
      });
    });

    loader.load('/road_roller_truck.glb', (gltf) => {
      const truck = gltf.scene;
      const truckPositions = [
        { x: 180, z: 280 },
        { x: 180, z: 580 },
      ];

      truckPositions.forEach(pos => {
        const ct = truck.clone();
        ct.scale.set(20, 20, 20);
        ct.position.set(pos.x, -10, pos.z);
        scene.add(ct);
      });
    });
    const timer = setTimeout(() => {
      navigate('/tochoose2');  // Replace '/next-page' with the path you want to navigate to
    }, 20000); 

    const animate = (mixers = []) => {
      requestAnimationFrame(() => animate(mixers));
      const delta = clock.getDelta();

      mixers.forEach(mixer => mixer.update(delta));
      controls.update();
      renderer.render(scene, camera);
    };

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    // Show footer text after 3 seconds
   
    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
    
    };
  }, []);

  const handleRestartClick = async () => {
    try {
      console.log("Resetting progress");
      const scenarioId = 1;
      await axios.post(
        "http://localhost:8001/api/v1/progress/reset",
        { scenarioId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setSelectedChoice("");
      setShowOutcomeScene(false);
      alert("Progress has been reset.");
      navigate("/eleph")
    } catch (error) {
      console.error("Error resetting progress:", error);
      alert(
        "Failed to reset progress: " +
          (error.response?.data?.error || "Unknown error")
      );
    }
  };

  const handleSaveAndExit = () => {
    navigate("/scenarios/scenario1");
  };

  return (
    <div ref={mountRef} style={{ width: '100vw', height: '100vh', position: 'relative' }}>
      <button
        onClick={handleRestartClick}
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
        Restart
      </button>
      <button
        onClick={handleSaveAndExit}
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
        Save & Exit
      </button>
      { (
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
          Due to deforestation, the elephants lose their home and start wandering into nearby villages, destroying crops and homes in search of food.
           What was once a peaceful place now faces the chaos of nature’s giants. It's time to take action to stop this devastation.
      
        </footer>
      )}
    </div>
  );
};

export default ElephantAnim11;
