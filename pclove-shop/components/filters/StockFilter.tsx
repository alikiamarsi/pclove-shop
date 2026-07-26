"use client"

import { useRouter, useSearchParams } from "next/navigation"

function StockFilter() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const inStock = searchParams.get("stock");

  return (
    <div>
      <input 
        type="checkbox" 
        id="stock"
        checked={inStock === "true"}
        onChange={() => {
          const params = new URLSearchParams(
            searchParams.toString()
          );

          if(inStock === "true"){
            params.delete("stock");
          } else {
            params.set("stock", "true");
          }

          router.push(
            `/products?${params.toString()}`
          );

          router.refresh();
        }}
        />

        <label 
          htmlFor="stock"
          className="cursor-pointer text-sm"
        >
          In Stock Only
        </label>
    </div>
  )
}

export default StockFilter