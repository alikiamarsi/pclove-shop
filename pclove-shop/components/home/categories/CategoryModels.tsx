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

  const isMobile = size.width < 640;

  if(phase !== "categories") return null;


  if (phase !== "categories") return null;
  return (
        <group scale={isMobile ? 0.8 : 1}>
      
      <CategoryModel
        model={gpu.scene}
        name="GPU"
        category="Graphics Cards"
        position={isMobile ? [-2.5, 6, 0] : [-6, 3, 0]}
        rotation={[6, Math.PI * 0.1, 4]}
        scale={0.4}
        floatOffset={0}
      />

      <CategoryModel
        model={motherboard.scene}
        name="Motherboard"
        category="Motherboards"
        position={isMobile ? [3, 8, 0] : [0.5, 5, 0]}
        rotation={[5.8, Math.PI * 0.1, 0.5]}
        scale={0.4}
        floatOffset={1.5}
      />

      <CategoryModel
        model={cpu.scene}
        name="CPU"
        category="CPU"
        position={isMobile ? [-2, 1, 0] : [0, -1.5, 0]}
        rotation={[0.45, Math.PI * 0.7, 6.9]}
        scale={0.55}
        floatOffset={1}
      />

      <CategoryModel
        model={ram.scene}
        name="RAM"
        category="RAM"
        position={isMobile ? [2, 1, 0] : [4.5, 2.8, 0]}
        rotation={[1, Math.PI * 0.2, 0]}
        scale={0.3}
        floatOffset={2}
      />

      <CategoryModel
        model={cooling.scene}
        name="Cooling"
        category="Cooling"
        position={isMobile ? [-2, -4, 0] : [-5.5, -1.8, 0]}
        rotation={[1.6, Math.PI * 0.2, 2]}
        scale={12}
        floatOffset={0.5}
      />

      <CategoryModel
        model={accessories.scene}
        name="Keyboards"
        category="Keyboards"
        position={isMobile ? [2, -4, 0] : [5, -1.5, 0]}
        rotation={[0.35, Math.PI * 0.2, 0.15]}
        scale={0.01}
        floatOffset={2.5}
      />
    </group>
  );
}

export default CategoryModels;  