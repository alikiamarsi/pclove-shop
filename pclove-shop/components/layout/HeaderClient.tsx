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
          className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-blue-500 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100 dark:placeholder:text-gray-500"
        />

        {search && (
          <button
            type="button"
            aria-label="Clear search"
            onClick={clearSearch}
            className="absolute right-11 top-1/2 -translate-y-1/2 text-gray-400 transition hover:text-gray-700 dark:hover:text-gray-200"
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
              className="font-medium text-gray-900 transition hover:text-blue-600 dark:text-gray-100"
            >
              Home
            </Link>
          </li>

          <li>
            <Link
              href="/products"
              className="font-medium text-gray-900 transition hover:text-blue-600 dark:text-gray-100"
            >
              Products
            </Link>
          </li>

          <li>{children}</li>
        </ul>
      </nav>

      {/* Wishlist */}
      <Link
        href="/wishlist"
        className="relative ml-6 flex items-center text-gray-900 dark:text-gray-100"
      >
        <Heart className="h-6 w-6 transition hover:text-red-500" />

        {wishlistCount > 0 && (
          <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs font-semibold text-white">
            {wishlistCount}
          </span>
        )}
      </Link>

      {/* Cart */}
      <Link
        href="/cart"
        className="relative ml-6 flex items-center text-gray-900 dark:text-gray-100"
      >
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
        className="ml-6 flex items-center text-gray-900 dark:text-gray-100 md:hidden"
        aria-label="Toggle menu"
      >
        {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </button>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="fixed inset-x-0 top-16 z-100 border-t border-gray-200 bg-white px-4 py-5 shadow-lg dark:border-gray-800 dark:bg-gray-950 md:hidden">
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
              className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-blue-500 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100 dark:placeholder:text-gray-500"
            />

            {search && (
              <button
                type="button"
                aria-label="Clear search"
                onClick={clearSearch}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 transition hover:text-gray-700 dark:hover:text-gray-200"
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
                  className="block font-medium text-gray-900 transition hover:text-blue-600 dark:text-gray-100"
                >
                  Home
                </Link>
              </li>

              <li>
                <Link
                  href="/products"
                  onClick={() => setIsMenuOpen(false)}
                  className="block font-medium text-gray-900 transition hover:text-blue-600 dark:text-gray-100"
                >
                  Products
                </Link>
              </li>

              <li>
                <button
                  type="button"
                  onClick={() => setIsCategoriesOpen((previous) => !previous)}
                  className="flex w-full items-center justify-between font-medium text-gray-900 dark:text-gray-100"
                >
                  Categories
                  <ChevronDown
                    className={`h-4 w-4 transition-transform ${
                      isCategoriesOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {isCategoriesOpen && (
                  <div className="mt-3 space-y-3 border-l border-gray-200 pl-4 dark:border-gray-700">
                    <Link
                      href="/products?category=CPU"
                      onClick={() => {
                        setIsMenuOpen(false);
                        setIsCategoriesOpen(false);
                      }}
                      className="block text-sm text-gray-600 transition hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400"
                    >
                      CPU
                    </Link>

                    <Link
                      href="/products?category=Graphics%20Cards"
                      onClick={() => {
                        setIsMenuOpen(false);
                        setIsCategoriesOpen(false);
                      }}
                      className="block text-sm text-gray-600 transition hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400"
                    >
                      Graphics Cards
                    </Link>

                    <Link
                      href="/products?category=Headsets"
                      onClick={() => {
                        setIsMenuOpen(false);
                        setIsCategoriesOpen(false);
                      }}
                      className="block text-sm text-gray-600 transition hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400"
                    >
                      Headsets
                    </Link>

                    <Link
                      href="/products?category=Keyboards"
                      onClick={() => {
                        setIsMenuOpen(false);
                        setIsCategoriesOpen(false);
                      }}
                      className="block text-sm text-gray-600 transition hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400"
                    >
                      Keyboards
                    </Link>

                    <Link
                      href="/products?category=Monitors"
                      onClick={() => {
                        setIsMenuOpen(false);
                        setIsCategoriesOpen(false);
                      }}
                      className="block text-sm text-gray-600 transition hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400"
                    >
                      Monitors
                    </Link>

                    <Link
                      href="/products?category=Mouse"
                      onClick={() => {
                        setIsMenuOpen(false);
                        setIsCategoriesOpen(false);
                      }}
                      className="block text-sm text-gray-600 transition hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400"
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
