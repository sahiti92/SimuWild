import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { useNavigate } from "react-router-dom";

const PoacherScene = () => {
  const mountRef = useRef(null);
  const mixers = useRef([]);
  const [rhinoHit, setRhinoHit] = useState(false);

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

    // Poacher Model
    loader.load("./swat.glb", (gltf) => {
      const poacher = gltf.scene;
      poacher.scale.set(1.5, 1.5, 1.5);
      poacher.position.set(0, 1, 0);
      scene.add(poacher);
    });

    // Syringe Model with Animation
    let syringe;
    let syringeMoving = false;
    loader.load("./syringe.glb", (gltf) => {
      syringe = gltf.scene;
      syringe.scale.set(3, 3, 3);
      syringe.position.set(4, 0, 2);
      scene.add(syringe);
      const mixer = new THREE.AnimationMixer(syringe);
        mixers.current.push(mixer);
        const animations = gltf.animations;

        console.log(animations);

        if (animations.length > 0) {
          const action = mixer.clipAction(animations[1]);
          action.play();
        }
   
    const positions1 = [
        { x: 4, y: 0, z: 2 },
    
        { x: 7, y: 0, z: 2 },
        { x: 8, y: 0, z: 2 }
    ];
    positions1.forEach((pos, index) => {
        setTimeout(() => {
          syringe.position.set(pos.x, pos.y, pos.z);
          
          // If it's the last position, trigger the rhino to fall
          if (index === positions1.length - 1) {
            setRhinoHit(true); // Trigger the rhino to fall
          }
        }, index * 1000);
      });
    });
    function moveSyringe() {
      syringeMoving = true;
    }

    // Rhino Model with Falling Animation
    loader.load("./rhino_walking.glb", (gltf) => {
      const rhino = gltf.scene;
      rhino.scale.set(6, 6, 6);
      rhino.position.set(9, -1, 2);
      scene.add(rhino);

      let falling = false;

      function triggerFall() {
        falling = true;
      }

      setRhinoHit(() => triggerFall());

      function animateRhino() {
        if (falling && rhino.rotation.x < Math.PI / 2) {
          rhino.rotation.x += 0.02;
        }
      }

      renderer.setAnimationLoop(() => {
        controls.update();
        animateRhino();
        if (syringeMoving && syringe.position.x > -5) {
          syringe.position.x -= 0.1;
        }
        renderer.render(scene, camera);
      });
    });

    // Cleanup
    return () => {
      renderer.dispose();
      //mountRef.current.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={mountRef} style={{ width: "100vw", height: "100vh" }} />;
};

export default PoacherScene;
