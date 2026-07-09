import Image from "next/image";
import { Product } from "@/types/product";
import Link from "next/link";

type Props = {
  product: Product;
};

function ProductCard({ product }: Props) {
  return (
    <div className="overflow-hidden rounded-xl bg-white shadow-sm transition hover:shadow-lg">
      <Link 
      href={`/products/${product.id}`}
      className="block "
    >

      <div className="relative h-56 w-full">
        <Image
          src={product.image}
          alt={product.title}
          fill
          className="object-contain p-4"
        />
      </div>

      <div className="space-y-2 p-4">
        <p className="text-sm text-gray-500">{product.brand}</p>

        <h2 className="line-clamp-2 text-lg font-semibold">
          {product.title}
        </h2>

        <div className="flex items-center justify-between">
          <span className="text-xl font-bold text-blue-600">
            ${product.price}
          </span>

          <span className="text-sm text-yellow-500">
            ⭐ {product.rating}
          </span>
        </div>
      </div>
    </Link>
    <button className="mt-2 w-full rounded-lg bg-blue-600 py-2 font-medium text-white transition hover:bg-blue-700">
          Add to Cart
        </button>
    </div>
    
  );
}

export default ProductCard;