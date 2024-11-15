import React, { useEffect, useRef, useState } from 'react';
import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import { OrbitControls, useGLTF,Html } from '@react-three/drei';
import { TextureLoader } from 'three';

// Component for static models (no animation)
function StaticModel({ path, scale, position, rotation }) {
  const { scene } = useGLTF(path);
  return <primitive object={scene} scale={scale} position={position} rotation={rotation} />;
}


// Poacher model
function Poacher({ position }) {
  const { scene } = useGLTF('./swat.glb'); // Replace with actual path
  return (
    <primitive
      object={scene}
      scale={[1.5, 1.5, 1.5]}
      position={position}
      rotation={[0, Math.PI / 3, 0]}
    />
  );
}

// Syringe model with animation logic
function Syringe({ position, onHit }) {
  const syringeRef = useRef();
  const [fired, setFired] = useState(false);
  const [syringePosition, setSyringePosition] = useState(position);

  useFrame(() => {
    if (fired && syringePosition[0] > -5) {
      setSyringePosition(([x, y, z]) => [x-0.1, y, z]);
    }
    if (syringePosition[0] <= -5) {
      onHit();
      setFired(false); // Stop further movement after hitting
    }
  });

  return (
    <primitive
      ref={syringeRef}
      object={useGLTF('./syringe.glb').scene} // Replace with actual path
      scale={[3, 3, 3]}
      position={syringePosition}
      rotation={[0,-Math.PI/7, 0]}
      onClick={() => setFired(true)} // Trigger the syringe movement on click
    />
  );
}

// Rhino model with falling animation
function Rhino({ position, hasFallen }) {
  const rhinoRef = useRef();
  const [falling, setFalling] = useState(false);

  useEffect(() => {
    if (hasFallen) {
      setTimeout(() => setFalling(true), 500); // Trigger fall after delay
    }
  }, [hasFallen]);

  useFrame(() => {
    if (falling && rhinoRef.current.rotation.x < Math.PI / 2) {
      rhinoRef.current.rotation.x += 0.02; // Simulate falling rotation
    }
  });

  return (
    <group ref={rhinoRef} position={position}>
      <StaticModel path="./rhino_walking.glb" scale={[6, 6, 6]} />
    </group>
  );
}

// Sky Background
function SkyBackground() {
  const skyTexture = useLoader(TextureLoader, './sky2.jpg');
  return <primitive attach="background" object={skyTexture} />;
}

// Wetland Scene
export default function PoacherScene() {
  const [rhinoHit, setRhinoHit] = useState(false);

  return (
    <div style={{ width: '100vw', height: '100vh', position: 'relative' }}>
      <Canvas camera={{ position: [0.99, 3.73, 21.52], fov: 60 }} style={{ width: '100%', height: '100%' }}>
        <ambientLight intensity={0.4} />
        <directionalLight position={[10, 10, 10]} intensity={0.8} />
        <SkyBackground />
        <StaticModel path="./wetland.glb" scale={[0.1, 0.1, 0.1]} position={[0, -1.5, 0]} />
        <Poacher position={[0, 1, 0]} />
        <Syringe position={[8, 0, 2]} onHit={() => setRhinoHit(true)} />
        <Rhino position={[9, -1, 2]} hasFallen={rhinoHit} />

        <OrbitControls />
      </Canvas>
    </div>
  );
}
