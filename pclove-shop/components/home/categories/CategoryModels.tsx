"use client";

import { useScrollStore } from "@/scrollStore";
import { useGLTF } from "@react-three/drei";
import { useThree } from "@react-three/fiber";
import CategoryModel from "./CategoryModel";


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
      
      <CategoryModel
        model={gpu.scene}
        category="Graphics Cards"
        position={[-6, 3, 0]}
        rotation={[6, Math.PI * 0.1, 4]}
        scale={0.4}
        floatOffset={0}
      />

      <CategoryModel
        model={motherboard.scene}
        category="Motherboards"
        position={[0.5, 5, 0]}
        rotation={[5.8, Math.PI * 0.1, 0.5]}
        scale={0.4}
        floatOffset={1.5}
      />

      <CategoryModel
        model={cpu.scene}
        category="CPU"
        position={[0, -1.5, 0]}
        rotation={[0.45, Math.PI * 0.7, 6.9]}
        scale={0.55}
        floatOffset={1}
      />

      <CategoryModel
        model={ram.scene}
        category="RAM"
        position={[4.5, 2.8, 0]}
        rotation={[1, Math.PI * 0.2, 0]}
        scale={0.3}
        floatOffset={2}
      />

      <CategoryModel
        model={cooling.scene}
        category="Cooling"
        position={[-5.5, -1.8, 0]}
        rotation={[1.6, Math.PI * 0.2, 2]}
        scale={12}
        floatOffset={0.5}
      />

      <CategoryModel
        model={accessories.scene}
        category="Keyboards"
        position={[5, -1.5, 0]}
        rotation={[0.35, Math.PI * 0.2, 0.15]}
        scale={0.01}
        floatOffset={2.5}
      />
    </group>
  );
}

export default CategoryModels;