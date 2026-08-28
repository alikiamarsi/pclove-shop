"use client";

import { useState } from "react";
import { SlidersHorizontal, X } from "lucide-react";

import BrandFilter from "./BrandFilter";
import CategoryFilter from "./CategoryFilter";
import PriceFilter from "./PriceFilter";
import RatingFilter from "./RatingFilter";
import StockFilter from "./StockFilter";

type Props = {
  brands: string[];
  categories: string[];
};

function MobileFilters({ brands, categories }: Props) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="lg:hidden">
      {/* Open Button */}
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="flex items-center gap-2 rounded-lg border bg-white px-4 py-2.5 text-sm font-semibold shadow-sm transition hover:bg-gray-50"
      >
        <SlidersHorizontal className="h-4 w-4" />
        Filters
      </button>

      {isOpen && (
        <>
          {/* Backdrop */}
          <button
            type="button"
            aria-label="Close filters"
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 z-40 bg-black/50"
          />

          {/* Bottom Sheet */}
          <aside className="fixed inset-x-0 bottom-0 z-50 flex max-h-[85vh] flex-col rounded-t-3xl bg-white shadow-2xl">
            {/* Drag Handle */}
            <div className="flex justify-center pt-3">
              <div className="h-1.5 w-12 rounded-full bg-gray-300" />
            </div>

            {/* Header */}
            <div className="flex items-center justify-between px-5 py-4">
              <h2 className="text-xl font-bold text-gray-900">
                Filters
              </h2>

              <button
                type="button"
                onClick={() => setIsOpen(false)}
                aria-label="Close filters"
                className="rounded-full p-2 transition hover:bg-gray-100"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Filters */}
            <div className="flex-1 overflow-y-auto px-5 pb-5">
              <div className="space-y-6">
                <PriceFilter />

                <CategoryFilter categories={categories} />

                <BrandFilter brands={brands} />

                <RatingFilter />

                <StockFilter />
              </div>
            </div>

            {/* Footer */}
            <div className="border-t bg-white p-5">
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="w-full rounded-xl bg-blue-600 py-3.5 font-semibold text-white transition hover:bg-blue-700"
              >
                Show Products
              </button>
            </div>
          </aside>
        </>
      )}
    </div>
  );
}

export default MobileFilters;