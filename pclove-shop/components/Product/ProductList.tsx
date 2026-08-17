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

    try {
      const res = await fetch(
        `/api/products?page=${nextPage}&limit=12&${query}`
      );

      if(!res.ok) {
        throw new Error("Failed to load more products");
      }
      const result = await res.json();

      const newProducts = result.data;


      setProducts((prev) => {
        const updatedProducts = [...prev, ...newProducts];

        setHasMore(updatedProducts.length < result.total);

      return updatedProducts;
    });
      setPage(nextPage);
    } catch (error) {
      console.error("Failed to load more products:", error);
    } finally {
      setLoading(false);
    }  
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