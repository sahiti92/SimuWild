import React, { useEffect, useRef,useState } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { useNavigate } from "react-router-dom"; // Import useNavigate for routing
import axios from "axios";

const ElephantAnim21 = () => {
  const mountRef = useRef(null); 
  const navigate = useNavigate();
  const [showFooter, setShowFooter] = useState(false);
  const forestModels = useRef([]);
  useEffect(() => {
    
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(100, window.innerWidth / window.innerHeight, 0.1, 1000);
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

    
    const planeGeometry = new THREE.PlaneGeometry(1500, 1200);
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
    camera.position.set(200, 150, 80);
    

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
        { x: -230, z: 180 },
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
      loader.load(
        // './barbed_wire.glb', // Ensure this path is correct
        '/village.glb',
         (gltf) => {
           const fence = gltf.scene;
           fence.position.set(250, -10, 50);
           fence.scale.set(4.5,4, 3 ); 
           fence.rotation.y = 3* Math.PI /2; // 45 degrees rotation on the Y-axis
           //fence.rotation.z = Math.PI;     // 180 degrees rotation on the Z-axis

           scene.add(fence);
         },
        //  undefined,
        //  (error) => {
        //    console.error("An error occurred while loading thse model:", error);
        //  }
       );

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
    // Load the Forest and Green Field Models
    loader.load('./forest.glb', (gltf) => {
      const forest = gltf.scene;
      const forestPositions = [
        //{ x: -50, z: 50 },
        { x: -580, z: 180 },
        { x: -580, z: 440 },
        //{x: -580, z: -10},
        {x: -580, z: -120},
        {x: -580, z: -440},
      ];

      forestPositions.forEach(pos => {
        const clonedForest = forest.clone();
        clonedForest.scale.set(20, 20, 20);
        clonedForest.position.set(pos.x, -10, pos.z);
        scene.add(clonedForest);
      });
    });
    
    
    loader.load(
      './barbed_wire.glb', // Ensure this path is correct
       (gltf) => {
         const house = gltf.scene;
      const housePositions = [
        {x: -200, z: -70},
        {x: -200, z: -270},
        {x: -200, z: -570},
        {x: -200, z: -170},
        {x: -200, z: -370},
        {x: -200, z: -470},
        {x: -200, z: 30},
        {x: -200, z: 130},
        {x: -200, z: 230},
        {x: -200, z: 330},
        {x: -200, z: 430},
        {x: -200, z: 530},




      ]
      housePositions.forEach(pos => {
        const clonedHouse= house.clone();
        clonedHouse.scale.set(20, 20, 20);
        clonedHouse.rotation.y = 3* Math.PI /2; // 45 degrees rotation on the Y-axis
        clonedHouse.position.set(pos.x, -10, pos.z);//y=-20?
        scene.add(clonedHouse);
      });

       });
       loader.load('./green_field.glb', (gltf) => {
        const field = gltf.scene;
        const fieldPositions = [
         // { x: -50, z: -350 },
          // { x: -50, z: -650 },
          // { x: -50, z: -500 },
          // { x: -50, z: -50 },
          // { x: -50, z: 650 },
          // { x: -50, z: 500 },
          // { x: -50, z: 200 },
          // { x: -50, z: -200 },
          // { x: -50, z: 350 },
          // { x: -50, z: 50 },
          // { x: -50, z: 10 },

      
          //{ x: 170, z: 150 },
         // { x: 20, z: 280 },
         // { x: 170, z: 150 },
  
        ];
      
        fieldPositions.forEach(pos => {
          const clonedField = field.clone();
          clonedField.scale.set(10, 10, 10);
          clonedField.position.set(pos.x, -10, pos.z);
          scene.add(clonedField);
        });
      });
      
   
    

    // Animation loop
    const animate = (mixers = []) => {
      requestAnimationFrame(() => animate(mixers));
      const delta = clock.getDelta();

      mixers.forEach(mixer => mixer.update(delta));
      controls.update();
      renderer.render(scene, camera);
    };

      const handleExitClick = () => {
      navigate('/scenarios/scenario1'); // Redirect to Scenario1
    };
    // Handle window resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize);

  
    return () => {
      window.removeEventListener('resize', handleResize);
     // mountRef.current.removeChild(renderer.domElement);
      renderer.dispose();
    };
  }, []);

  const handleSaveAndExit = () => {
    navigate("/scenarios/scenario1");
  };

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
    } catch (error) {
      console.error("Error resetting progress:", error);
      alert(
        "Failed to reset progress: " +
          (error.response?.data?.error || "Unknown error")
      );
    }
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
          U installed electrical fences to prevent elephants from damaging the houses and farm land,
          because of installing electrical fences many elephants were killed.
        </footer>
      )}
    </div>
  );
};


export default ElephantAnim21;
