"use client";

import Image from "next/image";
import Link from "next/link";
import { Trash2 } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { toggleWishlist } from "@/store/wishlistSlice";
import AddToCartButton from "@/components/Product/AddToCartButton";

function WishlistPage() {
  const dispatch = useAppDispatch();

  const wishlistItems = useAppSelector(
    (state) => state.wishlist.items
  );

  return (
    <main className="mx-auto max-w-7xl px-6 py-10">
      <h1 className="mb-8 text-3xl font-bold">
        Wishlist
      </h1>

      {wishlistItems.length === 0 ? (
        <p className="text-gray-500">
          Your wishlist is empty
        </p>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {wishlistItems.map((product) => (
            <div
              key={product.id}
              className="rounded-xl border bg-white p-4 shadow-sm"
            >
              <Link href={`/products/${product.id}`}>
                <div className="relative h-48 w-full">
                  <Image
                    src={product.image}
                    alt={product.title}
                    fill
                    sizes="(max-width: 1024px) 100vw, 25vw"
                    className="object-contain"
                  />
                </div>

                <h2 className="mt-4 font-semibold">
                  {product.title}
                </h2>

                <p className="mt-2 text-lg font-bold text-blue-600">
                  ${product.price.toFixed(2)}
                </p>

                <div className="mt-4">
                    <AddToCartButton product={product} />
                </div>

              </Link>

              <button
                onClick={() => dispatch(toggleWishlist(product))}
                className="mt-4 flex w-full items-center justify-center gap-2 rounded-lg bg-red-50 py-2 text-red-600 transition hover:bg-red-100"
              >
                <Trash2 size={18} />
                Remove
              </button>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}

export default WishlistPage;