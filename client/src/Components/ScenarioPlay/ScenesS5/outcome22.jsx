import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { getUserFromStorage } from "../../../utils/getUser";
const Choice22 = () => {
  const mountRef = useRef(null);
  const mixers = useRef([]);
  const raycaster = new THREE.Raycaster();
  const pointer = new THREE.Vector2();
  const navigate = useNavigate();
  const scenarioId = 5;
  const handleClick = async () => {
    try {
      const token = getUserFromStorage();
      console.log("Resetting progress");
      await axios.post(
        // "http://localhost:10000/api/v1/progress/reset",
        "https://simuwild.onrender.com/api/v1/progress/reset",
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
  const handleclick2 = async () => {
    navigate("/scenarios/scenario5");
  };
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
    controls.enableDamping = false;
    controls.dampingFactor = 0.25;
    controls.enableZoom = false;
    controls.autoRotate = false;
    controls.enableRotate = false;

    const textureLoader = new THREE.TextureLoader();
    textureLoader.load("/sky.jpg", (texture) => {
      scene.background = texture;
    });

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(5, 10, 7.5);
    scene.add(directionalLight);

    const loader = new GLTFLoader();
    loader.load("/pond_with_waterfalls.glb", (gltf) => {
      const pond = gltf.scene;
      pond.position.set(0, -20, 0);
      pond.rotation.y = (3 * Math.PI) / 4;
      pond.scale.set(0.09, 0.09, 0.09);
      scene.add(gltf.scene);
    });
    loader.load("/logs.glb", (gltf) => {
      const pond = gltf.scene;
      pond.position.set(
        38.761061495156234,
        -16.53211324844417,
        -46.036540012097376
      );
      pond.rotation.y = (3 * Math.PI) / 4;
      pond.scale.set(1.5, 1.5, 1.5);
      scene.add(gltf.scene);
    });
    loader.load("/logs.glb", (gltf) => {
      const pond = gltf.scene;
      pond.position.set(
        43.761061495156234,
        -16.53211324844417,
        -46.036540012097376
      );
      pond.rotation.y = (3 * Math.PI) / 4;
      pond.scale.set(1.5, 1.5, 1.5);
      scene.add(gltf.scene);
    });
    loader.load("/logs.glb", (gltf) => {
      const pond = gltf.scene;
      pond.position.set(
        63.761061495156234,
        -16.53211324844417,
        -46.036540012097376
      );
      pond.rotation.y = (3 * Math.PI) / 4;
      pond.scale.set(1.5, 1.5, 1.5);
      scene.add(gltf.scene);
    });
    const positions = [
      { x: 3.4872873479019058, y: -14.585797572463743, z: -55.05079246119451 },
      { x: 48.71483756656607, y: -14.874813166262294, z: 23.27359310955085 },
      { x: -3.356801595254668, y: -13.822554141752235, z: -63.109151110065845 },
      { x: 72.49540939210733, y: -19.349649533131654, z: 8.021929175389534 },
      { x: 30.368560378520918, y: -19.826522754360735, z: -54.876039393684295 },
      { x: -15.742157033133491, y: -7.961154537941651, z: -18.298695669208197 },
      { x: 21.739298563874513, y: -20.23874112128606, z: -58.4252370920386 },
      { x: 73.04835124180053, y: -19.34964898268755, z: 4.583261367128328 },
      { x: 71.59924299021306, y: -19.82652270016006, z: 1.8978884256946325 },
      { x: 16.663790032475262, y: -11.07566148262981, z: 35.99547011345283 },
      { x: 38.91068238785563, y: -20.238741789427984, z: -35.45412684735847 },
      { x: -20.331665912921167, y: -14.824504602686241, z: -17.98633859616473 },
      { x: -23.712203355544922, y: -14.56153934207291, z: -21.134838163133537 },
      { x: -25.721743952378418, y: -12.934445906062368, z: -20.94371822483166 },
      { x: -30.15846592708338, y: -10.773870264133205, z: -11.635590418711907 },
      { x: -11.87949354905817, y: -0.7936700320555732, z: -55.282313585969014 },
      { x: 26.017320201908902, y: -14.713898982522826, z: -75.72965962292052 },
    ];

    loader.load("/tree_p.glb", (gltf) => {
      positions.forEach((position) => {
        const tree = gltf.scene.clone();
        tree.scale.set(10, 10, 10);
        tree.position.set(position.x, position.y, position.z);
        scene.add(tree);
      });
    });

    loader.load(
      "/tiger_eat.glb",
      (gltf) => {
        const tiger = gltf.scene;
        tiger.scale.set(5, 5, 5);
        tiger.position.set(
          15.488087120611262,
          -3.835652948549345,
          17.94862992339718
        );
        tiger.rotation.set(0, Math.PI / 2, 0);
        scene.add(tiger);

        const mixer = new THREE.AnimationMixer(tiger);
        mixers.current.push(mixer);
        const animations = gltf.animations;
        if (animations.length > 0) {
          const action = mixer.clipAction(animations[0]);
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
        tiger.scale.set(5, 5, 5);
        tiger.position.set(
          6.402326122894164,
          -18.313799201048166,
          12.671123786249636
        );
        tiger.rotation.set(0, Math.PI / 2, 0);
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
      "/thief.glb",
      (gltf) => {
        const tiger = gltf.scene;
        tiger.scale.set(3, 3, 3);
        tiger.position.set(
          31.538602824661773,
          -11.81728179704532,
          30.72444953554993
        );
        tiger.rotation.set(0, -Math.PI / 2, 0);
        scene.add(tiger);

        const mixer = new THREE.AnimationMixer(tiger);
        mixers.current.push(mixer);
        const animations = gltf.animations;
        if (animations.length > 0) {
          const action = mixer.clipAction(animations[0]);
          action.play();
        }
      },
      (xhr) => console.log((xhr.loaded / xhr.total) * 100 + "% loaded"),
      (error) =>
        console.error("An error occurred while loading the tiger model:", error)
    );
    // Load second tiger
    loader.load(
      "/tiger_eat.glb",
      (gltf) => {
        const tiger = gltf.scene;
        tiger.scale.set(5, 5, 5);
        tiger.position.set(
          -14.651698068057637,
          -17.307254118537593,
          -7.57008736567553
        );
        tiger.rotation.set(0, Math.PI / 2, 0);
        scene.add(tiger);

        const mixer = new THREE.AnimationMixer(tiger);
        mixers.current.push(mixer); // Add this mixer to mixers array
        const animations = gltf.animations;
        if (animations.length > 0) {
          const action = mixer.clipAction(animations[2]);
          action.play();
        }
      },
      (xhr) => console.log((xhr.loaded / xhr.total) * 100 + "% loaded"),
      (error) =>
        console.error("An error occurred while loading the tiger model:", error)
    );
    // // Load the audio
    // const listener = new THREE.AudioListener();
    // camera.add(listener);

    // const backgroundMusic = new THREE.Audio(listener);
    // const audioLoader = new THREE.AudioLoader();
    // audioLoader.load("/background-music.mp3", (buffer) => {
    //   backgroundMusic.setBuffer(buffer);
    //   backgroundMusic.setLoop(true);
    //   backgroundMusic.setVolume(1);
    //   backgroundMusic.play();
    // });
    setTimeout(() => {
      loader.load("/blood.glb", (gltf) => {
        const pond = gltf.scene;
        pond.position.set(
          15.763525090805851,
          -3.3434299322690664,
          29.89956969771587
        );
        pond.rotation.y = (3 * Math.PI) / 4;
        pond.scale.set(20, 20, 20);
        scene.add(gltf.scene);
        console.log("loaded blood");
      });
    }, 7000); // 5000ms = 5 seconds

    camera.position.set(
      -33.51605451792094,
      17.428240950418587,
      27.51766130815002
    );
    loader.load(
      "/thief.glb",
      (gltf) => {
        const tiger = gltf.scene;
        tiger.scale.set(3, 3, 3);
        tiger.position.set(
          -8.87949354905817,
          -0.7936700320555732,
          -55.282313585969014
        );
        tiger.rotation.set(0, -Math.PI / 2, 0);
        scene.add(tiger);

        const mixer = new THREE.AnimationMixer(tiger);
        mixers.current.push(mixer);
        const animations = gltf.animations;
        console.log(animations);
        if (animations.length > 0) {
          const action = mixer.clipAction(animations[0]);
          action.play();
        }
      },
      (xhr) => console.log((xhr.loaded / xhr.total) * 100 + "% loaded"),
      (error) =>
        console.error("An error occurred while loading the tiger model:", error)
    );

    loader.load(
      "/thief.glb",
      (gltf) => {
        const tiger = gltf.scene;
        tiger.scale.set(3.5, 3.5, 3.5);
        tiger.position.set(
          18.152939462691208,
          -7.884454893877837,
          -50.13513910616608
        );
        tiger.rotation.set(0, -Math.PI / 2, 0);
        scene.add(tiger);

        const mixer = new THREE.AnimationMixer(tiger);
        mixers.current.push(mixer);
        const animations = gltf.animations;
        console.log(animations);
        if (animations.length > 0) {
          const action = mixer.clipAction(animations[0]);
          action.play();
        }
      },
      (xhr) => console.log((xhr.loaded / xhr.total) * 100 + "% loaded"),
      (error) =>
        console.error("An error occurred while loading the tiger model:", error)
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
      // mountRef.current.removeChild(renderer.domElement);
      //   window.removeEventListener("resize", handleResize);
      window.removeEventListener("click", onPointerClick);
    };
  }, []);

  return (
    <div ref={mountRef} style={{ position: "relative", height: "100vh" }}>
      <button
        onClick={handleClick}
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
        onClick={handleclick2}
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
        Exit
      </button>
      <footer
        style={{
          position: "absolute",
          bottom: "30px",
          width: "100%",
          textAlign: "center",
          color: "white",
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          padding: "10px",
          fontSize: "18px",
        }}
      >
        Timber logging leads to deforestation, which has significant
        consequences for both the robbers involved and the tigers' habitat. As
        forests are cleared, tigers lose their natural home, reducing their
        access to food, shelter, and space to roam. This threatens their
        survival and forces them into closer proximity with humans. In turn, the
        robbers involved in illegal logging face the danger of tiger attacks as
        the tigers become more territorial and aggressive in their diminished
        environment. Thus, the consequences of deforestation harm both the
        robbers' lives and the delicate balance of the tigers' ecosystem,
        creating a harmful cycle for both people and wildlife.
      </footer>
    </div>
  );
};

export default Choice22;
