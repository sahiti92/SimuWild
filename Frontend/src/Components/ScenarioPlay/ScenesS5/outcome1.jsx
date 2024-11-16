import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import axios from "axios";
import { getUserFromStorage } from "../../../utils/getUser";
import { useNavigate } from "react-router-dom";
const Choice2 = () => {
  const mountRef = useRef(null);
  const mixers = useRef([]);
  const raycaster = new THREE.Raycaster();
  const pointer = new THREE.Vector2();
  const navigate = useNavigate();
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
    controls.enableDamping = true;
    controls.dampingFactor = 0.25;
    controls.enableZoom = true;
    controls.autoRotate = false;
    controls.enableRotate = true;

    controls.addEventListener("change", () => {
      console.log(
        `Camera position: x: ${camera.position.x}, y: ${camera.position.y}, z: ${camera.position.z}`
      );
    });

    const textureLoader = new THREE.TextureLoader();
    textureLoader.load("/sky.jpg", (texture) => {
      scene.background = texture;
    });

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
    directionalLight.position.set(5, 10, 7.5);
    scene.add(directionalLight);

    const loader = new GLTFLoader();
    loader.load("/growths.glb", (gltf) => {
      const model = gltf.scene;
      model.position.set(0, 0, 0);
      model.scale.set(1, 1, 1);
      scene.add(model);
    });

    loader.load(
      "/tiger_eat.glb",
      (gltf) => {
        const tiger = gltf.scene;
        tiger.scale.set(0.1, 0.1, 0.1);
        tiger.position.set(
          0.004060918740664943,
          -0.0071605432919852885,
          -0.512774987514765
        );
        tiger.rotation.set(0, (3 * Math.PI) / 4, 0);

        scene.add(tiger);

        const mixer = new THREE.AnimationMixer(tiger);
        mixers.current.push(mixer);
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

    loader.load(
      "/tiger_eat.glb",
      (gltf) => {
        const tiger = gltf.scene;
        tiger.scale.set(0.1, 0.1, 0.1);
        tiger.position.set(
          0.22711957795538545,
          -0.04956696973161717,
          1.0930901058541471
        );
        tiger.rotation.set(0, Math.PI, 0);

        scene.add(tiger);

        const mixer = new THREE.AnimationMixer(tiger);
        mixers.current.push(mixer);
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

    loader.load(
      "/tiger_eat.glb",
      (gltf) => {
        const tiger = gltf.scene;
        tiger.scale.set(0.1, 0.1, 0.1);
        tiger.position.set(
          -0.28894228308545045,
          -0.04426774412461687,
          0.38761078572010915
        );
        tiger.rotation.set(0, Math.PI, 0);

        scene.add(tiger);

        const mixer = new THREE.AnimationMixer(tiger);
        mixers.current.push(mixer);
        const animations = gltf.animations;
        console.log(animations);
        if (animations.length > 0) {
          const action = mixer.clipAction(animations[5]);
          action.play();
        }
      },
      (xhr) => console.log((xhr.loaded / xhr.total) * 100 + "% loaded"),
      (error) =>
        console.error("An error occurred while loading the tiger model:", error)
    );
    camera.position.set(
      0.6311022633614775,
      0.3847194983003162,
      -0.4901725216954976
    );
    loader.load(
      "/tiger_eat.glb",
      (gltf) => {
        const tiger = gltf.scene;
        tiger.scale.set(0.1, 0.1, 0.1);
        tiger.position.set(
          -0.28894228308545045,
          -0.04426774412461687,
          0.38761078572010915
        );
        tiger.rotation.set(0, Math.PI, 0);

        scene.add(tiger);

        const mixer = new THREE.AnimationMixer(tiger);
        mixers.current.push(mixer);
        const animations = gltf.animations;
        console.log(animations);
        if (animations.length > 0) {
          const action = mixer.clipAction(animations[5]);
          action.play();
        }
      },
      (xhr) => console.log((xhr.loaded / xhr.total) * 100 + "% loaded"),
      (error) =>
        console.error("An error occurred while loading the tiger model:", error)
    );
    camera.position.set(
      0.6311022633614775,
      0.3847194983003162,
      -0.4901725216954976
    );
    loader.load(
      "/tiger_eat.glb",
      (gltf) => {
        const tiger = gltf.scene;
        tiger.scale.set(0.1, 0.1, 0.1);
        tiger.position.set(
          -0.28894228308545045,
          -0.04426774412461687,
          0.38761078572010915
        );
        tiger.rotation.set(0, Math.PI, 0);

        scene.add(tiger);

        const mixer = new THREE.AnimationMixer(tiger);
        mixers.current.push(mixer);
        const animations = gltf.animations;
        console.log(animations);
        if (animations.length > 0) {
          const action = mixer.clipAction(animations[5]);
          action.play();
        }
      },
      (xhr) => console.log((xhr.loaded / xhr.total) * 100 + "% loaded"),
      (error) =>
        console.error("An error occurred while loading the tiger model:", error)
    );
    camera.position.set(
      0.6311022633614775,
      0.3847194983003162,
      -0.4901725216954976
    );
    loader.load(
      "/tiger_eat.glb",
      (gltf) => {
        const tiger = gltf.scene;
        tiger.scale.set(0.1, 0.1, 0.1);
        tiger.position.set(
          -0.28894228308545045,
          -0.04426774412461687,
          0.38761078572010915
        );
        tiger.rotation.set(0, Math.PI, 0);

        scene.add(tiger);

        const mixer = new THREE.AnimationMixer(tiger);
        mixers.current.push(mixer);
        const animations = gltf.animations;
        console.log(animations);
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
        tiger.scale.set(0.1, 0.1, 0.1);
        tiger.position.set(
          -0.00898697903000667,
          -0.049895675916478366,
          1.2354322775239253
        );
        tiger.rotation.set(0, Math.PI, 0);

        scene.add(tiger);

        const mixer = new THREE.AnimationMixer(tiger);
        mixers.current.push(mixer);
        const animations = gltf.animations;
        console.log(animations);
        if (animations.length > 0) {
          const action = mixer.clipAction(animations[1]);
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
        tiger.scale.set(0.1, 0.1, 0.1);
        tiger.position.set(
          0.16146414209397386,
          -0.04131353385699249,
          1.4261730769260914
        );
        tiger.rotation.set(0, 0, 0);

        scene.add(tiger);

        const mixer = new THREE.AnimationMixer(tiger);
        mixers.current.push(mixer);
        const animations = gltf.animations;
        console.log(animations);
        if (animations.length > 0) {
          const action = mixer.clipAction(animations[1]);
          action.play();
        }
      },
      (xhr) => console.log((xhr.loaded / xhr.total) * 100 + "% loaded"),
      (error) =>
        console.error("An error occurred while loading the tiger model:", error)
    );
    camera.position.set(
      0.6311022633614775,
      0.3847194983003162,
      -0.4901725216954976
    );

    const animate = () => {
      requestAnimationFrame(animate);
      mixers.current.forEach((mixer) => mixer.update(0.01));
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
      pointer.x = (event.clientX / window.innerWidth) * 2 - 1;
      pointer.y = -(event.clientY / window.innerHeight) * 2 + 1;
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
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("click", onPointerClick);
    };
  }, []);

  const handleRestartClick = async () => {
    try {
      const token = getUserFromStorage();
      console.log("Resetting progress");
      const scenarioId = 5;
      await axios.post(
        "http://localhost:8001/api/v1/progress/reset",
        { scenarioId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert("Progress has been reset.");
    } catch (error) {
      console.error("Error resetting progress:", error);
      alert(
        "Failed to reset progress: " +
          (error.response?.data?.error || "Unknown error")
      );
    }
    navigate("/scenarios/scenario5");
  };
  return (
    <div ref={mountRef}>
      <button
        onClick={handleRestartClick}
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
        ReStart
      </button>
      <button
        onClick={() => navigate("/summarys5")}
        style={{
          position: "absolute",
          top: "10px",
          left: "245px",
          padding: "10px 15px",
          backgroundColor: "#007bff",
          color: "#fff",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
          zIndex: 1,
        }}
      >
        View Summary
      </button>
      <button
        onClick={() => navigate("/scenarios/scenario5")}
        style={{
          position: "absolute",
          top: "10px",
          right: "10px",
          padding: "10px 15px",
          backgroundColor: "red",
          color: "#fff",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
          zIndex: 1,
        }}
      >
        Save & exit
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
        Supporting tiger conservation brings hope for both tigers and their
        habitats. Through habitat restoration and growth of green cover, we can
        protect these majestic animals and enrich biodiversity. A thriving
        environment for tigers also means healthier ecosystems and sustainable
        natural resources for all.
      </footer>
    </div>
  );
};

export default Choice2;
