"use client";

import { Product } from "@/types/product";
import { useState } from "react";
import ProductGrid from "./ProductGrid";

type Props = {
  initialProducts: Product[];
  query: string;
  total:number;
};

function ProductList({ initialProducts, query, total }: Props) {
  const [products, setProducts] = useState(initialProducts);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [loadError, setLoadError] = useState("");

  const [mobileColumns, setMobileColumns] = useState<1 | 2>(1);

  const [desktopColumns, setDesktopColumns] = useState<2 | 3 | 4>(4);

  const [hasMore, setHasMore] = useState(
    initialProducts.length < total
  );

  async function loadMore() {
    if(loading) return;

    setLoading(true);
    setLoadError("");
    
    const nextPage = page + 1;
    const queryString = query ? `&${query}` : "";

    try {
      const res = await fetch(
        `/api/products?page=${nextPage}&limit=12${queryString}`
      );

      if(!res.ok) {
        throw new Error("Failed to load more products");
      }
      const result = await res.json();
      const newProducts = result.data;

      setProducts((prev) => [...prev, ...newProducts]);
      setHasMore(nextPage * 12 < result.total);
      setPage(nextPage);

    } catch (error) {
      console.error("Failed to load more products:", error);
      setLoadError(
        "Unable to load more products. Please try again.",
      );
    } finally {
      setLoading(false);
    }  
  }
  if (products.length === 0) {
    return (
      <div className="rounded-xl border border-dashed p-10 text-center">
        <h2 className="text-xl font-semibold">
          No Products found
        </h2>

        <p className="mt-2 text-gray-500">
          Try changing or clearing your filters.
        </p>
      </div>
    )
  }
  return (
    <>
      <div className="mb-6 flex items-center justify-end">
  {/* Mobile columns */}
  <div className="flex items-center gap-2 sm:hidden">
    <span className="text-sm text-gray-500">View:</span>

    <button
      type="button"
      onClick={() => setMobileColumns(1)}
      className={`rounded-md border px-3 py-2 text-sm font-medium transition ${
        mobileColumns === 1
          ? "border-blue-600 bg-blue-600 text-white"
          : "border-gray-300 bg-white text-gray-700 hover:bg-gray-50"
      }`}
    >
      1
    </button>

    <button
      type="button"
      onClick={() => setMobileColumns(2)}
      className={`rounded-md border px-3 py-2 text-sm font-medium transition ${
        mobileColumns === 2
          ? "border-blue-600 bg-blue-600 text-white"
          : "border-gray-300 bg-white text-gray-700 hover:bg-gray-50"
      }`}
    >
      2
    </button>
  </div>

  {/* Desktop columns */}
  <div className="hidden items-center gap-2 sm:flex">
    <span className="text-sm text-gray-500">View:</span>

    {[2, 3, 4].map((column) => (
      <button
        key={column}
        type="button"
        onClick={() =>
          setDesktopColumns(column as 2 | 3 | 4)
        }
        className={`rounded-md border px-3 py-2 text-sm font-medium transition ${
          desktopColumns === column
            ? "border-blue-600 bg-blue-600 text-white"
            : "border-gray-300 bg-white text-gray-700 hover:bg-gray-50"
        }`}
      >
        {column}
      </button>
    ))}
  </div>
</div>

      <ProductGrid 
        products={products}
        mobileColumns={mobileColumns}
        desktopColumns={desktopColumns}
        />

      {loadError && (
        <div
          role="alert"
          className="mt-8 flex flex-wrap items-center gap-4 rounded-lg border border-red-200 bg-red-50 p-4 text-red-700"
        >
          <p>{loadError}</p>

          <button
            type="button"
            onClick={loadMore}
            disabled={loading}
            className="rounded-md border border-red-300 px-4 py-2 font-semibold transition hover:bg-red-100 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Try again
          </button>
        </div>
      )}

      {hasMore && !loadError && (
        <button
        onClick={loadMore}
        disabled={loading}
        className="mt-8 rounded-lg bg-blue-600 px-6 py-2 text-white"
      >
        {loading ? "Loading..." : "Load More"}
      </button>
    )}
    </>
  );
}

export default ProductList;