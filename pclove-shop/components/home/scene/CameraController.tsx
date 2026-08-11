"use client"

import { useScrollStore } from "@/scrollStore";
import { useFrame, useThree } from "@react-three/fiber"
import { useRef } from "react";
import { Vector3 } from "three";

function CameraController() {

    const { camera, size } = useThree();

    const progress = useScrollStore((state) => state.progress);
    const phase = useScrollStore((state) => state.phase);

    const targetPosition = useRef(new Vector3());

    useFrame((_, delta) => {
        if (phase === "categories") {
            const aspect = size.width / size.height;

            let z = 7;
            
            if(aspect < 1) {
                z = 10;
            } else if (aspect < 1.5) {
                z = 8.5;
            }

        targetPosition.current.set(
            0,
            0,
            z
        );
        } else {
        targetPosition.current.set(
            0,
            0,
            6 - progress * 1.5
        )
        }
        camera.position.lerp(
            targetPosition.current,
            delta * 3
        );
    });

  return null
}

export default CameraController