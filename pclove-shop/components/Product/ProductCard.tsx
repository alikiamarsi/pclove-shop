import Image from "next/image";
import { Product } from "@/types/product";
import Link from "next/link";
import AddToCartButton from "./AddToCartButton";
import WishlistButton from "./WishlistButton";
import QuickViewButton from "./QuickViewButton";
import { memo } from "react";


type Props = {
  product: Product;
  onQuickView?: (product: Product, element: HTMLElement) => void;
};

function ProductCard({ product, onQuickView}: Props) {
  return (
    <div className="group relative flex h-full flex-col overflow-visible rounded-xl border border-gray-200 bg-white p-4 shadow-sm transition hover:shadow-lg dark:border-gray-800 dark:bg-gray-900">

        <WishlistButton product={product} />

        {onQuickView && (
          <QuickViewButton
            onClick={onQuickView}
            product={product}
        />
       )}

        <Link
          href={`/products/${product.id}`}
          className="flex flex-1 flex-col"
          >
        <div className="relative h-56 w-full">
          <Image
          src={product.image}
          alt={product.title}
          fill
          className="object-contain p-4"
          />
        </div>

      <div className="flex flex-1 flex-col p-4">
        <p className="text-sm text-gray-500 dark:text-gray-400">
          {product.brand}
        </p>

        <h2 className="mt-2 line-clamp-2 text-lg font-semibold text-gray-900 dark:text-gray-100">
          {product.title}
        </h2>

        <div className="mt-auto flex items-center justify-between">
          <span className="text-xl font-bold text-blue-600 dark:text-blue-400">
            ${product.price}
          </span>

          <span className="text-sm text-yellow-500">
            ⭐ {product.rating}
          </span>
        </div>
      </div>
    </Link>
    <div className="p-4 pt-0">
      <AddToCartButton product={product} />
    </div>
    </div>
    
  );
}

export default memo(ProductCard);