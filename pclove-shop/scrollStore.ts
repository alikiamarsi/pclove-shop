import { create } from "zustand";

export type HeroPhase =
| "intro"
| "zoom"
| "categories";

export type Category = 
    | "GPU"
    | "CPU"
    | "RAM"
    | "Cooling"
    | "Motherboard"
    | "Keyboards"

export type HoveredCategory = Category | null;

export type HoveredCategoryData = {
    name: Category;
    position: [number, number, number];
} | null;

type ScrollStore = {
    progress: number;
    phase: HeroPhase;

    hoveredCategory: HoveredCategoryData;

    setProgress: (value: number) => void;

    setHoveredCategory: (value: HoveredCategoryData) => void;

    selectedCategory: HoveredCategory;

    setSelectedCategory: (value: HoveredCategory) => void;
};

export const useScrollStore = create<ScrollStore>((set) => ({
    progress: 0,

    phase: "intro",

    hoveredCategory: null,

    selectedCategory: null,

    setProgress: (value) => {
        let phase: HeroPhase = "intro";

        if(value >= 0.98) {
            phase = "categories";
        } else if (value >= 0.35) {
            phase = "zoom";
        }

        set({
            progress: value,
            phase,
        })
    },

    setHoveredCategory: (value) => set({hoveredCategory: value}),

    setSelectedCategory: (value) => set({selectedCategory: value})
}))