import { useScrollStore } from "@/scrollStore";
import { useScroll } from "@react-three/drei"
import { useFrame } from "@react-three/fiber";


function ScrollController() {
    const scroll = useScroll();
    const setProgress = useScrollStore((state) => state.setProgress)

    useFrame(() => {
        setProgress(scroll.offset)
    })
  return null
}

export default ScrollController