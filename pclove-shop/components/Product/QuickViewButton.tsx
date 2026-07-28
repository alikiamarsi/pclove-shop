"use client"

import { Product } from "@/types/product";
import { Eye } from "lucide-react";

type props = {
    product: Product;
    onClick: (product: Product, element: HTMLElement) => void
}

function QuickViewButton({product, onClick}: props) {
  return (
            <button 
          type="button"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();

            onClick(product, e.currentTarget);
          }}
          className="
            group/eye
            absolute left-3 top-3 z-10
            flex h-10 w-10 items-center justify-center
            rounded-full
          bg-white/90
            shadow-md
            backdrop-blur-sm
            opacity-0 scale-90
            transition-all duration-200
            group-hover:opacity-100
            group-hover:scale-100
          hover:bg-blue-50
            hover:shadow-lg
            "
        >
          <Eye
            size={18}
            className="text-gray-700 transition-colors duration-200 group-hover/eye:text-blue-500"  
          />
        </button>
  )
}

export default QuickViewButton