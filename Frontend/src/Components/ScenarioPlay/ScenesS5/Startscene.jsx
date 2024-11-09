import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

const Choice = () => {
  const mountRef = useRef(null);
  const mixers = useRef([]);
  const raycaster = new THREE.Raycaster();
  const pointer = new THREE.Vector2();

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

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = false;
    controls.dampingFactor = 0.25;
    controls.enableZoom = false;
    controls.autoRotate = false;
    controls.enableRotate = false;

    const textureLoader = new THREE.TextureLoader();
    textureLoader.load("/sky.jpg", (texture) => {
      scene.background = texture;
    });

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(5, 10, 7.5);
    scene.add(directionalLight);

    const loader = new GLTFLoader();
    loader.load("/pond_with_waterfalls.glb", (gltf) => {
      const pond = gltf.scene;
      pond.position.set(0, -20, 0);
      pond.rotation.y = (3 * Math.PI) / 4;
      pond.scale.set(0.09, 0.09, 0.09);
      scene.add(gltf.scene);
    });
    const positions = [
      { x: 3.4872873479019058, y: -14.585797572463743, z: -55.05079246119451 },
      { x: 48.71483756656607, y: -14.874813166262294, z: 23.27359310955085 },
      { x: -3.356801595254668, y: -13.822554141752235, z: -63.109151110065845 },
      { x: 72.49540939210733, y: -19.349649533131654, z: 8.021929175389534 },
      { x: 30.368560378520918, y: -19.826522754360735, z: -54.876039393684295 },
      { x: -15.742157033133491, y: -7.961154537941651, z: -18.298695669208197 },
      { x: 21.739298563874513, y: -20.23874112128606, z: -58.4252370920386 },
      { x: 73.04835124180053, y: -19.34964898268755, z: 4.583261367128328 },
      { x: 71.59924299021306, y: -19.82652270016006, z: 1.8978884256946325 },
      { x: 16.663790032475262, y: -11.07566148262981, z: 35.99547011345283 },
      { x: 24.318006457681438, y: -14.846558469482003, z: 25.89063755628823 },
      { x: 38.91068238785563, y: -20.238741789427984, z: -35.45412684735847 },
      { x: 19.708314131854088, y: -10.981319583042794, z: 23.62779900282069 },
    ];

    loader.load("/tree.glb", (gltf) => {
      positions.forEach((position) => {
        const tree = gltf.scene.clone(); // Clone the tree model for each position
        tree.scale.set(10, 10, 10);
        tree.position.set(position.x, position.y, position.z);
        scene.add(tree);
      });
    });

    loader.load(
      "/tiger_eat.glb",
      (gltf) => {
        const tiger = gltf.scene;
        tiger.scale.set(5, 5, 5);
        tiger.position.set(5, 0, 0);
        tiger.rotation.set(0, Math.PI / 2, 0);
        scene.add(tiger);

        const mixer = new THREE.AnimationMixer(tiger);
        mixers.current.push(mixer); // Add this mixer to mixers array
        const animations = gltf.animations;
        if (animations.length > 0) {
          const action = mixer.clipAction(animations[5]);
          action.play();
        }
      },
      (xhr) => console.log((xhr.loaded / xhr.total) * 100 + "% loaded"),
      (error) =>
        console.error("An error occurred while loading the tiger model:", error)
    );
    loader.load(
      "/tiger_eat.glb",
      (gltf) => {
        const tiger = gltf.scene;
        tiger.scale.set(5, 5, 5);
        tiger.position.set(
          6.402326122894164,
          -18.313799201048166,
          12.671123786249636
        );
        tiger.rotation.set(0, Math.PI / 2, 0);
        scene.add(tiger);

        const mixer = new THREE.AnimationMixer(tiger);
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
        console.error("An error occurred while loading the tiger model:", error)
    );

    // Load second tiger
    loader.load(
      "/tiger_eat.glb",
      (gltf) => {
        const tiger = gltf.scene;
        tiger.scale.set(5, 5, 5);
        tiger.position.set(
          -14.651698068057637,
          -17.307254118537593,
          -7.57008736567553
        );
        tiger.rotation.set(0, Math.PI / 2, 0);
        scene.add(tiger);

        const mixer = new THREE.AnimationMixer(tiger);
        mixers.current.push(mixer); // Add this mixer to mixers array
        const animations = gltf.animations;
        if (animations.length > 0) {
          const action = mixer.clipAction(animations[2]);
          action.play();
        }
      },
      (xhr) => console.log((xhr.loaded / xhr.total) * 100 + "% loaded"),
      (error) =>
        console.error("An error occurred while loading the tiger model:", error)
    );
    // Load the audio
    const listener = new THREE.AudioListener();
    camera.add(listener);

    const backgroundMusic = new THREE.Audio(listener);
    const audioLoader = new THREE.AudioLoader();
    audioLoader.load("/background-music.mp3", (buffer) => {
      backgroundMusic.setBuffer(buffer);
      backgroundMusic.setLoop(true);
      backgroundMusic.setVolume(0.5);
      backgroundMusic.play();
    });
    camera.position.set(
      -33.51605451792094,
      17.428240950418587,
      27.51766130815002
    );

    const animate = () => {
      requestAnimationFrame(animate);

      mixers.current.forEach((mixer) => mixer.update(0.01)); // Update each mixer
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
      // Calculate pointer position in normalized device coordinates
      pointer.x = (event.clientX / window.innerWidth) * 2 - 1;
      pointer.y = -(event.clientY / window.innerHeight) * 2 + 1;

      // Raycast to find intersected objects
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
      mountRef.current.removeChild(renderer.domElement);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("click", onPointerClick);
    };
  }, []);

  return (
    <div ref={mountRef} style={{ position: "relative", height: "100vh" }}>
      <button
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
        Enjoy the 3D experience of nature and wildlife
      </footer>
    </div>
  );
};

export default Choice;
