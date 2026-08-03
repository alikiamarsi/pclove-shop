"use client";

import EnergyRing from "./EnergyRing";

function EnergyParticles() {
  return (
    <>
        <EnergyRing 
            radius={2.4}
            speed={0.45}
        />

        <EnergyRing 
            radius={3.2}
            speed={-0.45}
            heightOffset={0.25}
        />
    </>
  )
}

export default EnergyParticles