"use client"

import { useScrollStore } from "@/scrollStore";
import { useFrame, useThree } from "@react-three/fiber"
import { useRef } from "react";
import { Vector3 } from "three";

function CameraController() {

    const { camera } = useThree();

    const progress = useScrollStore(
        (state) => state.progress
    );

    const targetPosition = useRef(
        new Vector3
    );

    useFrame((_, delta) => {
        targetPosition.current.set(
            0,
            0,
            6 - progress * 1.5
        );

        camera.position.lerp(
            targetPosition.current,
            delta * 3
        );
    });

  return null
}

export default CameraController