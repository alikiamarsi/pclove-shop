"use client";

import { useScrollStore } from "@/scrollStore";
import { useGLTF } from "@react-three/drei";
import { useThree } from "@react-three/fiber";

function CategoryModels() {
  const gpu = useGLTF("/models/gpu.glb");
  const cpu = useGLTF("/models/cpu.glb");
  const ram = useGLTF("/models/ram.glb");
  const cooling = useGLTF("/models/fan.glb");
  const motherboard = useGLTF("/models/motherboard.glb");
  const accessories = useGLTF("/models/keyboard.glb");

  const phase = useScrollStore((state) => state.phase);
  
  const { size } = useThree();

  const aspect = size.width / size.height;

  const groupScale =
    aspect < 1
    ? 0.7
    : aspect < 1.5
    ? 0.85
    : 1;

  if (phase !== "categories") return null;

  return (
    <group scale={groupScale}>
      <primitive
        object={gpu.scene}
        position={[-6, 3, 0]}
        rotation={[6, Math.PI * 0.1, 4]}
        scale={0.4}
      />

      <primitive
        object={motherboard.scene}
        position={[0.5, 5, 0]}
        rotation={[5.8, Math.PI * 0.1, 0.5]}
        scale={0.4}
      />

      <primitive
        object={cpu.scene}
        position={[0, -1.5, 0]}
        rotation={[0.45, Math.PI * 0.7, 6.9]}
        scale={0.55}
      />

      <primitive
        object={ram.scene}
        position={[4.5, 2.8, 0]}
        rotation={[1, Math.PI * 0.2, 0]}
        scale={0.3}
      />

      <primitive
        object={cooling.scene}
        position={[-5.5, -1.8, 0]}
        rotation={[1.6, Math.PI * 0.2, 2]}
        scale={12}
      />

      <primitive
        object={accessories.scene}
        position={[5, -1.5, 0]}
        rotation={[0.35, Math.PI * 0.2, 0.15]}
        scale={0.01}
      />
    </group>
  );
}

export default CategoryModels;