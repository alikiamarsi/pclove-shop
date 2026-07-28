"use client";

import { useAppSelector } from "@/store/hooks";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { ReactNode, useState } from "react";
import { Heart, ShoppingCart } from "lucide-react";

function HeaderClient({children}: {children: ReactNode}) {
  const cartItems = useAppSelector((state) => state.cart.items);
  const totalQuantity = cartItems.reduce(
    (total, item) => total + item.quantity,
    0,
  );

  const wishlistItems = useAppSelector((state) => state.wishlist.items);

  const [search, setSearch] = useState("");

  const router = useRouter();
  const searchParams = useSearchParams();
  return (
    <div className="flex flex-1 items-center">
      <div className="relative flex-1 px-8">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              router.push(`/products?search=${encodeURIComponent(search)}`);
            }
          }}
          placeholder="Search Products..."
          className="w-full rounded-lg border px-4 py-2 text-sm outline-none transition focus:border-blue-500"
        />
        {search && (
          <button
            onClick={() => {
              setSearch("");
              const category = searchParams.get("category");

              if (category) {
                router.push(
                  `/products?category=${encodeURIComponent(category)}`,
                );
              } else {
                router.push("/products");
              }
            }}
            className="absolute right-11 top-1/2 -translate-y-1/2 text-gray-400 transition hover:text-gray-700"
          >
            ✕
          </button>
        )}
      </div>

      <nav>
        <ul className="flex items-center gap-6">
          <li>
            <Link
              href="/"
              className="font-medium transition hover:text-blue-600"
            >
              Home
            </Link>
          </li>

          <li>
            <Link
              href="/products"
              className="font-medium transition hover:text-blue-600"
            >
              Products
            </Link>
          </li>

          <li>
            {children}
          </li>

          <li>
            <Link href="/wishlist" className="relative flex items-center">
              <Heart className="h-6 w-6 transition hover:text-red-500" />

              {wishlistItems.length > 0 && (
                <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs font-semibold text-white">
                  {wishlistItems.length}
                </span>
              )}
            </Link>
          </li>

          <li>
            <Link href="/cart" className="relative flex items-center">
              <ShoppingCart className="h-6 w-6 transition hover:text-blue-600" />
              {totalQuantity > 0 && (
                <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs font-semibold text-white">
                  {totalQuantity}
                </span>
              )}
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default HeaderClient;
