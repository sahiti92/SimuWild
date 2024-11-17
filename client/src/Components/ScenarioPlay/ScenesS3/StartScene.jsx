import React, { useState, useEffect, useRef } from 'react';
import { Canvas, useLoader } from '@react-three/fiber';
import { OrbitControls, useGLTF, Html } from '@react-three/drei';
import { TextureLoader, AnimationMixer } from 'three';
import { useNavigate } from 'react-router-dom';
import './scene.css';
import axios from 'axios';

function WetlandModel() {
  const { scene } = useGLTF('./wetland.glb'); // Replace with actual path
  return <primitive object={scene} scale={[0.1, 0.1, 0.1]} position={[0, -1.1, 0]} />;
}

function Army({ position }) {
  const { scene } = useGLTF('./army.glb'); // Replace with actual path
  return <primitive object={scene} scale={[0.25, 0.25, 0.25]} position={position} />;
}
function Poacher({ position }) {
    const { scene } = useGLTF('./swat.glb'); // Replace with actual path
    return (
        <primitive
          object={scene}
          scale={[1, 1, 1]}
          position={position}
          rotation={[0, Math.PI / 3, 0]}
        />
      );
  }

function Army1({ position }) {
  const { scene } = useGLTF('./army1.glb');
  return <primitive object={scene} scale={[0.25, 0.25, 0.25]} position={position} rotation={[0, Math.PI / 2, 0]} />;
}

function Ranger({ position }) {
  const { scene } = useGLTF('./soldier.glb'); // Replace with actual path
  return (
    <primitive
      object={scene}
      scale={[0.4, 0.4, 0.4]}
      position={position}
      rotation={[0, -Math.PI / 2, 0]}
    />
  );
}
function Man({ initialPosition = [0, 0, 13], stopAtX = 10 }) {
  const { scene, animations } = useGLTF('./falls.glb'); // Ensure the path is correct
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
      rotation={[0,0, 0]}
    />
  );
}

  function RangerLabel({ position, label }) {
    return (
      <Html position={position}>
        <div style={{ color: 'white', fontWeight: 'bold', background: 'rgba(0, 0, 0, 0.5)', padding: '5px', borderRadius: '5px' }}>
          {label}
        </div>
      </Html>
    );
  }
  

function RhinoModel({ initialPosition, stopAtX }) {
  const { scene, animations } = useGLTF('./rhino_walking.glb'); // Replace with actual path
  const mixer = useRef();
  const [position, setPosition] = useState(initialPosition);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (animations && animations.length) {
      mixer.current = new AnimationMixer(scene);
      animations.forEach((clip) => mixer.current.clipAction(clip).play());
      setIsLoaded(true);
    }
    return () => mixer.current?.stopAllAction();
  }, [animations, scene]);

  useEffect(() => {
    if (isLoaded) {
      const animate = () => {
        setPosition((prevPosition) => {
          if (prevPosition[0] < stopAtX) {
            return [prevPosition[0] + 0.02, prevPosition[1], prevPosition[2]];
          }
          return prevPosition;
        });
        mixer.current.update(0.01);
        requestAnimationFrame(animate);
      };
      animate();
    }
  }, [isLoaded, stopAtX]);

  if (!isLoaded) {
    return <Html center>Loading Rhino...</Html>;
  }

  return (
    <primitive
      object={scene}
      position={position}
      scale={[5, 5, 5]}
    />
  );
}
function RhinoModel1({ initialPosition, stopAtX,model }) {
    const { scene, animations } = useGLTF(model); // Replace with actual path
    const mixer = useRef();
    const [position, setPosition] = useState(initialPosition);
    const [isLoaded, setIsLoaded] = useState(false);
  
    useEffect(() => {
      if (animations && animations.length) {
        mixer.current = new AnimationMixer(scene);
        animations.forEach((clip) => mixer.current.clipAction(clip).play());
        setIsLoaded(true);
      }
      return () => mixer.current?.stopAllAction();
    }, [animations, scene]);
  
    useEffect(() => {
      if (isLoaded) {
        const animate = () => {
          setPosition((prevPosition) => {
            if (prevPosition[0] < stopAtX) {
              return [prevPosition[0] + 0.02, prevPosition[1], prevPosition[2]];
            }
            return prevPosition;
          });
          mixer.current.update(0.01);
          requestAnimationFrame(animate);
        };
        animate();
      }
    }, [isLoaded, stopAtX]);
  
    if (!isLoaded) {
      return <Html center>Loading Rhino...</Html>;
    }
  
    return (
      <primitive
        object={scene}
        position={position}
        scale={[5, 5, 5]}
      />
    );
  }

function SkyBackground() {
  const skyTexture = useLoader(TextureLoader, './nightsky.jpg');
  return <primitive attach="background" object={skyTexture} />;
}


export default function WetlandScene() {
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
      <Canvas camera={{ position: [  0.9899899089498954,  3.7358062169044195,  21.522211247685103], fov: 60 }} style={{ width: '100%', height: '100%' }} onCreated={({ camera }) => (cameraRef.current = camera)}>
        <SkyBackground />
        <ambientLight intensity={0.4} />
        <directionalLight position={[10, 10, 10]} intensity={0.8} />

        <WetlandModel />
        <Army position={[-3, -0.9, 9]} />
        <Army1 position={[-2, -0.9, 9]} />
        
        {/* Ranger with label */}
        <Ranger position={[-5, -0.9, 12]} />
        <Poacher position={[0, 0, 0]} />
        <RangerLabel position={[-5, 1.75, 12]} label={"Ranger"}/>
        <RangerLabel position={[0, 1.75, 0]} label={"Poacher"}/>
        <Man position={[-3, -0.9, 15]}/>

        {/* Rhino models */}
        <RhinoModel initialPosition={[0, -1, 2]} stopAtX={10} />
        <RhinoModel1 initialPosition={[0, -1, 4]} stopAtX={10} model={'./rhino_walking1.glb'}/>
        <RhinoModel1 initialPosition={[0, -1, 6]} stopAtX ={14} model={'./rhino_walking2.glb'}/>

       
        <OrbitControls  onChange={() => {
            console.log(`Camera position: x: ${cameraRef.current.position.x}, y: ${cameraRef.current.position.y}, z: ${cameraRef.current.position.z}`);
          }}/>
      </Canvas>
      <div style={textStyle}>
      <p>
  As you observe, the presence of strict army ranger patrols has heightened security; however, challenges remain. During nighttime operations, distinguishing between civilians and poachers can become difficult, occasionally leading to unintended consequences for local residents due to stringent enforcement protocols.
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
