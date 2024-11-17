import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Canvas, useFrame } from "@react-three/fiber";
const ElephantAnim21 = () => {
  const scenarioId = 1;
  const navigate = useNavigate();
  const mountRef = useRef(null);
  const mixers = useRef([]);
  const raycaster = new THREE.Raycaster();
  const pointer = new THREE.Vector2();
  const [footerText, setFooterText] = useState(
    "You have installed electrical fences to prevent elephants from damaging the houses and farm land,but this may harm the elephants."
  );

  useEffect(() => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      100,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    const renderer = new THREE.WebGLRenderer({ antialias: true });
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
    camera.position.set(0, 50, 250);

    controls.addEventListener("change", () => {
      console.log(
        `Camera position: x: ${camera.position.x}, y: ${camera.position.y}, z: ${camera.position.z}`
      );
    });
    const textureLoader = new THREE.TextureLoader();
    textureLoader.load("/sky_scene1.jpg", (texture) => {
      scene.background = texture;
    });
    renderer.shadowMap.enabled = false;
    const loader = new GLTFLoader();
    loader.load("/village.glb", (gltf) => {
      const fence = gltf.scene;
      fence.position.set(200, -10, 100);
      fence.scale.set(4, 4, 3);
      fence.rotation.y = (3 * Math.PI) / 2;
      scene.add(fence);
    });
    loader.load(
      "/elephant1.glb",
      (gltf) => {
        const model1 = gltf.scene;
        model1.scale.set(20, 20, 20);
        model1.position.set(-240, -10, 100); // Keeping the elephant at the same position
        model1.rotation.set(0, Math.PI / 2, 0); // Initial rotation

        scene.add(model1);

        const mixer = new THREE.AnimationMixer(model1);
        mixers.current.push(mixer); // Add this mixer to mixers array
        const animations = gltf.animations;

        console.log(animations);

        if (animations.length > 0) {
          // Start with the first animation (e.g., animation at index 0)
          const action = mixer.clipAction(animations[27]);
          action.play(); // Initial animation
        }

        // After 2 seconds, switch to the second animation (e.g., animation at index 1)
        setTimeout(() => {
          const currentAction = mixer.clipAction(animations[27]); // Stop the first animation
          currentAction.stop();

          const newAction = mixer.clipAction(animations[0]); // Animation 2 (index 1)
          newAction.play(); // Start the second animation
        }, 4000);

        // After 4 seconds, switch to the third animation (e.g., animation at index 2)
        setTimeout(() => {
          const currentAction = mixer.clipAction(animations[0]); // Stop the second animation
          currentAction.stop();

          const finalAction = mixer.clipAction(animations[25]); // Animation 3 (index 2)
          finalAction.play(); // Start the third animation
          setFooterText(
            "In the attempt to protect your crops and homes, the installation of electrical fences has inadvertently harmed the elephants. By prioritizing your own interests, the lives of these creatures have been overlooked, leading to unintended consequences."
          );
        }, 9000);
      },
      (xhr) => console.log((xhr.loaded / xhr.total) * 100 + "% loaded"),
      (error) =>
        console.error(
          "An error occurred while loading the elephant model:",
          error
        )
    );

    loader.load(
      "/elephant1.glb",
      (gltf) => {
        const model2 = gltf.scene;
        model2.scale.set(20, 20, 20);
        model2.position.set(-240, -10, 10); // Keeping the elephant at the same position
        model2.rotation.set(0, Math.PI / 2, 0); // Initial rotation

        scene.add(model2);

        const mixer = new THREE.AnimationMixer(model2);
        mixers.current.push(mixer); // Add this mixer to mixers array
        const animations = gltf.animations;

        console.log(animations);

        if (animations.length > 0) {
          // Start with the first animation (e.g., animation at index 0)
          const action = mixer.clipAction(animations[27]);
          action.play(); // Initial animation
        }

        // After 2 seconds, switch to the second animation (e.g., animation at index 1)
        setTimeout(() => {
          const currentAction = mixer.clipAction(animations[27]); // Stop the first animation
          currentAction.stop();

          const newAction = mixer.clipAction(animations[0]); // Animation 2 (index 1)
          newAction.play(); // Start the second animation
        }, 4000);

        // After 4 seconds, switch to the third animation (e.g., animation at index 2)
        setTimeout(() => {
          const currentAction = mixer.clipAction(animations[0]); // Stop the second animation
          currentAction.stop();

          const finalAction = mixer.clipAction(animations[25]); // Animation 3 (index 2)
          finalAction.play(); // Start the third animation
          setFooterText(
            "In the attempt to protect your crops and homes, the installation of electrical fences has inadvertently harmed the elephants. By prioritizing your own interests, the lives of these creatures have been overlooked, leading to unintended consequences."
          );
        }, 9000);
      },
      (xhr) => console.log((xhr.loaded / xhr.total) * 100 + "% loaded"),
      (error) =>
        console.error(
          "An error occurred while loading the elephant model:",
          error
        )
    );

    const elephantPositions = [
      // { x: -390, z: -20 },
      // { x: -200, z: 180 },
      // { x: -350, z: 180 },
      { x: -475, z: 100 },
      // { x: -450, z: -100 },
      { x: -500, z: 200 },
      // { x: -450, z: 50 },
      { x: -500, z: -250 },
    ];
    loader.load("/elephant.glb", (gltf) => {
      elephantPositions.forEach((pos) => {
        const clonedElephant = gltf.scene.clone();
        clonedElephant.position.set(pos.x, -5, pos.z);
        clonedElephant.rotation.y = Math.random() * Math.PI * 2;

        scene.add(clonedElephant);
      });

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
    loader.load(
      "./barbed_wire.glb", // Ensure this path is correct
      (gltf) => {
        const fence = gltf.scene;
        const fencePositions = [
          { x: -200, z: -70 },
          { x: -200, z: -270 },
          { x: -200, z: -570 },
          { x: -200, z: -170 },
          { x: -200, z: -370 },
          { x: -200, z: -470 },
          { x: -200, z: 30 },
          { x: -200, z: 130 },
          { x: -200, z: 230 },
          { x: -200, z: 330 },
          { x: -200, z: 430 },
          { x: -200, z: 530 },
        ];
        fencePositions.forEach((pos) => {
          const clonedFence = fence.clone();
          clonedFence.scale.set(20, 20, 20);
          clonedFence.rotation.y = (3 * Math.PI) / 2; // 45 degrees rotation on the Y-axis
          clonedFence.position.set(pos.x, -10, pos.z); //y=-20?
          scene.add(clonedFence);
        });
      }
    );

    loader.load("./forest.glb", (gltf) => {
      const forest = gltf.scene;

      // First 5 forest models at different positions
      const forestPositions = [
        { x: -580, z: 280 },
        { x: -580, z: 580 },
        { x: -580, z: -10 },
        { x: -580, z: -280 },
        { x: -580, z: -580 },
      ];

      // Clone and add the first 5 models
      forestPositions.forEach((pos) => {
        const clonedForest = gltf.scene.clone();
        clonedForest.scale.set(20, 20, 20);
        clonedForest.position.set(pos.x, -10, pos.z);
        scene.add(clonedForest);
      });
    });

    const timer = setTimeout(() => {
      navigate("/summarys1"); // Replace '/next-page' with the path you want to navigate to
    }, 12000);

    const animate = () => {
      requestAnimationFrame(animate);

      mixers.current.forEach((mixer) => mixer.update(0.01));
      controls.update();
      renderer.render(scene, camera);
    };
    animate();
    const handleResize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      renderer.setSize(width, height);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    };

    window.addEventListener("resize", handleResize);

    const onPointerClick = (event) => {
      pointer.x = (event.clientX / window.innerWidth) * 2 - 1;
      pointer.y = -(event.clientY / window.innerHeight) * 2 + 1;

      raycaster.setFromCamera(pointer, camera);
      const intersects = raycaster.intersectObjects(scene.children, true);

      if (intersects.length > 0) {
        const intersect = intersects[0];
        const position = intersect.point;
        console.log(
          `Clicked position: x: ${position.x}, y: ${position.y}, z: ${position.z}`
        );
      }
    };

    window.addEventListener("click", onPointerClick);

    window.addEventListener("resize", handleResize);

    // Show footer text after 3 seconds

    return () => {
      // mountRef.current.removeChild(renderer.domElement);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("click", onPointerClick);
    };
  }, []);
  const handleRestartClick = async () => {
    try {
      console.log("Resetting progress");
      const scenarioId = 1;
      await axios.post(
        // "http://localhost:10000/api/v1/progress/reset",
        "https://simuwild.onrender.com/api/v1/progress/reset",
        { scenarioId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      //setSelectedChoice("");
      // setShowOutcomeScene(false);
      alert("Progress has been reset.");
      navigate("/eleph");
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
    <div
      ref={mountRef}
      style={{ width: "100vw", height: "100vh", position: "relative" }}
    >
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
      {
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
          {footerText}
        </footer>
      }
    </div>
  );
};

export default ElephantAnim21;
