"use client"

import { ThreeEvent, useFrame, useThree } from "@react-three/fiber";
import { useRouter } from "next/navigation";
import { useRef } from "react";
import * as THREE from "three"

type Props = {
    model: THREE.Object3D;
    category: string;
    position: [number, number, number];
    rotation: [number, number, number];
    scale: number;
    floatOffset?: number;
}

function CategoryModel({
    model,
    category,
    position,
    rotation,
    scale,
    floatOffset = 0,
}: Props) {
    const groupRef = useRef<THREE.Group>(null);

    const router = useRouter();

    const {raycaster, pointer, camera} = useThree();

    useFrame((state) => {
        const time = state.clock.getElapsedTime();

        if(!groupRef.current) return;

        raycaster.setFromCamera(pointer, camera);

        const intersections = raycaster.intersectObject(
            model,
            true
        );

        const isHovered = intersections.length > 0;

        groupRef.current.position.y = 
            position[1] + Math.sin(time * 1.2 + floatOffset) * 0.12;

        const targetZ = isHovered ? position[2] : position[2];

        groupRef.current.position.z = THREE.MathUtils.lerp(
            groupRef.current.position.z,
            targetZ,
            0.08
        );

        const targetScale = isHovered ? 1.15 : 1;

        const smoothScale = THREE.MathUtils.lerp(
            groupRef.current.scale.x,
            targetScale,
            0.08
        );

        groupRef.current.scale.setScalar(smoothScale)
    });

    const handleClick = (event: ThreeEvent<MouseEvent>) => {
        event.stopPropagation();

        router.push(
            `/products?category=${encodeURIComponent(category)}`
        );
    };
  return (
    <group
        ref={groupRef}
        position={position}
        onClick={handleClick}
    >
        <primitive
            object={model}
            rotation={rotation}
            scale={scale}
        />
    </group>
  )
}

export default CategoryModel