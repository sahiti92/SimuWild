import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

const LeopardScene = () => {
  const mountRef = useRef(null);

  useEffect(() => {
    const scene = new THREE.Scene();

    // Camera setup
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.set(10, 5, 20); // Position to frame leopard and surroundings

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMap.enabled = true; // Enable shadows for depth
    mountRef.current.appendChild(renderer.domElement);

    // Add ambient and directional light for sunlight filtering
    const ambientLight = new THREE.AmbientLight(0x404040, 0.5); // Soft light for forest ambient
    scene.add(ambientLight);

    const sunLight = new THREE.DirectionalLight(0xffe0b3, 1);
    sunLight.position.set(10, 20, 10);
    sunLight.castShadow = true;
    scene.add(sunLight);

    // Add forest trees
    const treeLoader = new GLTFLoader();
    treeLoader.load("/tree.glb", (gltf) => {
      const tree = gltf.scene;
      tree.scale.set(3, 3, 3);
      tree.position.set(-5, 0, -5);
      scene.add(tree);

      // Clone trees for forest effect
      for (let i = 0; i < 10; i++) {
        const cloneTree = tree.clone();
        cloneTree.position.set(
          Math.random() * 20 - 10,
          0,
          Math.random() * 20 - 10
        );
        scene.add(cloneTree);
      }
    });

    // Add leopard model
    const leopardLoader = new GLTFLoader();
    leopardLoader.load("/leapord.glb", (gltf) => {
      const leopard = gltf.scene;
      leopard.scale.set(1.5, 1.5, 1.5);
      leopard.position.set(0, 0, 10);
      leopard.rotation.set(0, Math.PI / 2, 0);
      scene.add(leopard);
    });

    // Add children and dog models in background
    const childLoader = new GLTFLoader();
    childLoader.load("/child.glb", (gltf) => {
      const child = gltf.scene;
      child.scale.set(1, 1, 1);
      child.position.set(-8, 0, 15);
      scene.add(child);
    });

    const dogLoader = new GLTFLoader();
    dogLoader.load("/dog.glb", (gltf) => {
      const dog = gltf.scene;
      dog.scale.set(1, 1, 1);
      dog.position.set(-5, 0, 12);
      scene.add(dog);
    });

    // Camera controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;

    // Animation loop
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

    // Cleanup
    return () => {
      mountRef.current.removeChild(renderer.domElement);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return <div ref={mountRef} style={{ width: "100vw", height: "100vh" }} />;
};

export default LeopardScene;
