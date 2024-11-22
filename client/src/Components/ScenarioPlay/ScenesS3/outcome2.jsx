import React, { useState, useEffect, useRef } from "react";
import { Canvas, useLoader } from "@react-three/fiber";
import { OrbitControls, useGLTF, Html } from "@react-three/drei";
import { TextureLoader, AnimationMixer, LoopOnce } from "three";
import { useNavigate } from "react-router-dom";
import "./scene.css";
import axios from "axios";

// Wetland Model
function WetlandModel() {
  const { scene } = useGLTF("./wetland.glb"); // Replace with actual path
  return (
    <primitive object={scene} scale={[0.1, 0.1, 0.1]} position={[0, -1.1, 0]} />
  );
}
function Truck() {
  const { scene } = useGLTF("./truck.glb"); // Replace with actual path
  return (
    <primitive
      object={scene}
      scale={[1, 1, 1]}
      position={[-6, -0.9, 9]}
      rotation={[0, -Math.PI / 2, 0]}
    />
  );
}

// Army Model
function Army({ position }) {
  const { scene } = useGLTF("./army.glb"); // Replace with actual path
  return (
    <primitive object={scene} scale={[0.25, 0.25, 0.25]} position={position} />
  );
}

// Poacher Model
function Poacher({ position }) {
  const { scene } = useGLTF("./swat.glb"); // Replace with actual path
  return (
    <primitive
      object={scene}
      scale={[1, 1, 1]}
      position={position}
      rotation={[0, Math.PI / 3, 0]}
    />
  );
}

// Army1 Model
function Army1({ position }) {
  const { scene } = useGLTF("./army1.glb");
  return (
    <primitive
      object={scene}
      scale={[0.25, 0.25, 0.25]}
      position={position}
      rotation={[0, Math.PI / 2, 0]}
    />
  );
}

// Ranger Model with Label
function Ranger({ position }) {
  const { scene } = useGLTF("./soldier.glb"); // Replace with actual path
  return (
    <primitive
      object={scene}
      scale={[0.4, 0.4, 0.4]}
      position={position}
      rotation={[0, -Math.PI / 2, 0]}
    />
  );
}

// Man Model
function Man({ initialPosition = [6, 0, 14], stopAtX = 10 }) {
  const { scene, animations } = useGLTF("./falls.glb"); // Ensure the path is correct
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
      mixer.current.addEventListener("finished", () => {
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
function RangerLabel({ position, label }) {
  return (
    <Html position={position}>
      <div
        style={{
          color: "white",
          fontWeight: "bold",
          background: "rgba(0, 0, 0, 0.5)",
          padding: "5px",
          borderRadius: "5px",
        }}
      >
        {label}
      </div>
    </Html>
  );
}
// Rhino Model
function RhinoModel({ initialPosition, stopAtX, model }) {
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

  return <primitive object={scene} position={position} scale={[5, 5, 5]} />;
}

// Sky Background
function SkyBackground() {
  const skyTexture = useLoader(TextureLoader, "./nightsky.jpg");
  return <primitive attach="background" object={skyTexture} />;
}

// Main Scene Component with Delayed Loading
export default function WetlandScene1() {
  const navigate = useNavigate();
  const cameraRef = useRef();
  const [showPoacher, setShowPoacher] = useState(false);
  const [showArmy, setShowArmy] = useState(false);
  const [showArmy1, setShowArmy1] = useState(false);
  const [showman, setShowman] = useState(false);
  const [showIntroText, setShowIntroText] = useState(true);

  useEffect(() => {
    setTimeout(() => setShowIntroText(false), 5000);
    setTimeout(() => setShowPoacher(true), 10000);
    setTimeout(() => setShowArmy(true), 6000); // Show Army after 6 seconds
    setTimeout(() => setShowArmy1(true), 9000); // Show Army1 after 9 seconds
    setTimeout(() => setShowman(true), 12000); // Show man after 12 secondss
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
      navigate("/startS3");
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
    <div style={{ width: "100vw", height: "100vh", position: "relative" }}>
      <div style={textStyle}>
        <p>
          There will be individuals living peacefully in the park, but armed
          rangers may mistakenly perceive them as poachers and take lethal
          action, while the actual poachers continue to kill rhinos.
        </p>
      </div>
      <button
        onClick={handleRestartClick}
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
      <button
        onClick={handleExitClick}
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

      <Canvas
        camera={{ position: [0.99, 3.73, 21.52], fov: 60 }}
        style={{ width: "100%", height: "100%" }}
        onCreated={({ camera }) => (cameraRef.current = camera)}
      >
        <SkyBackground />
        <ambientLight intensity={0.4} />
        <directionalLight position={[10, 10, 10]} intensity={0.8} />

        <WetlandModel />
        <Truck />
        {showArmy && <Army position={[-3, 0.8, 9]} />}
        {showArmy1 && <Army1 position={[-2, -0.9, 9]} />}
        <Ranger position={[-5, -0.9, 12]} />
        {showPoacher && <Poacher position={[0, 0, 0]} />}
        <RangerLabel position={[-5, 1.75, 12]} label={"Ranger"} />
        <RangerLabel position={[0, 1.75, 0]} label={"Poacher"} />
        {showman && <Man position={[6, -0.9, 15]} />}
        <RhinoModel
          initialPosition={[0, -1, 2]}
          stopAtX={10}
          model={"./rhino_walking.glb"}
        />
        <RhinoModel
          initialPosition={[0, -1, 4]}
          stopAtX={8}
          model={"./rhino_walking1.glb"}
        />
        <OrbitControls />
      </Canvas>
    </div>
  );
}
// Define the style object
export const textStyle = {
  position: "absolute",
  top: "200px",
  left: "350px",
  color: "white",
  fontFamily: "Georgia, serif",
  fontSize: "16px",
  backgroundColor: "rgba(0, 0, 0, 0)",
  padding: "20px",
  borderRadius: "10px",
  maxWidth: "300px",
  lineHeight: "1.6",
  boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.5)",
  letterSpacing: "0.5px",
  transform: "translateX(-100%)",
  transition: "transform 1s ease-out",
};
