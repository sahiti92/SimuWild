import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

const ElephantAnim = () => {
  const mountRef = useRef(null); // Reference to the div container

  useEffect(() => {
    // Set up the scene, camera, and renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(100, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer();
    const clock = new THREE.Clock();

    renderer.setSize(window.innerWidth, window.innerHeight);
    mountRef.current.appendChild(renderer.domElement);

    // Set background and lights
    scene.background = new THREE.Color(0x87CEEB);
    
    const light = new THREE.DirectionalLight(0xffffff, 1);
    light.position.set(5, 5, 5).normalize();
    scene.add(light);

    const ambientLight = new THREE.AmbientLight(0x404040, 2);
    scene.add(ambientLight);

    const pointLight1 = new THREE.PointLight(0xffffff, 1, 100);
    pointLight1.position.set(0, 50, 0);
    scene.add(pointLight1);

    const pointLight2 = new THREE.PointLight(0xffffff, 1, 100);
    pointLight2.position.set(100, 50, -100);
    scene.add(pointLight2);

    // Create the ground plane
    const planeGeometry = new THREE.PlaneGeometry(1000, 1000);
    const grassPlaneMaterial = new THREE.MeshStandardMaterial({ color: 0x51A302 });
    const plane = new THREE.Mesh(planeGeometry, grassPlaneMaterial);
    plane.rotation.x = -Math.PI / 2;
    plane.position.y = -10;
    scene.add(plane);

    // Set up controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.1;
    controls.screenSpacePanning = false;
    controls.maxPolarAngle = Math.PI / 2;
    controls.minDistance = 50; // Minimum distance you can zoom in
    controls.maxDistance = 300; // Maximum distance you can zoom out
    camera.position.set(0, 50, 250);

    // Load Elephant Model
    const loader = new GLTFLoader();
    loader.load('./elephant.glb', (gltf) => {
      const model = gltf.scene;
      const elephants = [];

      const elephantPositions = [
        { x: -100, z: 100 },
        { x: -30, z: 30 },
        { x: 10, z: 0 },
        { x: 40, z: -20 },
        { x: 20, z: 180 },
      ];

      elephantPositions.forEach(pos => {
        const clonedElephant = model.clone();
        clonedElephant.position.set(pos.x, -5, pos.z);
        clonedElephant.rotation.y = Math.random() * Math.PI * 2;
        elephants.push(clonedElephant);
        scene.add(clonedElephant);
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

    // Load the Forest and Green Field Models
    loader.load('./forest.glb', (gltf) => {
      const forest = gltf.scene;
      const forestPositions = [
        { x: -50, z: 50 },
        { x: 0, z: -50 },
        { x: 100, z: 0 },
      ];

      forestPositions.forEach(pos => {
        const clonedForest = forest.clone();
        clonedForest.scale.set(20, 20, 20);
        clonedForest.position.set(pos.x, -10, pos.z);
        scene.add(clonedForest);
      });
    });

    loader.load('./green_field.glb', (gltf) => {
      const field = gltf.scene;
      field.scale.set(10, 10, 10);
      field.position.set(20, -10, 280);
      scene.add(field);

      const secondField = field.clone();
      secondField.position.set(170, -10, 150);
      scene.add(secondField);

      const thirdField = field.clone();
      thirdField.position.set(200, -10, -150);
      scene.add(thirdField);
    });

    // Animation loop
    const animate = (mixers = []) => {
      requestAnimationFrame(() => animate(mixers));
      const delta = clock.getDelta();

      mixers.forEach(mixer => mixer.update(delta));
      controls.update();
      renderer.render(scene, camera);
    };

    // Handle window resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize);

    // Clean up on unmount
    return () => {
      window.removeEventListener('resize', handleResize);
      mountRef.current.removeChild(renderer.domElement);
      renderer.dispose();
    };
  }, []);

  return <div ref={mountRef} style={{ width: '100vw', height: '100vh' }} />;
};

export default ElephantAnim;
