"use client";

import { useAppSelector } from "@/store/hooks";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { ReactNode, useState } from "react";
import { Heart, ShoppingCart, Menu, X, ChevronDown } from "lucide-react";
import { useHasHydrated } from "@/store/useHasHydrated";

function HeaderClient({ children }: { children: ReactNode }) {
  const cartItems = useAppSelector((state) => state.cart.items);

  const wishlistItems = useAppSelector((state) => state.wishlist.items);

  const hasHydrated = useHasHydrated();

  const totalQuantity = hasHydrated
    ? cartItems.reduce((total, item) => total + item.quantity, 0)
    : 0;

  const wishlistCount = hasHydrated ? wishlistItems.length : 0;

  const [search, setSearch] = useState("");
  const [isCategoriesOpen, setIsCategoriesOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const router = useRouter();
  const searchParams = useSearchParams();

  function updateSearchQuery(value: string) {
    const params = new URLSearchParams(searchParams.toString());

    const trimmedSearch = value.trim();

    if (trimmedSearch) {
      params.set("search", trimmedSearch);
    } else {
      params.delete("search");
    }

    const query = params.toString();

    router.push(query ? `/products?${query}` : "/products");
  }

  function clearSearch() {
    setSearch("");
    updateSearchQuery("");
  }

  return (
    <div className="flex flex-1 items-center justify-end">
      {/* Desktop Search */}
      <div className="relative hidden flex-1 px-8 md:block">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              updateSearchQuery(search);
            }
          }}
          placeholder="Search Products..."
          className="w-full rounded-lg border px-4 py-2 text-sm outline-none transition focus:border-blue-500"
        />

        {search && (
          <button
            type="button"
            aria-label="Clear search"
            onClick={clearSearch}
            className="absolute right-11 top-1/2 -translate-y-1/2 text-gray-400 transition hover:text-gray-700"
          >
            ✕
          </button>
        )}
      </div>

      {/* Desktop Navigation */}
      <nav className="hidden md:block">
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

          <li>{children}</li>
        </ul>
      </nav>

      {/* Wishlist */}
      <Link href="/wishlist" className="relative ml-6 flex items-center">
        <Heart className="h-6 w-6 transition hover:text-red-500" />

        {wishlistCount > 0 && (
          <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs font-semibold text-white">
            {wishlistCount}
          </span>
        )}
      </Link>

      {/* Cart */}
      <Link href="/cart" className="relative ml-6 flex items-center">
        <ShoppingCart className="h-6 w-6 transition hover:text-blue-600" />

        {totalQuantity > 0 && (
          <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs font-semibold text-white">
            {totalQuantity}
          </span>
        )}
      </Link>

      {/* Mobile Menu Button */}
      <button
        type="button"
        onClick={() => setIsMenuOpen((previous) => !previous)}
        className="ml-6 flex items-center md:hidden"
        aria-label="Toggle menu"
      >
        {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </button>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="fixed inset-x-0 top-16 z-100 border-t bg-white px-4 py-5 shadow-lg md:hidden">
          {/* Mobile Search */}
          <div className="relative">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={(event) => {
                if (event.key === "Enter") {
                  updateSearchQuery(search);
                  setIsMenuOpen(false);
                }
              }}
              placeholder="Search Products..."
              className="w-full rounded-lg border px-4 py-2 text-sm outline-none transition focus:border-blue-500"
            />

            {search && (
              <button
                type="button"
                aria-label="Clear search"
                onClick={clearSearch}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 transition hover:text-gray-700"
              >
                ✕
              </button>
            )}
          </div>

          <nav className="mt-5">
            <ul className="space-y-4">
              <li>
                <Link
                  href="/"
                  onClick={() => setIsMenuOpen(false)}
                  className="block font-medium transition hover:text-blue-600"
                >
                  Home
                </Link>
              </li>

              <li>
                <Link
                  href="/products"
                  onClick={() => setIsMenuOpen(false)}
                  className="block font-medium transition hover:text-blue-600"
                >
                  Products
                </Link>
              </li>

              <li>
                <button
                  type="button"
                  onClick={() => setIsCategoriesOpen((previous) => !previous)}
                  className="flex w-full items-center justify-between font-medium"
                >
                  Categories
                  <ChevronDown
                    className={`h-4 w-4 transition-transform ${
                      isCategoriesOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {isCategoriesOpen && (
                  <div className="mt-3 space-y-3 border-l border-gray-200 pl-4">
                    <Link
                      href="/products?category=CPU"
                      onClick={() => {
                        setIsMenuOpen(false);
                        setIsCategoriesOpen(false);
                      }}
                      className="block text-sm text-gray-600 transition hover:text-blue-600"
                    >
                      CPU
                    </Link>

                    <Link
                      href="/products?category=Graphics%20Cards"
                      onClick={() => {
                        setIsMenuOpen(false);
                        setIsCategoriesOpen(false);
                      }}
                      className="block text-sm text-gray-600 transition hover:text-blue-600"
                    >
                      Graphics Cards
                    </Link>

                    <Link
                      href="/products?category=Headsets"
                      onClick={() => {
                        setIsMenuOpen(false);
                        setIsCategoriesOpen(false);
                      }}
                      className="block text-sm text-gray-600 transition hover:text-blue-600"
                    >
                      Headsets
                    </Link>

                    <Link
                      href="/products?category=Keyboards"
                      onClick={() => {
                        setIsMenuOpen(false);
                        setIsCategoriesOpen(false);
                      }}
                      className="block text-sm text-gray-600 transition hover:text-blue-600"
                    >
                      Keyboards
                    </Link>

                    <Link
                      href="/products?category=Monitors"
                      onClick={() => {
                        setIsMenuOpen(false);
                        setIsCategoriesOpen(false);
                      }}
                      className="block text-sm text-gray-600 transition hover:text-blue-600"
                    >
                      Monitors
                    </Link>

                    <Link
                      href="/products?category=Mouse"
                      onClick={() => {
                        setIsMenuOpen(false);
                        setIsCategoriesOpen(false);
                      }}
                      className="block text-sm text-gray-600 transition hover:text-blue-600"
                    >
                      Mouse
                    </Link>
                  </div>
                )}
              </li>
            </ul>
          </nav>
        </div>
      )}
    </div>
  );
}

export default HeaderClient;
