"use client";

import { ThreeEvent, useFrame } from "@react-three/fiber";
import { useRouter } from "next/navigation";
import { useScrollStore, Category } from "@/scrollStore";
import { useRef } from "react";
import * as THREE from "three";

type Props = {
    model: THREE.Object3D;
    name: Category;
    category: string;
    position: [number, number, number];
    rotation: [number, number, number];
    scale: number;
    floatOffset?: number;
};

function CategoryModel({
    model,
    category,
    name,
    position,
    rotation,
    scale,
    floatOffset = 0,
}: Props) {
    const groupRef = useRef<THREE.Group>(null);
    const modelRef = useRef<THREE.Group>(null);

    const router = useRouter();

    const hoveredCategory = useScrollStore(
        (state) => state.hoveredCategory
    );

    const setHoveredCategory = useScrollStore(
        (state) => state.setHoveredCategory
    );

    const isHovered = hoveredCategory?.name === name;

    useFrame((state) => {
        if (!groupRef.current || !modelRef.current) return;

        const time = state.clock.getElapsedTime();

        groupRef.current.position.y =
            position[1] +
            Math.sin(time * 1.2 + floatOffset) * 0.12;

        const targetScale = isHovered ? 1.15 : 1;

        modelRef.current.scale.lerp(
            new THREE.Vector3(
                targetScale,
                targetScale,
                targetScale
            ),
            0.1
        );
    });

    const handlePointerEnter = (
        event: ThreeEvent<PointerEvent>
    ) => {
        event.stopPropagation();

        setHoveredCategory({
            name,
            position,
        });
    };

    const handlePointerLeave = (
        event: ThreeEvent<PointerEvent>
    ) => {
        event.stopPropagation();

        setHoveredCategory(null);
    };

    const handleClick = (
        event: ThreeEvent<MouseEvent>
    ) => {
        event.stopPropagation();

        router.push(
            `/products?category=${encodeURIComponent(category)}`
        );
    };

    return (
        <group
            ref={groupRef}
            position={position}
        >
            <group ref={modelRef}>
                <primitive
                    object={model}
                    rotation={rotation}
                    scale={scale}
                    onPointerEnter={handlePointerEnter}
                    onPointerLeave={handlePointerLeave}
                    onClick={handleClick}
                />
            </group>
        </group>
    );
}

export default CategoryModel;