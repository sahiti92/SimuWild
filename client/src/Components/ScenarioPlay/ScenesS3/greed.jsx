import React, { useEffect, useRef } from "react";
import { Canvas, useThree, useFrame, useLoader } from "@react-three/fiber";
import { OrbitControls, useGLTF, useAnimations } from "@react-three/drei";
import { TextureLoader } from "three";
import { useNavigate } from "react-router-dom";
import axios from "axios";
// Component for static models
function StaticModel({ path, scale, position, rotation }) {
  const { scene } = useGLTF(path);
  return (
    <primitive
      object={scene}
      scale={scale}
      position={position}
      rotation={rotation}
    />
  );
}

// Animated Model Component
function AnimatedModel({ path, scale, position, rotation }) {
  const { scene, animations } = useGLTF(path);
  const { actions } = useAnimations(animations, scene);

  useEffect(() => {
    if (actions) {
      actions[Object.keys(actions)[0]].play(); // Play the first animation by default
    }
  }, [actions]);

  return (
    <primitive
      object={scene}
      scale={scale}
      position={position}
      rotation={rotation}
    />
  );
}

// Buildings
function Buildings() {
  return (
    <>
      <StaticModel
        path="./building1.glb"
        scale={[7, 7, 7]}
        position={[-50, -25, -20]}
      />
      <StaticModel
        path="./building1 copy.glb"
        scale={[8, 8, 8]}
        position={[-50, -25, -40]}
      />
      <StaticModel
        path="./building2.glb"
        scale={[0.25, 0.25, 0.25]}
        position={[50, 21, -70]}
        rotation={[0, Math.PI, 0]}
      />
    </>
  );
}

// Cars
function Cars() {
  return (
    <>
      <StaticModel
        path="./cars.glb"
        scale={[2, 2, 2]}
        position={[20, -29, -60]}
      />
    </>
  );
}

// Bird Component (Animated)
function Bird() {
  return (
    <AnimatedModel
      path="./bird.glb" // Replace with your bird model path
      scale={[3, 3, 3]}
      position={[0, 10, -5]}
      rotation={[0, Math.PI / 4, 0]}
    />
  );
}

// Skybox Component
function Skybox({ texturePath }) {
  const { scene } = useThree();
  const loader = useRef(new TextureLoader());

  useEffect(() => {
    loader.current.load(texturePath, (texture) => {
      scene.background = texture;
    });
  }, [texturePath, scene]);

  return null;
}

// Full Scene
export default function CityScene() {
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
  function CameraLogger() {
    const { camera } = useThree();
    useFrame(() => {
      console.log(
        `Camera position: x: ${camera.position.x}, y: ${camera.position.y}, z: ${camera.position.z}`
      );
    });

    return null;
  }

  return (
    <div style={{ width: "100vw", height: "100vh" }}>
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
        camera={{
          position: [-6.62444165291652, 10.392926904921868, 74.6198510372118],
          fov: 50,
        }}
      >
        <ambientLight intensity={0.4} />
        <directionalLight position={[10, 20, 10]} intensity={0.8} />
        {/* Sky background */}
        <Skybox texturePath="./sky.jpg" />{" "}
        {/* Replace with your sky texture file */}
        {/* Ground as a 3D Model */}
        <StaticModel
          path="./grass.glb"
          scale={[2, 2, 2]}
          position={[0, 0, 0]}
        />
        <Buildings />
        <Cars />
        {/* Animated Models */}
        <AnimatedModel
          path="./man.glb"
          scale={[4, 4, 4]}
          position={[-40, -25, 5]}
          rotation={[0, -Math.PI / 3, 0]}
        />
        <AnimatedModel
          path="./woman.glb"
          scale={[4, 4, 4]}
          position={[-44, -25, 5]}
          rotation={[0, Math.PI / 3, 0]}
        />
        <Bird /> {/* Animated bird */}
        <OrbitControls />
        <CameraLogger />
      </Canvas>
      <footer>
        <div style={textStyle}>
          <p>
            You have successfully tranquilized the rhino and carefully removed
            its ivory, driven by greed. However, in doing so, you neglected to
            consider the animal's suffering and the potential risks involved,
            ultimately contributing to the extinction of rhinos.
          </p>
        </div>
      </footer>
    </div>
  );
}
const textStyle = {
  position: "absolute",
  top: "100px",
  left: "20px",
  color: "white",
  fontFamily: "Georgia, serif",
  fontSize: "16px",
  backgroundColor: "rgba(0, 0, 0, 0.8)",
  padding: "20px",
  borderRadius: "10px",
  maxWidth: "300px",
  lineHeight: "1.6",
  boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.5)",
  letterSpacing: "0.5px",
};
