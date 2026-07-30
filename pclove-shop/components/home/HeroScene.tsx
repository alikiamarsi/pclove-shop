"use client"

import { Canvas } from "@react-three/fiber"
import FloatingCube from "./scene/FloatingCube"
import Lights from "./scene/Lights"
import * as THREE from "three"
import Particles from "./scene/Particles"


function HeroScene() {
  return (
    <div className="absolute inset-0 z-0">
        <Canvas 
            camera={{position: [0, 0, 5]}}
            gl={{alpha: true}}
            onCreated={({ scene }) => {
                scene.fog = new THREE.Fog("#050505", 5, 15)
            }}
        >
            <Lights />

            <Particles />
            
            <FloatingCube />
        </Canvas>
    </div>
  )
}

export default HeroScene