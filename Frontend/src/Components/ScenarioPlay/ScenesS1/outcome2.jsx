import React, { useEffect, useState, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF, OrbitControls, Html } from '@react-three/drei';
import * as THREE from 'three';

function Model({ url, onLoad }) {
    const { scene, animations } = useGLTF(url);
    const [mixer] = useState(() => new THREE.AnimationMixer(scene));
    const [currentAction, setCurrentAction] = useState(null);

    useEffect(() => {
        if (animations && animations.length > 0) {
            onLoad(animations);
            const action = mixer.clipAction(animations[27]);
            action.setLoop(THREE.LoopRepeat, Infinity);
            action.play();
            setCurrentAction(action);
        }

        return () => mixer.stopAllAction();
    }, [animations, mixer, onLoad]);

    useFrame((_, delta) => {
        mixer.update(delta);
    });

    return <primitive object={scene} />;
}

function GLBModel({ url }) {
    const [animations, setAnimations] = useState([]);
    const [mixer] = useState(() => new THREE.AnimationMixer());

    const handleAnimationLoad = (loadedAnimations) => {
        setAnimations(loadedAnimations);
    };

    const playAnimation = (index) => {
        if (mixer && animations.length > index) {
            const action = mixer.clipAction(animations[5]);
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
                <Suspense fallback={<Html><div>Loading model...</div></Html>}>
                    <Model url={url} onLoad={handleAnimationLoad} />
                </Suspense>
                <OrbitControls />
            </Canvas>
           
        </div>
    );
}

export default GLBModel;
