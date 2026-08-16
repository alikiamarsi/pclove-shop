"use client";

import { Canvas } from "@react-three/fiber";

import Lights from "./scene/Lights";
import * as THREE from "three";
import Particles from "./scene/EnergyParticles";
import PCCase from "./scene/PCCase";

import { Bloom, EffectComposer } from "@react-three/postprocessing";

import { ScrollControls } from "@react-three/drei";

import ScrollController from "./scene/ScrollController";
import CameraController from "./scene/CameraController";
import CategoryModels from "./categories/CategoryModels";

import { useScrollStore } from "@/scrollStore";


function HeroScene() {
  const hoveredCategory = useScrollStore((state) => state.hoveredCategory);

  return (
    <div className="absolute inset-0 z-0">
      {hoveredCategory && (
<div

    className="
    pointer-events-none
    fixed
    left-1/2
    top-1/5
    z-index: 999999;
    -translate-x-1/2
    -translate-y-1/2

    whitespace-nowrap
    rounded-xl
    border
    border-cyan-400/20
    bg-black/60
    px-5
    py-2.5

    text-base
    font-semibold
    tracking-wide
    text-white

    shadow-[0_0_25px_rgba(34,211,238,0.12)]
    backdrop-blur-xl

    transition-all
    duration-200
    "
>
    <span
        className="
            mr-2
            inline-block
            h-1.5
            w-1.5
            rounded-full
            bg-cyan-400
            shadow-[0_0_8px_rgba(34,211,238,0.8)]
        "
    />

    {hoveredCategory.name}
</div>
      )}

      <Canvas
        camera={{
          position: [0, 0, 6],
        }}
        gl={{
          alpha: true,
        }}
        style={{
          pointerEvents: "auto",
        }}
        dpr={[1, 1.5]}
        onCreated={({ scene }) => {
          scene.fog = new THREE.Fog("#050505", 5, 15);
        }}
      >
        <ScrollControls pages={2} damping={0.2}>
          <Lights />

          <ScrollController />

          <CameraController />

          <Particles />

          <PCCase />

          <CategoryModels />

          <EffectComposer>
            <Bloom intensity={0.35} luminanceThreshold={0.85} radius={0.25} />
          </EffectComposer>
        </ScrollControls>
      </Canvas>
    </div>
  );
}

export default HeroScene;
