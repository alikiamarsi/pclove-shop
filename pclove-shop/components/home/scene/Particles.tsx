"use client"

import { PointMaterial, Points } from "@react-three/drei";
import { useState } from "react"

function Particles() {
    const [practicles] = useState(() => {
        const positions = new Float32Array(300 * 3);

        for(let i = 0; i < 300; i++) {
            positions[i * 3] = (Math.random() - 0.5) * 10;
            positions[i * 3 + 1] = (Math.random() - 0.5) * 6;
            positions[i * 3 + 2] = (Math.random() - 0.5) * 8;
        }
        return positions;
    })
    return (
        <Points positions={practicles}>
            <PointMaterial 
                color="#00ff88"
                size={0.03}
                transparent
                opacity={0.7}
            />
        </Points>
    )
  
}

export default Particles