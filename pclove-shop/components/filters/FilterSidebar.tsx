import BrandFilter from "./BrandFilter";
import CategoryFilter from "./CategoryFilter";
import PriceFilter from "./PriceFilter";
import RatingFilter from "./RatingFilter";
import StockFilter from "./StockFilter";

type Props = {
  brands: string[];
  categories: string[];
};

function FilterSidebar({ brands, categories }: Props) {
  return (
    <aside className="sticky top-20 h-[calc(100vh-6rem)] w-64 overflow-y-auto rounded-lg border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-800 dark:bg-gray-900">
      <div className="h-full overflow-y-auto scrollbar-hide p-1">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
          Filters
        </h2>

        <div className="space-y-8">
          <PriceFilter />
          <CategoryFilter categories={categories} />
          <BrandFilter brands={brands} />
          <RatingFilter />
          <StockFilter />
        </div>
      </div>
    </aside>
  );
}

export default FilterSidebar;
