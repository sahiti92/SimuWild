import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

const Outcome2 = () => {
  const mountRef = useRef(null);
  const mixers = useRef([]);
  const raycaster = new THREE.Raycaster();
  const pointer = new THREE.Vector2();

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
    controls.enableRotate = false;
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

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(5, 10, 7.5);
    scene.add(directionalLight);

    const loader = new GLTFLoader();
    loader.load("/s5o2.glb", (gltf) => {
      const model = gltf.scene;
      scene.add(model);
    });
    loader.load("/vehicle_factory.glb", (gltf) => {
      const model = gltf.scene;
      model.scale.set(0.4, 0.4, 0.4);
      model.position.set(
        6.537672357357436,
        0.4496877559400822,
        8.023317326095572
      );
      scene.add(model);
    });
    camera.position.set(
      12.909516576076305,
      10.481838261013088,
      0.38380812322302743
    );
    loader.load("/vehicle_factory.glb", (gltf) => {
      const model = gltf.scene;
      model.scale.set(0.4, 0.4, 0.4);
      model.position.set(
        3.362974441038768,
        0.3763867349435076,
        3.720691875215446
      );
      scene.add(model);
    });
    loader.load("/vehicle_factory.glb", (gltf) => {
      const model = gltf.scene;
      model.scale.set(0.4, 0.4, 0.4);
      model.position.set(
        0.528841484521464,
        1.9996920362848308,
        15.785606616020171
      );
      scene.add(model);
    });
    loader.load(
      "/tiger_eat.glb",
      (gltf) => {
        const tiger = gltf.scene;
        tiger.scale.set(1, 1, 1);
        tiger.position.set(
          7.638028423628757,
          1.73128473377457,
          -8.274406429911117
        );
        tiger.rotation.set(0, Math.PI, 0);

        scene.add(tiger);

        const mixer = new THREE.AnimationMixer(tiger);
        mixers.current.push(mixer); // Add this mixer to mixers array
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
        tiger.scale.set(1, 1, 1);
        tiger.position.set(
          -2.295297169212275,
          2.694622765389841,
          -13.967322846833735
        );
        tiger.rotation.set(0, Math.PI, 0);

        scene.add(tiger);

        const mixer = new THREE.AnimationMixer(tiger);
        mixers.current.push(mixer); // Add this mixer to mixers array
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
      6.135775350057335,
      0.6299956880833736,
      15.803274664801801
    );
    loader.load("/vehicle_factory.glb", (gltf) => {
      const model = gltf.scene;
      model.scale.set(0.4, 0.4, 0.4);
      model.position.set(
        6.538843341241567,
        0.5491715794851394,
        11.894778013018524
      );
      scene.add(model);
    });
    camera.position.set(
      12.909516576076305,
      10.481838261013088,
      0.38380812322302743
    );
    const animate = () => {
      requestAnimationFrame(animate);

      mixers.current.forEach((mixer) => mixer.update(0.01)); // Update each mixer
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
      // Calculate pointer position in normalized device coordinates
      pointer.x = (event.clientX / window.innerWidth) * 2 - 1;
      pointer.y = -(event.clientY / window.innerHeight) * 2 + 1;

      // Raycast to find intersected objects
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
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("click", onPointerClick);
    };
  }, []);

  return (
    <div ref={mountRef} style={{ position: "relative", height: "100vh" }}>
      <button
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
        Continued construction and habitat destruction threaten tiger
        populations, reducing their numbers and forcing them closer to human
        communities. This increased proximity poses risks for both tigers and
        people, leading to potential conflicts and endangering lives on both
        sides. Protecting tiger habitats is essential for harmonious
        coexistence.
      </footer>
    </div>
  );
};
export default Outcome2;
