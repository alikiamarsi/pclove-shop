"use client"

import { useScrollStore } from "@/scrollStore"
import { useGLTF } from "@react-three/drei"
import { useFrame } from "@react-three/fiber"
import { useRef } from "react"
import * as THREE from "three"

function PCCase() {

    const progress = useScrollStore((state) => state.progress)

    const { scene } = useGLTF("/models/pc_case.glb")

    const groupRef = useRef<THREE.Group>(null);

    useFrame((state) => {
        if(!groupRef.current) return;

        const opacity = Math.max(
          0,
          Math.min(1, 1 - (progress - 0.75) / 0.25)
        )

        const fadeeProgress = Math.max(
          0,
          Math.min(1, (progress - 0.75) / 0.25)
        )

        const scale = 1 - fadeeProgress * 0.15;

        const time = state.clock.getElapsedTime();

        const targetRotation = time * 0.3 + progress * Math.PI * 0.2;

        groupRef.current.rotation.y += (targetRotation - groupRef.current.rotation.y) * 0.08

        groupRef.current.position.y = Math.sin(time) * 0.2 - fadeeProgress * 0.4;

        groupRef.current.scale.setScalar(scale)

        scene.traverse((child) => {
          if(child instanceof THREE.Mesh) {
            const material = child.material;

            if(material instanceof THREE.MeshStandardMaterial){
              material.transparent = true;
              material.opacity = opacity
            }
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