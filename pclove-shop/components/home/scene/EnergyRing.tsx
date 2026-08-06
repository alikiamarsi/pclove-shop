"use client"

import { useScrollStore } from "@/scrollStore";
import { PointMaterial, Points } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import { Group, Points as ThreePoints } from "three";

type Props = {
    radius: number;
    speed: number;
    heightOffset?: number;
};

function pseudoRandom(seed: number) {
    const x = Math.sin(seed * 9999) * 10000;
    return x - Math.floor(x)
}

function EnergyRing({
    radius,
    speed,
    heightOffset = 0,
}: Props) {

    const progress = useScrollStore(
        (state) => state.progress
    )

    const groupRef = useRef<Group>(null);

    const pointsRef = useRef<ThreePoints>(null)

    const particleData = useMemo(() => {

        const count = 150;

        const array = new Float32Array(count * 3);
        const angles: number[] = [];
        const heights: number[] = [];
        const radiuses: number[] = [];


        for(let i = 0; i < count; i++) {
            
            const angle = (i / count) * Math.PI * 2;

            angles.push(angle);

            const randomRadius = radius + (pseudoRandom(i * 2) - 0.5) * 0.12;

            radiuses.push(randomRadius);

            const randomHeight = (pseudoRandom(i * 2 + 1) - 0.5) * 0.08;

            const baseHeight = angle * 0.08 + randomHeight + heightOffset;

            heights.push(baseHeight)

            array[i * 3] = Math.cos(angle) * randomRadius;

            array[i * 3 + 1] = baseHeight;

            array[i * 3 + 2] = Math.sin(angle) * randomRadius;
        }
        return {
            positions: array,
            angles,
            heights,
            radiuses
        };
    }, [radius, heightOffset]);

    useFrame((state, delta) => {
        
        if (!groupRef.current || !pointsRef.current) return;

        const mouseX = state.pointer.x; 
        const mouseY = state.pointer.y; 

        const time = state.clock.getElapsedTime();

        groupRef.current.rotation.y += delta * speed;

        groupRef.current.rotation.x =+ (mouseY * 0.08 - groupRef.current.rotation.x) * 0.3;

        groupRef.current.rotation.z += (-mouseX * 0.08 - groupRef.current.rotation.z) * 0.3;

        const positions = pointsRef.current.geometry.attributes.position.array;

        for(let i = 0; i < particleData.angles.length; i++) {

            const angle = particleData.angles[i];

            positions[i * 3 + 1] = 
            particleData.heights[i] + Math.sin(time * 2 + angle * 4) * 0.1;

            const pulse = Math.sin(time * 1.5) * 0.03;

            const currentRadius = particleData.radiuses[i] + pulse;

            positions[i * 3] = Math.cos(angle) * currentRadius;

            positions[i * 3 + 2] = Math.sin(angle) * currentRadius;
        }
        pointsRef.current.geometry.attributes.position.needsUpdate = true;
    });
  return (
    <group ref={groupRef}>
        <Points 
            ref={pointsRef}
            positions={particleData.positions}>
            <PointMaterial 
                color="#00ff66"
                size={0.045}
                transparent
                opacity={Math.max(0, 0.7 - progress * 0.7)}
            />
        </Points>
    </group>
  )
}

export default EnergyRing