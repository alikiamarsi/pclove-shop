"use client"

import { PointMaterial, Points } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef, useState } from "react"
import { Points as ThreePoints } from "three";

function EnergyParticles() {
    const pointsRef = useRef<ThreePoints>(null);

    const [particles] = useState(() => {

        const count = 300;

        const positions = new Float32Array(count * 3)

        for(let i = 0; i < count; i++) {
            const isSecondRing = i >= count / 2;

            const radius = isSecondRing ? 3.5 : 2.3;

            const angle = (i / count) * Math.PI * 2 + (isSecondRing ? 0.5 : 0);

            const height = angle * 0.15;

            positions[i * 3] = Math.cos(angle) * radius
            positions[i * 3 + 1] = height
            positions[i * 3 + 2] = Math.sin(angle) * radius
        }
        return positions;
    });

        useFrame((state) => {
            if(!pointsRef.current) return;

            const time = state.clock.getElapsedTime();

            const positions = pointsRef.current.geometry.attributes.position.array;

            const count = 300;

            for(let i = 0; i < count; i++) {
                const isSecondRing = i >= count / 2;

                const radius = isSecondRing ? 3.4 : 2.4;

                const speed = isSecondRing ? -0.5 : 0.5;

                const baseAngle = (i / count) * Math.PI * 2;

                const angle = baseAngle + time * speed;

                positions[i * 3] = Math.cos(angle) * radius;

                positions[i * 3 + 1] = baseAngle * 0.15

                positions[i * 3 + 2] = Math.sin(angle) * radius
            }
             pointsRef.current.geometry.attributes.position.needsUpdate = true;
        })
    return (
        <Points ref={pointsRef} positions={particles}>
            <PointMaterial 
                color="#39ff14"
                size={0.045}
                transparent
                opacity={0.65}
            />
        </Points>
    )
  
}

export default EnergyParticles