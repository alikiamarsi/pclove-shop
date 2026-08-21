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
  const [hasMore, setHasMore] = useState(
    initialProducts.length < total
  );

  async function loadMore() {
    if(loading) return;

    setLoading(true);
    
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
      <ProductGrid products={products} />

      {hasMore && (
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