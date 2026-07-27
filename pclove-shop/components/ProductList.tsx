"use client";

import { Product } from "@/types/product";
import { useState } from "react";
import ProductGrid from "./ProductGrid";

type Props = {
  initialProducts: Product[];
  query: string
};

function ProductList({ initialProducts, query }: Props) {
  const [products, setProducts] = useState(initialProducts);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  async function loadMore() {
    setLoading(true);

    const nextPage = page + 1;

    const res = await fetch(
      `/api/products?page=${nextPage}&limit=12&${query}`
    );

    const data = await res.json();

    setProducts((prev) => [
      ...prev,
      ...data,
    ]);

    setPage(nextPage);
    setLoading(false);
  }

  return (
    <>
      <ProductGrid products={products} />

      <button
        onClick={loadMore}
        disabled={loading}
        className="mt-8 rounded-lg bg-blue-600 px-6 py-2 text-white"
      >
        {loading ? "Loading..." : "Load More"}
      </button>
    </>
  );
}

export default ProductList;