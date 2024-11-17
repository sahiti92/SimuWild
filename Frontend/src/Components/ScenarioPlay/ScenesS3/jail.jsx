import React, { useRef,useState,useEffect } from 'react';
import { Canvas, useFrame, useLoader, useThree } from '@react-three/fiber';
import { OrbitControls, useGLTF,Html } from '@react-three/drei';
import { TextureLoader,AnimationMixer,LoopOnce } from 'three';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';


function StaticModel({ path, scale, position, rotation }) {
  const { scene } = useGLTF(path);
  return <primitive object={scene} scale={scale} position={position} rotation={rotation} />;
}


function Poacher({ position }) {
  const { scene } = useGLTF('./swat.glb'); // Replace with actual path of your poacher model
  return (
    <primitive
      object={scene}
      scale={[75, 75, 75]}
      position={position}
      rotation={[0, Math.PI / 3, 0]}
    />
  );
}


function Jail() {
  const { scene } = useGLTF('./prision.glb'); // Replace with your jail model path
  return <primitive object={scene} scale={[1, 1, 1]} position={[0, 0, 0]} />;
}

function Man({ initialPosition, stopAtX = 10,model }) {
    const { scene, animations } = useGLTF(model); // Ensure the path is correct
    const mixer = useRef(null);
    const [position, setPosition] = useState(initialPosition);
    const [isLoaded, setIsLoaded] = useState(false);
    const [animationEnded, setAnimationEnded] = useState(false);
  
    useEffect(() => {
      if (scene && animations && animations.length > 0) {
        mixer.current = new AnimationMixer(scene);
  
        // Play the animation only once and stop at the last frame
        const action = mixer.current.clipAction(animations[0]);
        action.setLoop(LoopOnce, 1); // Play once
        action.clampWhenFinished = true; // Freeze on the last frame
        action.play();
  
        // Listen for the animation finish event
        mixer.current.addEventListener('finished', () => {
          setAnimationEnded(true); // Stop updating once animation ends
        });
  
        setIsLoaded(true);
      }
  
      return () => mixer.current && mixer.current.stopAllAction(); // Cleanup on unmount
    }, [animations, scene]);
  
    // Update animation mixer in the render loop
    useEffect(() => {
      if (isLoaded && !animationEnded) {
        const animate = () => {
          if (mixer.current) mixer.current.update(0.01);
          if (!animationEnded) requestAnimationFrame(animate); // Stop requesting frames when done
        };
        animate();
      }
    }, [isLoaded, animationEnded]);
  
    if (!isLoaded) {
      return <Html center>Loading Model...</Html>;
    }
  
    return (
      <primitive
        object={scene}
        position={position}
        scale={[0.8, 0.8, 0.8]}
        rotation={[0, 0, 0]}
      />
    );
  }

// Sky Background
function SkyBackground() {
  const skyTexture = useLoader(TextureLoader, './sky2.jpg');
  return <primitive attach="background" object={skyTexture} />;
}
function CameraLogger() {
  const { camera } = useThree(); 
  useFrame(() => {
    console.log(`Camera position: x: ${camera.position.x}, y: ${camera.position.y}, z: ${camera.position.z}`);
  });

  return null;
}


export default function PoacherScene() {
    const navigate = useNavigate();
    const cameraRef = useRef();
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
        navigate("/startS3")
      } catch (error) {
        console.error("Error resetting progress:", error);
        alert(
          "Failed to reset progress: " +
            (error.response?.data?.error || "Unknown error")
        );
      }
    };
    const handleExitClick = () => {
         navigate("/scenarios");
     };
     function CameraLogger() {
        const { camera } = useThree(); 
        useFrame(() => {
          console.log(`Camera position: x: ${camera.position.x}, y: ${camera.position.y}, z: ${camera.position.z}`);
        });
      
        return null;
      }
  return (
    <div style={{ width: '100vw', height: '100vh', display: 'flex' }}>
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
      <button onClick={handleExitClick}
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
      {/* Left side: Scene with Poacher */}
      <div style={{ width: '50%', height: '100%', position: 'relative' }}>
        <Canvas camera={{ position: [0, 3, 5], fov: 60 }} style={{ width: '100%', height: '100%' }}>
          <ambientLight intensity={0.4} />
          <directionalLight position={[10, 10, 10]} intensity={0.8} />
          <SkyBackground />
          <StaticModel path="./wetland.glb" scale={[0.1, 0.1, 0.1]} position={[0, -1.5, 0]} />
          <Man initialPosition={[0,-0.9,0]} model={'./falls.glb'}/>
          <Man initialPosition={[4,-0.9,-10]} model={'./falls1.glb'}/>
          <OrbitControls />
        </Canvas>
      </div>

      {/* Right side: Jail model with Poacher inside */}
      <div style={{ width: '50%', height: '100%', position: 'relative', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
        <h2 style={{ color: 'white', textAlign: 'center', marginTop: '20px' }}>Poacher in Jail</h2>
        <Canvas camera={{ position: [-3.7543592335255678, 48.30689072400026,  -314.9330744666589], fov: 60 }} style={{ width: '100%', height: '100%' }}>
          <ambientLight intensity={0.4} />
          <directionalLight position={[10, 10, 10]} intensity={0.8} />
          <SkyBackground />
          <Jail />
          <Poacher position={[-30, 17, 20]} /> {/* Poacher inside the jail */}
          <OrbitControls />
          <CameraLogger /> {/* Track and log camera position */}
        </Canvas>
        <div style={textStyle}>
        <p>
          There exists a disease that can only be cured using rhino horns.
          However, due to the extinction of rhinos, no cure is available, resulting in the loss of human lives. 
          Meanwhile, you face imprisonment for your role in the killing of rhinos, which contributed to their extinction.
        </p>

   </div>
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