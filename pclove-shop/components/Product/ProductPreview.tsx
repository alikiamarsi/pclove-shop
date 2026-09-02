import { Product } from "@/types/product"
import React, { CSSProperties } from "react";

type Props = {
  product: Product;
  floatingStyles: CSSProperties;
  floatingRef: (node: HTMLElement | null) => void;
  onClose: () => void;
  floatingProps: React.HTMLAttributes<HTMLDivElement>;
};

function ProductPreview({ product,floatingStyles, floatingRef, onClose, floatingProps}: Props) {
  return (
    <div 
    {...floatingProps}
    ref={floatingRef}
    style={{
        ...floatingStyles,
        visibility: floatingStyles.transform ? "visible" : "hidden",
      }}
    className="relative z-50 w-80"
    >
      <div
        className="
          animate-preview-in
          rounded-xl
          border border-gray-200
          bg-white
          p-5
          text-gray-900
          shadow-xl
          dark:border-gray-700
          dark:bg-[#182233]
          dark:text-gray-100
        "
      >
      <button 
      type="button"
        onClick={onClose}
        aria-label="Close preview"
        className="
          absolute right-3 top-3
          text-gray-400
          transition-colors
          hover:text-red-500
          dark:text-gray-500
          dark:hover:text-red-400
        "
      >
        ✕
      </button>

      <h2 className="pr-6 text-xl font-bold">
        {product.title}
      </h2>

      <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
        {product.brand}
      </p>

      <div className="mt-4 flex items-center gap-2">
        <span className="
            rounded
            bg-yellow-100
            px-2
            py-1
            text-sm
            font-medium
            text-yellow-700
            dark:bg-yellow-500/10
            dark:text-yellow-400
          "
        >
          ⭐ {product.rating}
        </span>

        <span className="
            rounded
            bg-gray-100
            px-2
            py-1
            text-sm
            text-gray-700
            dark:bg-gray-700
            dark:text-gray-300
          "
        >
          {product.category}
        </span>
      </div>

      <p className="mt-5 text-3xl font-bold text-blue-600 dark:text-blue-400">
        ${product.price.toFixed(2)}
      </p>

      <p className="mt-3 font-medium text-green-600 dark:text-green-400">
        In Stock: {product.stock}
      </p>

      <div className="mt-5 border-t border-gray-200 pt-4 dark:border-gray-700">
        <h3 className="mb-2 font-semibold text-gray-900 dark:text-gray-100">
          Description
        </h3>

        <p className="line-clamp-4 text-sm leading-6 text-gray-600 dark:text-gray-400">
          {product.description}
        </p>
      </div>
    </div>
    </div>
  )
}

export default ProductPreview