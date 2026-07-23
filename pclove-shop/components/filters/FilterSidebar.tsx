import BrandFilter from "./BrandFilter"
import PriceFilter from "./PriceFilter"
import RatingFilter from "./RatingFilter"
import StockFilter from "./StockFilter"

type Props = {
    brands: string[];
}

async function FilterSidebar({brands}: Props) {
  return (
    <aside className="w-64 space-y-8 rounded-lg border bg-white p-5 shadow-sm">
        <h2 className="text-xl font-semibold">
            Filters
        </h2>

        <PriceFilter />
        <BrandFilter brands={brands}/>
        <RatingFilter />
        <StockFilter />
    </aside>
  )
}

export default FilterSidebar