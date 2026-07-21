import Image from "next/image";
import { Product } from "@/types/product";
import Link from "next/link";
import AddToCartButton from "./AddToCartButton";
import WishlistButton from "./WishlistButton";


type Props = {
  product: Product;
  onHover?: (element: HTMLElement) => void
  onLeave?: () => void;
};

function ProductCard({ product, onHover, onLeave }: Props) {
  return (
    <div 
    onMouseEnter={(e) => onHover?.(e.currentTarget)}
    onMouseLeave={onLeave}
    className="group relative flex h-full flex-col p-4 overflow-visible rounded-xl bg-white shadow-sm transition hover:shadow-lg">
      <Link 
      href={`/products/${product.id}`}
      className="flex flex-1 flex-col"
    >

      <div className="relative h-56 w-full">

        <WishlistButton product={product} />

        <Image
          src={product.image}
          alt={product.title}
          fill
          className="object-contain p-4"
        />
      </div>

      <div className="flex flex-1 flex-col p-4">
        <p className="text-sm text-gray-500">{product.brand}</p>

        <h2 className="mt-2 line-clamp-2 text-lg font-semibold">
          {product.title}
        </h2>

        <div className="mt-auto flex items-center justify-between">
          <span className="text-xl font-bold text-blue-600">
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

export default ProductCard;