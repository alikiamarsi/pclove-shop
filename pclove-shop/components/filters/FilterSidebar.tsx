import BrandFilter from "./BrandFilter"
import CategoryFilter from "./CategoryFilter"
import PriceFilter from "./PriceFilter"
import RatingFilter from "./RatingFilter"
import StockFilter from "./StockFilter"

type Props = {
    brands: string[];
    categories: string[]
}

function FilterSidebar({brands, categories}: Props) {
  return (
    <aside className="w-64 space-y-8 rounded-lg border bg-white p-5 shadow-sm">
        <h2 className="text-xl font-semibold">
            Filters
        </h2>

        <PriceFilter />
        <CategoryFilter categories={categories} />
        <BrandFilter brands={brands}/>
        <RatingFilter />
        <StockFilter />
    </aside>
  )
}

export default FilterSidebar