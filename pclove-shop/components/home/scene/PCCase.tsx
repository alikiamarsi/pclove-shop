"use client"

import { useScrollStore } from "@/scrollStore"
import { useGLTF } from "@react-three/drei"
import { useFrame } from "@react-three/fiber"
import { useRef } from "react"
import { Group } from "three"
import * as THREE from "three";

function PCCase() {

    const progress = useScrollStore((state) => state.progress)

    const { scene } = useGLTF("/models/pc_case.glb")

    const groupRef = useRef<Group>(null);

    useFrame((state) => {
        if(!groupRef.current) return;

        const time = state.clock.getElapsedTime();

        const targetRotation = time * 0.3 + progress * Math.PI * 0.2;

        groupRef.current.rotation.y += (targetRotation - groupRef.current.rotation.y) * 0.08

        groupRef.current.position.y = Math.sin(time) * 0.2;

        scene.traverse((child) => {
          if (child instanceof THREE.Mesh) {
            console.log({
              name: child.name,
              geometry: child.geometry.name,
              material: child.material.name}
            )
          }
        })
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