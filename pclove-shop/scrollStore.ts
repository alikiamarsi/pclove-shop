import { create } from "zustand";


type ScrollStore = {
    progress: number;
    setProgress: (value: number) => void;
};

export const useScrollStore = create<ScrollStore>((set) => ({
    progress: 0,

    setProgress: (value) => set({ progress: value})
}))