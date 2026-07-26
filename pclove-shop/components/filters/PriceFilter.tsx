"use client"
import { useRouter, useSearchParams } from "next/navigation"
import { useState } from "react";
import FilterAccordion from "./FilterAccordion";


function PriceFilter() {
    const router = useRouter();
    const searchParams = useSearchParams();

    const [minPrice, SetMinPrice] = useState(
        searchParams.get("minPrice") || ""
    )

    const [maxPrice, setMaxPrice] = useState(
        searchParams.get("maxPrice") || ""
    )
  return (
        <FilterAccordion title="Price Filter">
            <div className="space-y-3">
            <input 
                type="number"
                placeholder="Min price"
                value={minPrice}
                onChange={(e) => SetMinPrice(e.target.value)}
                className="w-full rounded border px-3 py-2 text-sm" 
                />

                <input 
                    type="number" 
                    placeholder="Max Price"
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(e.target.value)}
                    className="w-full rounded border px-3 py-2 text-sm"
                />

                <button
                    onClick={() => {
                        const params = new URLSearchParams(
                            searchParams.toString()
                        );

                        if(minPrice) {
                            params.set("minPrice", minPrice);
                        } else {
                            params.delete("minPrice");
                        }
                        
                        if(maxPrice) {
                            params.set("maxPrice", maxPrice);
                        } else {
                            params.delete("maxPrice");
                        }

                        router.push(`products?${params.toString()}`,
                    {
                                scroll: false,
                            });
                    }}
                    className="w-full rounded bg-blue-600 py-2 text-white"
                >
                    Apply
                </button>
        </div>
        </FilterAccordion>
  )
}

export default PriceFilter