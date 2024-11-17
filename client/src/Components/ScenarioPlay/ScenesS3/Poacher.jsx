// import React, { useEffect, useRef, useState } from 'react';
// import { Canvas, useFrame, useLoader } from '@react-three/fiber';
// import { OrbitControls, useGLTF,Html } from '@react-three/drei';
// import { TextureLoader } from 'three';

// // Component for static models (no animation)
// function StaticModel({ path, scale, position, rotation }) {
//   const { scene } = useGLTF(path);
//   return <primitive object={scene} scale={scale} position={position} rotation={rotation} />;
// }


// // Poacher model
// function Poacher({ position }) {
//   const { scene } = useGLTF('./swat.glb'); // Replace with actual path
//   return (
//     <primitive
//       object={scene}
//       scale={[1.5, 1.5, 1.5]}
//       position={position}
//       rotation={[0, Math.PI / 3, 0]}
//     />
//   );
// }

// // Syringe model with animation logic
// function Syringe({ position, onHit }) {
//   const syringeRef = useRef();
//   const [fired, setFired] = useState(false);
//   const [syringePosition, setSyringePosition] = useState(position);

//   useFrame(() => {
//     if (fired && syringePosition[0] > -5) {
//       setSyringePosition(([x, y, z]) => [x-0.1, y, z]);
//     }
//     if (syringePosition[0] <= -5) {
//       onHit();
//       setFired(false); // Stop further movement after hitting
//     }
//   });

//   return (
//     <primitive
//       ref={syringeRef}
//       object={useGLTF('./syringe.glb').scene} // Replace with actual path
//       scale={[3, 3, 3]}
//       position={syringePosition}
//       rotation={[0,-Math.PI/7, 0]}
//       onClick={() => setFired(true)} // Trigger the syringe movement on click
//     />
//   );
// }

// // Rhino model with falling animation
// function Rhino({ position, hasFallen }) {
//   const rhinoRef = useRef();
//   const [falling, setFalling] = useState(false);

//   useEffect(() => {
//     if (hasFallen) {
//       setTimeout(() => setFalling(true), 500); // Trigger fall after delay
//     }
//   }, [hasFallen]);

//   useFrame(() => {
//     if (falling && rhinoRef.current.rotation.x < Math.PI / 2) {
//       rhinoRef.current.rotation.x += 0.02; // Simulate falling rotation
//     }
//   });

//   return (
//     <group ref={rhinoRef} position={position}>
//       <StaticModel path="./rhino_walking.glb" scale={[6, 6, 6]} />
//     </group>
//   );
// }

// // Sky Background
// function SkyBackground() {
//   const skyTexture = useLoader(TextureLoader, './sky2.jpg');
//   return <primitive attach="background" object={skyTexture} />;
// }

// // Wetland Scene
// export default function PoacherScene() {
//   const [rhinoHit, setRhinoHit] = useState(false);

//   return (
//     <div style={{ width: '100vw', height: '100vh', position: 'relative' }}>

//       <Canvas camera={{ position: [0.99, 3.73, 21.52], fov: 60 }} style={{ width: '100%', height: '100%' }}>
//         <ambientLight intensity={0.4} />
//         <directionalLight position={[10, 10, 10]} intensity={0.8} />
//         <SkyBackground />
//         <StaticModel path="./wetland.glb" scale={[0.1, 0.1, 0.1]} position={[0, -1.5, 0]} />
//         <Poacher position={[0, 1, 0]} />
//         <Syringe position={[8, 0, 2]} onHit={() => setRhinoHit(true)} />
//         <Rhino position={[9, -1, 2]} hasFallen={rhinoHit} />

//         <OrbitControls />
//       </Canvas>
//     </div>
//   );
// }
import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { useNavigate } from "react-router-dom";
const PoacherScene = () => {
  const mountRef = useRef(null);
  const mixers = useRef([]);
  const [syringeMoving, setSyringeMoving] = useState(false);
  const syringeRef = useRef(null);
  const rhinoRef = useRef(null);
  const rhinoFallTimer = useRef(null); // Timer for triggering rhino fall
const navigate=useNavigate();
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

    const light = new THREE.DirectionalLight(0xffffff, 1);
    light.position.set(10, 10, 10);
    scene.add(light);
    scene.add(new THREE.AmbientLight(0x404040));

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;

    camera.position.set(0, 5, 20);
    controls.update();

    // Load sky background
    const textureLoader = new THREE.TextureLoader();
    textureLoader.load("./sky2.jpg", (texture) => {
      scene.background = texture;
    });

    // Load models
    const loader = new GLTFLoader();

    // Static Wetland Model
    loader.load("./wetland.glb", (gltf) => {
      const wetland = gltf.scene;
      wetland.scale.set(0.1, 0.1, 0.1);
      wetland.position.set(0, -1.5, 0);
      scene.add(wetland);
    });
    const positions1 = [
      { x: 4, y: 0, z: 2 },
      { x: 4, y: 0, z: 2 },
      { x: 7, y: 0, z: 2 },
      { x: 8, y: 0, z: 2 }
    ];
    // Poacher Model
    loader.load("./swat.glb", (gltf) => {
      const poacher = gltf.scene;
      poacher.scale.set(2, 1.5, 1.5);
      poacher.position.set(1, 1, 5);
      scene.add(poacher);
    });

    // Syringe Model with Animation
    let syringe;
    loader.load("./syringe.glb", (gltf) => {
      syringe = gltf.scene;
      syringe.scale.set(3, 3, 3);
      syringe.position.set(4, 0, 2);
      syringeRef.current = syringe; // Reference to syringe object
      scene.add(syringe);
      const mixer = new THREE.AnimationMixer(syringe);
      mixers.current.push(mixer);
      const animations = gltf.animations;

      if (animations.length > 0) {
        const action = mixer.clipAction(animations[1]);
        action.play();
      }

      // Syringe movement path
     

      let syringeIndex = 0;

      // Function to move syringe
      function moveSyringe() {
        if (syringeIndex < positions1.length) {
          syringe.position.set(
            positions1[syringeIndex].x,
            positions1[syringeIndex].y,
            positions1[syringeIndex].z
          );
          syringeIndex++;
        }
      }

      // Move syringe every second
      const syringeInterval = setInterval(() => {
        moveSyringe();
      }, 1000);

      // Cleanup interval
      return () => clearInterval(syringeInterval);
    });
    loader.load("./rhino_walking.glb", (gltf) => {
      const rhino = gltf.scene;
      rhino.scale.set(6, 6, 6);
      rhino.position.set(9, -1, 2);
      rhinoRef.current = rhino;
      scene.add(rhino);

      function animateRhino() {
        if (
          Math.abs(syringeRef.current.position.x - positions1[positions1.length - 1].x) < 0.5 &&
          Math.abs(syringeRef.current.position.y - positions1[positions1.length - 1].y) < 0.5 &&
          Math.abs(syringeRef.current.position.z - positions1[positions1.length - 1].z) < 0.5
        ) {
          rhino.rotation.x += 0.02;
          if (rhino.rotation.x >= Math.PI / 2) {
            rhino.rotation.x = Math.PI / 2;
            navigate("/choice32");
          }
        }
        
      }
      renderer.setAnimationLoop(() => {
        controls.update();
        animateRhino();
        renderer.render(scene, camera);
      });
    });

    // Cleanup
    return () => {
      renderer.dispose();
      clearTimeout(rhinoFallTimer.current);
    };
  }, []);

  return <div ref={mountRef} style={{ width: "100vw", height: "100vh" }} />;
};

export default PoacherScene;
