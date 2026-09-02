import Link from "next/link"
import { ChevronDown } from "lucide-react"
import { getCategories } from "@/services/product.service"

async function CategoriesDropdown() {
    const categories = await getCategories();
  return (
    <div className="group relative">
        <button className="flex items-center gap-1 font-medium text-gray-900 transition hover:text-blue-600 dark:text-gray-100 dark:hover:text-blue-400">
            Categories
            <ChevronDown
            size={18}
            className="transition-transform duration-300 ease-in-out group-hover:rotate-180"
            />
        </button>

        <div className="
          invisible absolute left-0 top-full z-50 mt-2 w-56
          translate-y-2 scale-95
          rounded-xl border border-gray-200 bg-white py-2
          opacity-0 shadow-lg
          transition-all duration-300 ease-in-out
          group-hover:visible
          group-hover:translate-y-0
          group-hover:scale-100
          group-hover:opacity-100
          dark:border-gray-800 dark:bg-gray-900
            "
        >
            <Link
                href="/products"
                className="block px-4 py-2 font-medium text-gray-900 transition-colors duration-200 hover:bg-blue-50 hover:text-blue-600 dark:text-gray-100 dark:hover:bg-gray-800 dark:hover:text-blue-400"
            >
                All Products
            </Link>
            {categories.map((category) => (
                <Link
                    key={category}
                    href={`/products?category=${encodeURIComponent(category)}`}
                    className="block px-4 py-2 text-gray-700 transition-colors duration-200 hover:bg-blue-50 hover:text-blue-600 dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-blue-400"
                >
                    {category}
                </Link>
            ))}
        </div>
    </div>
  )
}

export default CategoriesDropdown