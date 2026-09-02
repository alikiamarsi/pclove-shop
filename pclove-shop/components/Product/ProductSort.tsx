"use client"

import { ChevronDown } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation"
import { useEffect, useRef, useState } from "react";

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
    const dropdownRef = useRef<HTMLDivElement>(null);

    const currentSort = searchParams.get("sort") || "";

    const currentLabel = 
      sortOptions.find((option) => option.value === currentSort)?.label || "Featured";

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

    useEffect(() => {
      function handleClickOutside(event: MouseEvent) {
        if(
          dropdownRef.current &&
          !dropdownRef.current.contains(event.target as Node)
        ) {
          setIsOpen(false);
        }
      }

      function handleScroll(){
        setIsOpen(false);
      }

      document.addEventListener("mousedown", handleClickOutside);
      window.addEventListener("scroll", handleScroll, true);

      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
        window.removeEventListener("scroll", handleScroll, true);
      };
    }, []);

    return (
    <div className="relative flex items-center gap-3">
      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
        Sort by:
      </span>

      <div ref={dropdownRef} className="relative">
        <button
          type="button"
          onClick={() => setIsOpen((previous) => !previous)}
          className="flex min-w-48 items-center justify-between gap-3
            rounded-lg border border-gray-300
            bg-white px-3 py-2
            text-sm text-gray-900
            transition
            hover:border-blue-400
            dark:border-gray-700
            dark:bg-[#182233]
            dark:text-gray-100"
        >
          {currentLabel}

          <ChevronDown
            className={`transition-transform duration-200 ${
              isOpen ? "rotate-180" : ""
            }`}
          />
        </button>

        <div
          className={`absolute right-0 top-full z-50 mt-2 w-full
            overflow-hidden rounded-lg
            border border-gray-200
            bg-white shadow-lg
            transition-all duration-200 ease-out
            dark:border-gray-700
            dark:bg-[#182233] 
            ${
            isOpen
              ? "visible translate-y-0 opacity-100"
              : "invisible -translate-y-2 opacity-0"
          }`}
        >
          {sortOptions.map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() => handleSortChange(option.value)}
              className={
                `w-full px-4 py-2.5
                text-left text-sm
                transition-colors 
                ${
                currentSort === option.value
                  ? "bg-blue-50 font-medium text-blue-600 dark:bg-blue-500/10 dark:text-blue-400"
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