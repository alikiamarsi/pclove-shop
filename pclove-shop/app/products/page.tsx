import FilterSidebar from "@/components/filters/FilterSidebar";
import ProductGrid from "@/components/ProductGrid";
import { getBrands, getProducts } from "@/services/product.service";
import Link from "next/link";

type PageProps = {
  searchParams: Promise<{
    category?: string;
    search?: string;
    brand?: string | string[];
    minPrice?: string;
    maxPrice?: string;
    rating?: string
  }>;
};

async function Home({ searchParams }: PageProps) {
  const { 
    category, 
    search, 
    brand,
    minPrice,
    maxPrice,
   } = await searchParams;

  const selectedBrands = Array.isArray(brand)
    ? brand
    : brand 
    ? [brand] 
    : [];

    const availableBrands = await getBrands()

    const { rating } = await searchParams

  let products = await getProducts(
    category, 
    selectedBrands,
    minPrice,
    maxPrice,
    rating
  );

  if (search) {
    products = products.filter((product) =>
      product.title.toLowerCase().includes(search.toLowerCase())
    );
  }
  return (
    <main className="mx-auto max-w-7xl px-6 py-10">
      {category && (
        <div className="mb-6 flex items-center gap-2 text-sm text-gray-500">
          <Link
            href="/"
            className="transition hover: text-blue-600"
          >
            Home
          </Link>
          <span className="text-gray-300">/</span>

          <span className="text-gray-700">
            {category}
          </span>
        </div>
      )}
      <h1 className="mb-8 text-3xl font-bold">{search ? `Search:${search}` : category || "Products"}</h1>
     <div className="flex gap-8">
      <FilterSidebar brands={availableBrands} />
      <div className="flex-1">
         <ProductGrid products={products} />
      </div>
     </div>
    </main>
  );
}

export default Home;
