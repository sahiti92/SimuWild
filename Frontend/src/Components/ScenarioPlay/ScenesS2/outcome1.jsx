import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { useNavigate } from "react-router-dom";
import axios from "axios";



const Leapord_o1 = () => {
  const navigate = useNavigate();
  const mountRef = useRef(null);
  const mixers = useRef([]);
  const raycaster = new THREE.Raycaster();
  const pointer = new THREE.Vector2();
  const handleClick = async () => {
    navigate("/leapordtochoose"); //change to greeshma scenario
  };
  const handleclick2 = async () => {
    navigate("/scenarios/scenario3");
  };

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
      color: 0x006400,
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
    // loader.load("/stone.glb", (gltf) => {
    //   const fence = gltf.scene;
    //   fence.position.set(400, -10, 300);
    //   fence.scale.set(-30, 1, -30);
    //   fence.rotation.y = (3 * Math.PI) / 2;
    //   scene.add(fence);
    // });
    // loader.load(
    //   "/manleo.glb",
    //   (gltf) => {
    //     const model1 = gltf.scene;
    //     model1.scale.set(30, 20, 100);
    //     model1.position.set(-400, -10, -100);
    //     //tiger.rotation.set(0, Math.PI, 0);

    //     scene.add(model1);

    //     const mixer = new THREE.AnimationMixer(model1);
    //     mixers.current.push(mixer); // Add this mixer to mixers array
    //     const animations = gltf.animations;
    //     console.log(animations);
    //     if (animations.length > 0) {
    //       const action = mixer.clipAction(animations[0]);
    //       action.play();
    //     }
    //   },
    //   (xhr) => console.log((xhr.loaded / xhr.total) * 100 + "% loaded"),
    //   (error) =>
    //     console.error("An error occurred while loading the tiger model:", error)
    // );
    // loader.load(
    //   "/manleo.glb",
    //   (gltf) => {
    //     const model1 = gltf.scene;
    //     model1.scale.set(1, 1, 1);
    //     model1.position.set(-400, -10, -100);
    //     //tiger.rotation.set(0, Math.PI, 0);

    //     scene.add(model1);

    //     const mixer = new THREE.AnimationMixer(model1);
    //     mixers.current.push(mixer); // Add this mixer to mixers array
    //     const animations = gltf.animations;
    //     console.log(animations);
    //     if (animations.length > 0) {
    //       const action = mixer.clipAction(animations[0]);
    //       action.play();
    //     }
    //   },
    //   (xhr) => console.log((xhr.loaded / xhr.total) * 100 + "% loaded"),
    //   (error) =>
    //     console.error("An error occurred while loading the tiger model:", error)
    // );
    // loader.load(
    //   "/manleo.glb",
    //   (gltf) => {
    //     const model11 = gltf.scene;
    //     model11.scale.set(1, 1, 1);
    //     model11.position.set(-400, -10, 500);
    //     //tiger.rotation.set(0, Math.PI, 0);

    //     scene.add(model11);

    //     const mixer = new THREE.AnimationMixer(model11);
    //     mixers.current.push(mixer); // Add this mixer to mixers array
    //     const animations = gltf.animations;
    //     console.log(animations);
    //     if (animations.length > 0) {
    //       const action = mixer.clipAction(animations[0]);
    //       action.play();
    //     }
    //   },
    //   (xhr) => console.log((xhr.loaded / xhr.total) * 100 + "% loaded"),
    //   (error) =>
    //     console.error("An error occurred while loading the tiger model:", error)
    // );
    // loader.load(
    //   "/manleo.glb",
    //   (gltf) => {
    //     const model1 = gltf.scene;
    //     model1.scale.set(1, 1, 1);
    //     model1.position.set(-500, -10, 300);
    //     //tiger.rotation.set(0, Math.PI, 0);

    //     scene.add(model1);

    //     const mixer = new THREE.AnimationMixer(model1);
    //     mixers.current.push(mixer); // Add this mixer to mixers array
    //     const animations = gltf.animations;
    //     console.log(animations);
    //     if (animations.length > 0) {
    //       const action = mixer.clipAction(animations[0]);
    //       action.play();
    //     }
    //   },
    //   (xhr) => console.log((xhr.loaded / xhr.total) * 100 + "% loaded"),
    //   (error) =>
    //     console.error("An error occurred while loading the tiger model:", error)
    // );
    // const cagePositions = [
    //     { x: -150, y: -10, z: -100 },
    //     { x: -200, y: -10, z: 50 },
    //     { x: -250, y: -10, z: 100 },
    //     { x: -50, y: -10, z: -150 },
    //     { x: -300, y: -10, z: -200 },
    //     { x: -65, y: -10, z: 50 },
    //   ];
  
    //   loader.load("/message_notice.glb", (gltf) => {
    //     cagePositions.forEach((pos) => {
    //       const cageModel = gltf.scene.clone();
    //       cageModel.scale.set(0.1, 0.5, 0.5); // Adjust size as needed
    //       cageModel.position.set(pos.x, pos.y, pos.z);
    //       cageModel.rotation.y = Math.random() * Math.PI * 2; // Randomize rotation
    //       scene.add(cageModel);
    //     });
    //   });
    loader.load(
      "/manleo.glb",
      (gltf) => {
        const model1 = gltf.scene;
        model1.scale.set(0.5, 0.5, 0.5);
        model1.position.set(-450, -10, -300);
        scene.add(model1);

        const mixer = new THREE.AnimationMixer(model1);
        mixers.current.push(mixer);
        const animations = gltf.animations;
        console.log(animations);
        if (animations.length > 0) {
          const action = mixer.clipAction(animations[0]);
          action.play();
        }

        // Array of positions for the first 6 seconds
        const positions11 = [
          { x: -450, y: -10, z: -400 },
          { x: -400, y: -10, z: -400 },
          { x: -350, y: -10, z: -400 },
          { x: -300, y: -10, z: -400 },
          { x: -250, y: -10, z: -400 },
          { x: -200, y: -10, z: -400 },
        ];

        // Move the model to the positions in sequence
        positions11.forEach((pos, index) => {
          setTimeout(() => {
            model1.position.set(pos.x, pos.y, pos.z);
          }, index * 1000);
        });

        // Remove the model from the scene after 6 seconds
        // setTimeout(() => {
        //   scene.remove(model1);
        //   console.log("Model removed after 6 seconds");
        // }, 6000);
      },
      (xhr) => console.log((xhr.loaded / xhr.total) * 100 + "% loaded"),
      (error) =>
        console.error(
          "An error occurred while loading the leopard model:",
          error
        )
    );
    loader.load(
      "/manleo.glb",
      (gltf) => {
        const model1 = gltf.scene;
        model1.scale.set(0.5, 0.5, 0.5);
        model1.position.set(500, 500, 500);
        scene.add(model1);

        const mixer = new THREE.AnimationMixer(model1);
        mixers.current.push(mixer);
        const animations = gltf.animations;
        console.log(animations);
        if (animations.length > 0) {
          const action = mixer.clipAction(animations[0]);
          action.play();
        }

        // Array of positions for the first 6 seconds
        const positions11 = [
          { x: -350, y: -10, z: 50 },
          { x: -300, y: -10, z: 50 },
          { x: -250, y: -10, z: 50 },
          { x: -200, y: -10, z: 50 },
          { x: -150, y: -10, z: 50 },
          { x: -100, y: -10, z: 50 },
        ];

        // Move the model to the positions in sequence
        positions11.forEach((pos, index) => {
          setTimeout(() => {
            model1.position.set(pos.x, pos.y, pos.z);
          }, index * 1000);
        });

        // Remove the model from the scene after 6 seconds
        // setTimeout(() => {
        //   scene.remove(model1);
        //   console.log("Model removed after 6 seconds");
        // }, 6000);
      },
      (xhr) => console.log((xhr.loaded / xhr.total) * 100 + "% loaded"),
      (error) =>
        console.error(
          "An error occurred while loading the leopard model:",
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
    loader.load(
      "/cry.glb",
      (gltf) => {
        const model1 = gltf.scene;
        model1.scale.set(30, 20, 100);
        model1.position.set(-15, 2, 55);
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
      "/cry.glb",
      (gltf) => {
        const model65 = gltf.scene;
        model65.scale.set(30, 20, 100);
        model65.position.set(400, 2, -270);
        //tiger.rotation.set(0, Math.PI, 0);

        scene.add(model65);

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
      "/cry.glb",
      (gltf) => {
        const model70 = gltf.scene;
        model70.scale.set(30, 20, 100);
        model70.position.set(400, 2, -30);
        //tiger.rotation.set(0, Math.PI, 0);

        scene.add(model70);

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

    const forestPositions = [
      { x: 550, z: -600 },
      { x: 550, z: -540 },
      { x: 550, z: -470 },
      { x: 550, z: -400 },
      { x: 550, z: -330 },
      { x: 550, z: -260 },
      { x: 550, z: -190 },
      { x: 550, z: -120 },
      { x: 550, z: -50 },
      { x: 550, z: 20 },
      { x: 550, z: 90 },
      { x: 550, z: 160 },
      { x: 550, z: 230 },
      { x: 550, z: 300 },
      { x: 550, z: 370 },
      { x: 550, z: 440 },
      { x: 550, z: 510 },
      { x: 550, z: 580 },
    ];
    loader.load("/stone.glb", (gltf) => {
      forestPositions.forEach((pos) => {
        const clonedForest = gltf.scene.clone();
        clonedForest.scale.set(30, 5, 10);
        clonedForest.position.set(pos.x, -20, pos.z);
        scene.add(clonedForest);
      });
    });

    const forPositions = [
      { x: -400, z: 0 },
      { x: -400, z: 70 },
      { x: -400, z: 140 },
      { x: -400, z: 210 },
      { x: -400, z: 280 },
      { x: -400, z: 350 },
      { x: -400, z: 420 },
      { x: -400, z: 490 },
      { x: -400, z: 560 },
      { x: -400, z: -70 },
      { x: -400, z: -140 },
      { x: -400, z: -210 },
      { x: -400, z: -280 },
      { x: -400, z: -350 },
      { x: -400, z: -420 },
      { x: -400, z: -490 },
      { x: -400, z: -560 },
      { x: -550, z: 0 },
      { x: -550, z: 70 },
      { x: -550, z: 140 },
      { x: -550, z: 210 },
      { x: -550, z: 280 },
      { x: -550, z: 350 },
      { x: -550, z: 420 },
      { x: -550, z: 490 },
      { x: -550, z: 560 },
      { x: -550, z: -70 },
      { x: -550, z: -140 },
      { x: -550, z: -210 },
      { x: -550, z: -280 },
      { x: -550, z: -350 },
      { x: -550, z: -420 },
      { x: -550, z: -490 },
      { x: -550, z: -560 },
    ];
    loader.load("/oak_10.glb", (gltf) => {
      forPositions.forEach((pos) => {
        const clonedForest = gltf.scene.clone();
        clonedForest.scale.set(100, 50, 100);
        clonedForest.position.set(pos.x, -10, pos.z);
        scene.add(clonedForest);
      });
    });

    const fPositions = [
      { x: 550, z: -600 },
      { x: 550, z: -540 },
      { x: 550, z: -470 },
      { x: 550, z: -400 },
      { x: 550, z: -330 },
      { x: 550, z: -260 },
      { x: 550, z: -190 },
      { x: 550, z: -120 },
      { x: 550, z: -50 },
      { x: 550, z: 20 },
      { x: 550, z: 90 },
      { x: 550, z: 160 },
      { x: 550, z: 230 },
      { x: 550, z: 300 },
      { x: 550, z: 370 },
      { x: 550, z: 440 },
      { x: 550, z: 510 },
      { x: 550, z: 580 },
    ];
    loader.load("/slab.glb", (gltf) => {
      fPositions.forEach((pos) => {
        const clonedForest = gltf.scene.clone();
        clonedForest.scale.set(10, 5, 10);
        clonedForest.position.set(pos.x, -5, pos.z);
        scene.add(clonedForest);
      });
    });
    const Position = [
      { x: 450, z: -600 },
      { x: 450, z: -300 },
      { x: 450, z: 0 },
      { x: 450, z: 300 },
      { x: 450, z: 600 },
    ];
    loader.load("/playground.glb", (gltf) => {
      Position.forEach((pos) => {
        const clonedForest = gltf.scene.clone();
        clonedForest.scale.set(20, 30, 20);
        clonedForest.position.set(pos.x, -5, pos.z);
        scene.add(clonedForest);
      });
    });
    // const noticeboardPositions = [
    //   { x: -150, y: -10, z: -100 },
    //   { x: -200, y: -10, z: 50 },
    //   { x: -250, y: -10, z: 100 },
    //   { x: -50, y: -10, z: -150 },
    //   { x: -300, y: -10, z: -200 },
    //   { x: -65, y: -10, z: 50 },
    // ];

    // loader.load("/noticeboard.glb", (gltf) => {
    //   noticeboardPositions.forEach((pos) => {
    //     const noticeboardModel = gltf.scene.clone();
    //     noticeboardModel.scale.set(0.1, 0.5, 0.5); // Adjust size as needed
    //     noticeboardModel.position.set(pos.x, pos.y, pos.z);
    //     noticeboardModel.rotation.y = Math.random() * Math.PI * 2; // Randomize rotation
    //     scene.add(noticeboardModel);
    //   });
    // });

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

  return (
    <div
  ref={mountRef}
  style1={{
    position: "relative",
    height: "100vh",
  }}
>
  <div
    style={{
      position: "absolute",
      top: "150px", // Adjust this value to move the box vertically
      left: "60%",
      transform: "translateX(-50%)", // Center horizontally
      color: "white",
      backgroundColor: "rgba(0, 0, 0, 0.7)",
      padding: "10px", // Reduced padding for a smaller box
      borderRadius: "8px",
      textAlign: "center",
      fontSize: "16px", // Adjust font size for smaller text
      maxWidth: "60%", // Reduced maxWidth for a smaller box
    }}
  >
    <p>
     We are trying to set up notice boards and also awareness campaigns to the people and also provide security during the nights to prevent further killings.We are also installing cc cameras aroung the town to track the moemnts of the tigers into the town so as to take measures.
    </p>
  </div>

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
        ReStart
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
        Save and Exit
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
        To prevent any further risks,the officials have come to the town to educate people. They want to create awareness among people to discuss about
        the safety of them and also the tigers without causing damge for the tigers habitat. Also to take preventive measures to avoid any other killings.
      </footer>
    </div>
  );
};

export default Leapord_o1;