"use client"

import { useRouter, useSearchParams } from "next/navigation"

function ProductSort() {
    const router = useRouter();
    const searchParams = useSearchParams();

    const currentSort = searchParams.get("sort") || "";

    function handleSortChange(value: string) {
        const params = new URLSearchParams(
            searchParams.toString()
        );

        if(value) {
            params.set("sort", value);
        } else {
            params.delete("sort");
        }

        router.push(
            `/products?${params.toString()}`,
            {
                scroll: false,
            }
        );
    }
  return (
    <div className="flex items-center gap-3">
        <label className="text-sm font-medium text-gray-700">
            sort by:
        </label>

        <select
            value={currentSort}
            onChange={(e) => handleSortChange(e.target.value)}
            className="rounded-lg border px-3 py-2 text-sm outline-none"
        >
            <option value="">
                Featured
            </option>

            <option value="price-asc">
                Price: Low to High
            </option>

            <option value="price-desc">
                Price: High to Low
            </option>

            <option value="rating-desc">
                Rating: High to Low
            </option>
        </select>
    </div>
  )
}

export default ProductSort