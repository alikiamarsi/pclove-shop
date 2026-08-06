import { create } from "zustand";

export type HeroPhase =
| "intro"
| "zoom"
| "categories";

type ScrollStore = {
    progress: number;
    phase: HeroPhase;

    setProgress: (value: number) => void;
};

export const useScrollStore = create<ScrollStore>((set) => ({
    progress: 0,

    phase: "intro",

    setProgress: (value) => {
        let phase: HeroPhase = "intro";

        if(value >= 0.75) {
            phase = "categories";
        } else if (value >= 0.35) {
            phase = "zoom";
        }

        set({
            progress: value,
            phase,
        })
    }
}))