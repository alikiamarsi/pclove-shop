"use client";

import { Category, useScrollStore } from "@/scrollStore";

type Props = {
  name: Category;
  opacity?: number
};

function CategoryCard({ name, opacity = 1 }: Props) {
  
  const setHoveredCategory = useScrollStore(
    (state) => state.setHoveredCategory
  );

  const hoveredCategory = useScrollStore(
    (state) => state.hoveredCategory
  );

  const setSelectedCategory = useScrollStore(
    (state) => state.setSelectedCategory
  );

  const selectedCategory = useScrollStore(
    (state) => state.selectedCategory
  )

  const isHovered = hoveredCategory === name;

  const isSelected = selectedCategory === name;

  return (
    <div
      onClick={() => setSelectedCategory(name)}
      style={{opacity}}
      onPointerEnter = {() => setHoveredCategory(name)}
      onPointerLeave = {() => setHoveredCategory(null)}
      className={`
        pointer-events-auto
        group
        flex h-40 w-56
        cursor-pointer
        items-center justify-center
        rounded-2xl
        border
        backdrop-blur-xl
        text-2xl
        font-bold
        text-white
        transition-all
        duration-300

        ${
          isSelected
            ? "scale-125 border-green-400 bg-green-400/20 shadow-[0_0_70px_rgba(34,197,94,0.6)]"
            : isHovered
            ? "scale-110 border-green-400 bg-green-400/10 shadow-[0_0_40px_rgba(34,197,94,0.35)]"
            : "border-green-400/30 bg-white/5"
        }
      `}
    >
    <span className={`
      transition-all
      duration-300
      ${
        isHovered
          ? "text-green-400"
          : "text-white"
      }
      `}>
        {name}
    </span>
    </div>
  );
}

export default CategoryCard;
