"use client"
import { useRouter, useSearchParams } from "next/navigation"
import { useState } from "react";
import FilterAccordion from "./FilterAccordion";


function PriceFilter() {
    const router = useRouter();
    const searchParams = useSearchParams();

    const [minPrice, SetMinPrice] = useState(
        searchParams.get("minPrice") || ""
    );

    const [maxPrice, setMaxPrice] = useState(
        searchParams.get("maxPrice") || ""
    );

    const [error, setError] = useState("");

    function handleApply() {
        const minimumPrice = minPrice ? Number(minPrice) : undefined;
        const maximumPrice = maxPrice ? Number(maxPrice) : undefined;

        if(
            (minimumPrice !== undefined &&
                (!Number.isFinite(minimumPrice) || minimumPrice < 0)) ||
            (maximumPrice !== undefined &&
                (!Number.isFinite(maximumPrice) || maximumPrice < 0))
            ) {
                setError("Price must be valid positive number.");
                return;
            }

            if(
                minimumPrice !== undefined &&
                maximumPrice !== undefined &&
                minimumPrice > maximumPrice
            ) {
                setError("Minimum price cannot be greater than maximum price.");
                return;
            }
            
            setError("");

            const params = new URLSearchParams(
                searchParams.toString(),
            );

            if(minimumPrice !== undefined) {
                params.set("minPrice", String(minimumPrice));
            } else {
                params.delete("minPrice");
            }

            if(maximumPrice !== undefined) {
                params.set("maxPrice", String(maximumPrice));
            } else {
                params.delete("maxPrice");
            }

            router.push(`/products?${params.toString()}`, {
                scroll: false,
            });
    }
  return (
        <FilterAccordion title="Price Filter">
            <div className="space-y-3">
            <input 
                type="number"
                min="0"
                step="0.01"
                placeholder="Min price"
                value={minPrice}
                onChange={(event) => {
                    SetMinPrice(event.target.value);
                    setError("");
                }}
                className="w-full rounded border px-3 py-2 text-sm" 
                />

                <input 
                    type="number"
                    min="0"
                    step="0.01"
                    placeholder="Max Price"
                    value={maxPrice}
                    onChange={(event) => {
                        setMaxPrice(event.target.value);
                        setError("");
                    }}
                    className="w-full rounded border px-3 py-2 text-sm"
                />

                {error && (
                    <p className="text-sm text-red-600">
                        {error}
                    </p>
                )}

                <button
                    type="button"
                    onClick={handleApply}
                    className="w-full rounded bg-blue-600 py-2 text-white"
                >
                    Apply
                </button>
        </div>
        </FilterAccordion>
  );
}

export default PriceFilter