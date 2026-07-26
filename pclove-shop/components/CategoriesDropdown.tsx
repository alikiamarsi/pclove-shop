import Link from "next/link"
import { ChevronDown } from "lucide-react"
import { getCategories } from "@/services/product.service"

async function CategoriesDropdown() {
    const categories = await getCategories();
  return (
    <div className="group relative">
        <button className="flex items-center gap-1 font-medium transition hover:text-blue-600">
            Categories
            <ChevronDown
            size={18}
            className="transition group-hover:rotate-180"
            />
        </button>

        <div className="invisible absolute left-0 top-full z-50 mt-2 w-56 rounded-xl border bg-white py-2 opacity-0 shadow-lg transition-all duration-200 group-hover:visible group-hover:opacity-100">
            <Link
                href="/"
                className="block px-4 py-2 font-medium hover:bg-blue-50 hover:text-blue-600"
            >
                All Products
            </Link>
            {categories.map((category) => (
                <Link
                    key={category}
                    href={`/products?category=${encodeURIComponent(category)}`}
                    className="block px-4 py-2 transition hover:bg-blue-50 hover:text-blue-600"
                >
                    {category}
                </Link>
            ))}
        </div>
    </div>
  )
}

export default CategoriesDropdown