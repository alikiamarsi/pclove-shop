"use client"

import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import { Mesh } from "three";


function FloatingCube() {
    const meshRef = useRef<Mesh>(null);

    useFrame((state) => {
        if(!meshRef.current) return;

        const time = state.clock.getElapsedTime();

        meshRef.current.rotation.y = time * 0.5;
        meshRef.current.rotation.x = time * 0.2;

        meshRef.current.position.y = Math.sin(time) * 0.3;
    });

    return (
        <mesh ref={meshRef}>
            <boxGeometry />
            <meshStandardMaterial color="limegreen" />
        </mesh>
    )
}

export default FloatingCube