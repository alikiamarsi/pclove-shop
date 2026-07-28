import { Product } from "@/types/product"
import React, { CSSProperties } from "react";

type Props = {
  product: Product;
  floatingStyles: CSSProperties;
  floatingRef: (node: HTMLElement | null) => void;
  onClose: () => void;
  floatingProps: React.HTMLAttributes<HTMLDivElement>;
};

function ProductPreview({ product,floatingStyles, floatingRef, onClose, floatingProps }: Props) {
  return (
    <div 
    {...floatingProps}
    ref={floatingRef}
    style={floatingStyles}
    className="relative z-50 w-80 rounded-xl border bg-white p-5 shadow-xl">
      <button 
        onClick={onClose}
        className="absolute right-3 top-3 text-gray-500 hover:text-red-500"
      >
        ✕
      </button>

      <h2 className="text-xl font-bold">
        {product.title}
      </h2>

      <p className="mt-2 text-sm text-gray-500">
        {product.brand}
      </p>

      <div className="mt-4 flex items-center gap-2">
        <span className="rounded bg-yellow-100 px-2 py-1 text-sm font-medium text-yellow-700">
          ⭐ {product.rating}
        </span>

        <span className="rounded bg-gray-100 px-2 py-1 text-sm">
          {product.category}
        </span>
      </div>

      <p className="mt-5 text-3xl font-bold text-blue-600">
        ${product.price.toFixed(2)}
      </p>

      <p className="mt-3 font-medium text-green-600">
        In Stock: {product.stock}
      </p>

      <div className="mt-5 border-t pt-4">
        <h3 className="mb-2 font-semibold">
          Description
        </h3>

        <p className="line-clamp-4 text-sm leading-6 text-gray-600">
          {product.description}
        </p>
      </div>

    </div>
  )
}

export default ProductPreview