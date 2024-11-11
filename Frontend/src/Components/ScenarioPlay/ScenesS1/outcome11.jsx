import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const ElephantAnim11 = () => {
  const navigate = useNavigate();
  const mountRef = useRef(null);
  const mixers = useRef([]);
  const raycaster = new THREE.Raycaster();
  const pointer = new THREE.Vector2();

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
        model1.scale.set(20, 1, 1);
        model1.position.set(-400, -10, -100);
        //tiger.rotation.set(0, Math.PI, 0);

        scene.add(model1);

        const mixer = new THREE.AnimationMixer(model1);
        mixers.current.push(mixer); // Add this mixer to mixers array
        const animations = gltf.animations;
        console.log(animations);
        if (animations.length > 0) {
          const action = mixer.clipAction(animations[13]);
          action.play();
        }
      },
      (xhr) => console.log((xhr.loaded / xhr.total) * 100 + "% loaded"),
      (error) =>
        console.error("An error occurred while loading the tiger model:", error)
    );
    loader.load(
      "/elephant1.glb",
      (gltf) => {
        const model2 = gltf.scene;
        model2.scale.set(10, 10, 10);
        model2.position.set(
          323.8386440425428,
          32.8275071099794,
          -117.05521649984772
        );
        //tiger.rotation.set(0, Math.PI, 0);

        scene.add(model2);

        const mixer = new THREE.AnimationMixer(model2);
        mixers.current.push(mixer); // Add this mixer to mixers array
        const animations = gltf.animations;
        console.log(animations);
        if (animations.length > 0) {
          const action = mixer.clipAction(animations[3]);
          action.play();
        }
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
      // { x: -300, z: 180 },
      // { x: -475, z: 100 },
      // { x: -450, z: -100 },
      // { x: -500, z: 200 },
      // { x: -450, z: 50 },
      // { x: -500, z: -250 },
    ];
    loader.load("/elephant.glb", (gltf) => {
      elephantPositions.forEach((pos) => {
        const clonedElephant = gltf.scene.clone();
        clonedElephant.position.set(pos.x, -5, pos.z);
        clonedElephant.rotation.y = Math.random() * Math.PI * 2;

        scene.add(clonedElephant);
      });
    });

    const forestPositions = [
      { x: -580, z: 280 },
      { x: -580, z: 580 },
      { x: -580, z: -10 },
      { x: -580, z: -280 },
      { x: -580, z: -580 },
    ];
    loader.load("./forest.glb", (gltf) => {
      forestPositions.forEach((pos) => {
        const clonedForest = gltf.scene.clone();
        clonedForest.scale.set(20, 20, 20);
        clonedForest.position.set(pos.x, -10, pos.z);
        scene.add(clonedForest);
      });
    });

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
          Continued construction and habitat destruction threaten tiger
          populations, reducing their numbers and forcing them closer to human
          communities. This increased proximity poses risks for both tigers and
          people, leading to potential conflicts and endangering lives on both
          sides. Protecting tiger habitats is essential for harmonious
          coexistence.
        </footer>
      }
    </div>
  );
};

export default ElephantAnim11;
