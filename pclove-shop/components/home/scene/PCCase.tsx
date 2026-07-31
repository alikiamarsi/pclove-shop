"use client"

import { useGLTF } from "@react-three/drei"
import { useFrame } from "@react-three/fiber"
import { useRef } from "react"
import { Group } from "three"

function PCCase() {
    const { scene } = useGLTF("/models/pc_case.glb")

    const groupRef = useRef<Group>(null);

    useFrame((state) => {
        if(!groupRef.current) return;

        const time = state.clock.getElapsedTime();

        groupRef.current.rotation.y = time * 0.3;

        groupRef.current.position.y = Math.sin(time) * 0.2;
    })
  return (
    <group ref={groupRef}>
        <primitive 
        object={scene} 
        scale={0.1}
    />
    </group>
  )
}

export default PCCase