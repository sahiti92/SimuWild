import React, { useEffect, useRef, useState } from 'react';
import { Canvas, useLoader } from '@react-three/fiber';
import { OrbitControls, useGLTF, Html } from '@react-three/drei';
import { AnimationMixer } from 'three';
import { useNavigate } from 'react-router-dom';
import { TextureLoader } from 'three';
import axios from 'axios';




// Component for static models (no animation)
function StaticModel({ path, scale, position, rotation }) {
  const { scene } = useGLTF(path);
  return <primitive object={scene} scale={scale} position={position} rotation={rotation} />;
}

// Component for animated models (Man and Woman)
function AnimatedModel({ path, scale, position, rotation }) {
  const { scene, animations } = useGLTF(path);
  const mixer = useRef(null);

  useEffect(() => {
    if (animations && animations.length) {
      mixer.current = new AnimationMixer(scene);
      animations.forEach((clip) => mixer.current.clipAction(clip).play());
    }
    return () => mixer.current && mixer.current.stopAllAction();
  }, [animations, scene]);

  return <primitive object={scene} scale={scale} position={position} rotation={rotation} />;
}

// Define individual components for the models
function WetlandModel() {
  return <StaticModel path="./wetland.glb" scale={[0.1, 0.1, 0.1]} position={[0, -1.5, 0]} />;
}

// Updated Man component with position animation and error checks
function Man({ initialPosition = [0, 0, 13], stopAtX = 10 }) {
  const { scene, animations } = useGLTF('./man.glb'); // Ensure the path is correct
  const mixer = useRef(null);
  const [position, setPosition] = useState(initialPosition);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (scene && animations && animations.length > 0) {
      mixer.current = new AnimationMixer(scene);
      animations.forEach((clip) => mixer.current.clipAction(clip).play());
      setIsLoaded(true);
    }
    return () => mixer.current && mixer.current.stopAllAction();
  }, [animations, scene]);

  useEffect(() => {
    if (isLoaded) {
      const animate = () => {
        if (mixer.current) mixer.current.update(0.01);
        requestAnimationFrame(animate);
      };
      animate();
    }
  }, [isLoaded, stopAtX]);

  if (!isLoaded) {
    return <Html center>Loading Model...</Html>;
  }

  return (
    <primitive
      object={scene}
      position={position}
      scale={[0.8,0.8, 0.8]}
      rotation={[0, Math.PI / 3, 0]}
    />
  );
}

function Woman({ initialPosition = [-1, -0.9, 13], stopAtX = 10 }) {
  const { scene, animations } = useGLTF('./woman.glb'); // Ensure the path is correct
  const mixer = useRef(null);
  const [position, setPosition] = useState(initialPosition);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (scene && animations && animations.length > 0) {
      mixer.current = new AnimationMixer(scene);
      animations.forEach((clip) => mixer.current.clipAction(clip).play());
      setIsLoaded(true);
    }
    return () => mixer.current && mixer.current.stopAllAction();
  }, [animations, scene]);

  useEffect(() => {
    if (isLoaded) {
      const animate = () => {
        if (mixer.current) mixer.current.update(0.01);
        requestAnimationFrame(animate);
      };
      animate();
    }
  }, [isLoaded, stopAtX]);

  if (!isLoaded) {
    return <Html center>Loading Model...</Html>;
  }

  return (
    <primitive
      object={scene}
      position={position}
      scale={[0.8, 0.8, 0.8]}
      rotation={[0, -Math.PI / 2, 0]}
    />
  );
}

function Hut({ position }) {
  return <StaticModel path="./forest_hut.glb" scale={[0.7, 0.7, 0.7]} position={position} rotation={[0, -Math.PI / 2, 0]} />;
}


function Hut1({ position }) {
  return <StaticModel path="./forest_hut1.glb" scale={[1.4, 1.4, 1.4]} position={position} rotation={[0, -Math.PI / 2, 0]} />;
}

function SkyBackground() {
  const skyTexture = useLoader(TextureLoader, './sky2.jpg');
  return <primitive attach="background" object={skyTexture} />;
}



export default function Community() {
  const navigate=useNavigate();
  const handleRestartClick = async () => {
    try {
      console.log("Resetting progress");
      const scenarioId = 1;
      await axios.post(
        "http://localhost:8001/api/v1/progress/reset",
        { scenarioId },
        {
          headers: {
            Authorization: Bearer`${token}`,
          },
        }
      );
  
      setSelectedChoice("");
      setShowOutcomeScene(false);
      alert("Progress has been reset.");
      // navigate("/startS3")
    } catch (error) {
      console.error("Error resetting progress:", error);
      alert(
        "Failed to reset progress: " +
          (error.response?.data?.error || "Unknown error")
      );
    }
  };
  

  return (
    <div style={{ width: '100vw', height: '100vh', position: 'relative' }}>
       <button onClick={handleRestartClick}
        style={{
          position: "absolute",
          top: "10px",
          left: "10px",
          padding: "10px 15px",
          backgroundColor: "rgba(0, 0, 0, 0.8)",
          color: "#fff",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
          zIndex: 1,
        }}
      >
        ReStart 
      </button>
      <button onClick={()=>
        navigate("/sum3")}
        style={{
          position: "absolute",
          top: "10px",
          right: "10px",
          padding: "10px 15px",
          backgroundColor: "rgba(0, 0, 0, 0.8)",
          color: "#fff",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
          zIndex: 1,
        }}
      >
        Save & exit 
      </button>
      <Canvas camera={{ position: [1.8342777684506322,  2.5872701942430383, 19.477962627057785], fov: 60 }} style={{ width: '100%', height: '100%' }}>
        <ambientLight intensity={0.4} />
        <directionalLight position={[10, 10, 10]} intensity={0.8} />
        <SkyBackground />
        <WetlandModel />
        <Man initialPosition={[-2, -0.9, 13]} stopAtX={2} />
        <Woman position={[-10, -0.9, 10]} />
        <Hut position={[-9, -0.9, 8]} />
        <Hut1 position={[-9, -0.9, -2]} />
        <OrbitControls />
      </Canvas>
      <div style={textStyle}>
      <p>
        By choosing to protect without armed rangers,
        you’re witnessing communities thriving in peace, 
        free from the fear of harm.
        Yet, the fight is far from over — poaching continues, and precious rhinos fall victim, chipping away at our rich tapestry of biodiversity.
        Every loss reminds us of the urgent need to find harmony between protection and preservation.
      </p>

      </div>
    </div>
  );
}

const textStyle = {
  position: 'absolute',
  top: '100px',
  left: '20px',
  color: 'white',
  fontFamily: 'Georgia, serif',
  fontSize: '16px',
  backgroundColor: 'rgba(0, 0, 0, 0.8)',
  padding: '20px',
  borderRadius: '10px',
  maxWidth: '300px',
  lineHeight: '1.6',
  boxShadow: '0px 4px 15px rgba(0, 0, 0, 0.5)',
  letterSpacing: '0.5px',
};

