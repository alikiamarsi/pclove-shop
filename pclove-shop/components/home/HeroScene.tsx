"use client"

import { Canvas } from "@react-three/fiber"
import Lights from "./scene/Lights"
import * as THREE from "three"
import Particles from "./scene/EnergyParticles"
import PCCase from "./scene/PCCase"
import { Bloom, EffectComposer } from "@react-three/postprocessing"


function HeroScene() {
  return (
    <div className="absolute inset-0 z-0">
        <Canvas 
            camera={{position: [0, 0, 6]}}
            gl={{alpha: true}}
            style={{pointerEvents: "auto"}}
            dpr={[1, 1.5]}
            onCreated={({ scene }) => {
                scene.fog = new THREE.Fog("#050505", 5, 15)
            }}
        >
            <Lights />

            <Particles />
            
            <PCCase />

            <EffectComposer>
                <Bloom
                    intensity={0.35}
                    luminanceThreshold={0.85}
                    raduis={0.25}
                />
            </EffectComposer>
        </Canvas>
    </div>
  )
}

export default HeroScene