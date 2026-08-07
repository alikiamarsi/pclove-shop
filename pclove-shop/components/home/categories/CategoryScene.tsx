"use client";

import { Category, useScrollStore } from "@/scrollStore";
import CategoryCard from "./CategoryCard";

function CategoryScene() {

  const progress = useScrollStore((state) => state.progress);

  const selectedCategory = useScrollStore(
    (state) => state.selectedCategory
  );

  const categories: Category[] = [
    "GPU",
    "CPU",
    "RAM",
    "Cooling",
    "Motherboard",
    "Accessories",
  ];

  const opacity = Math.min(
    Math.max((progress - 0.75) / 0.25, 0),
    1
  );

  return (
    <div 
      className="absolute inset-0 z-20 flex items-center justify-center"

      style={{
        opacity,
        pointerEvents: opacity === 0 ? "none" : "auto"
      }}
    >
      <div className="grid grid-cols-3 gap-8">
        {categories.map((category) => (
          <CategoryCard
            key={category}
            name={category}
            opacity={
              selectedCategory && selectedCategory !== category
                ? 0
                : opacity
            }
          />
        ))}
      </div>
    </div>
  );
}

export default CategoryScene;
