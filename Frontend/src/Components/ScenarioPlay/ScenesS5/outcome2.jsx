import React, { useEffect, useState, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF, OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

function Model({ url, onLoad }) {
    const { scene, animations } = useGLTF(url);
    const [mixer] = useState(() => new THREE.AnimationMixer(scene));
    const [currentAction, setCurrentAction] = useState(null);

    useEffect(() => {
        if (animations && animations.length > 0) {
            onLoad(animations);

            // Set and play the first animation with a loop
            const action = mixer.clipAction(animations[0]);
            action.setLoop(THREE.LoopRepeat, Infinity); // Loop the animation infinitely
            action.play();
            setCurrentAction(action);
        }

        return () => mixer.stopAllAction(); // Clean up mixer actions on unmount
    }, [animations, mixer, onLoad]);

    useFrame((state, delta) => {
        mixer.update(delta); // Update mixer on each frame
    });

    return <primitive object={scene} />;
}

function AnimationControls({ animations, playAnimation }) {
    return (
        <div style={{ position: 'absolute', top: 20, left: 20, zIndex: 1 }}>
            <h3>Select Animation:</h3>
            {animations.map((_, index) => (
                <button key={index} onClick={() => playAnimation(index)}>
                    Animation {index + 1}
                </button>
            ))}
        </div>
    );
}

function GLBModel({ url }) {
    const [animations, setAnimations] = useState([]);
    const [mixer] = useState(() => new THREE.AnimationMixer()); // Initialize mixer outside the component

    const handleAnimationLoad = (loadedAnimations) => {
        setAnimations(loadedAnimations);
    };

    const playAnimation = (index) => {
        if (mixer && animations.length > index) {
            const action = mixer.clipAction(animations[index]);
            action.reset().setLoop(THREE.LoopRepeat, Infinity).fadeIn(0.5).play();
        } else {
            console.warn("Mixer is not initialized or animation index is invalid.");
        }
    };

    return (
        <div style={{ position: 'relative', height: '100vh' }}>
            <Canvas>
                <ambientLight intensity={0.5} />
                <directionalLight position={[5, 5, 5]} intensity={1} />
                <Suspense fallback={<div>Loading model...</div>}>
                    <Model url={url} onLoad={handleAnimationLoad} />
                </Suspense>
                <OrbitControls />
            </Canvas>
            {animations.length > 0 && (
                <AnimationControls animations={animations} playAnimation={playAnimation} />
            )}
        </div>
    );
}

export default GLBModel;