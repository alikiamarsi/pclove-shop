"use client"

import { ChevronDown } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation"
import { useState } from "react";

const sortOptions = [
    {
        value: "",
        label: "Featured",
    },
    {
        value: "price-asc",
        label: "Price: Low to High",
    },
    {
        value: "price-desc",
        label: "Price: High to Low",
    },
    {
        value: "rating-desc",
        label: "Rating: High to Low",
    },
];

function ProductSort() {
    const router = useRouter();
    const searchParams = useSearchParams();

    const [isOpen, setIsOpen] = useState(false);

    const currentSort = searchParams.get("sort") || "";

    const selectedOption =
        sortOptions.find((option) => option.value === currentSort) ??
        sortOptions[0];

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
            });

            setIsOpen(false);
    }
    return (
    <div className="relative flex items-center gap-3">
      <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
        Sort by:
      </label>

      <div className="relative">
        <button
          type="button"
          onClick={() => setIsOpen((previous) => !previous)}
          className="flex min-w-36 items-center justify-between gap-4 rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 transition hover:border-gray-400 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-100 dark:hover:border-gray-500"
        >
          <span>{selectedOption.label}</span>

          <ChevronDown
            className={`h-4 w-4 transition-transform duration-300 ${
              isOpen ? "rotate-180" : ""
            }`}
          />
        </button>

        <div
          className={`absolute right-0 top-full z-50 mt-2 w-full origin-top overflow-hidden rounded-lg border border-gray-200 bg-white shadow-lg transition-all duration-300 ease-out dark:border-gray-700 dark:bg-gray-900 ${
            isOpen
              ? "pointer-events-auto translate-y-0 opacity-100"
              : "pointer-events-none -translate-y-2 opacity-0"
          }`}
        >
          {sortOptions.map((option) => (
            <button
              key={option.value || "featured"}
              type="button"
              onClick={() => handleSortChange(option.value)}
              className={`block w-full px-3 py-2 text-left text-sm transition ${
                currentSort === option.value
                  ? "bg-blue-600 text-white"
                  : "text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ProductSort