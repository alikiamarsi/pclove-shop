import FilterSidebar from "@/components/filters/FilterSidebar";
import ProductList from "@/components/Product/ProductList";
import { getBrands, getCategories, getProducts } from "@/services/product.service";
import Link from "next/link";

type PageProps = {
  searchParams: Promise<{
    category?: string;
    search?: string;
    brand?: string | string[];
    minPrice?: string;
    maxPrice?: string;
    rating?: string;
    stock?: string
  }>;
};

async function Home({ searchParams }: PageProps) {
  const { 
    category, 
    search, 
    brand,
    minPrice,
    maxPrice,
    rating,
    stock
   } = await searchParams;

  const selectedBrands = Array.isArray(brand)
    ? brand
    : brand 
    ? [brand] 
    : [];

    const query = new URLSearchParams();

    if(category) query.set("category", category);
    if(rating) query.set("rating", rating);
    if(stock) query.set("stock", stock);
    if(minPrice) query.set("minPrice", minPrice);
    if(maxPrice) query.set("maxPrice", maxPrice);
    if(search) query.set("search", search);

    selectedBrands.forEach((brand) => {
      query.append("brand", brand)
    })


    const availableBrands = await getBrands()

    const availableCategories = await getCategories();

  let products = await getProducts({
    category, 
    brands: selectedBrands,
    minPrice,
    maxPrice,
    rating,
    stock
});

  if (search) {
    products = products.filter((product) =>
      product.title.toLowerCase().includes(search.toLowerCase())
    );
  }
  return (
    <main className="mx-auto max-w-screen-2xl px-6 py-10">
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
      <FilterSidebar 
        brands={availableBrands} 
        categories={availableCategories}
      />
      <div className="flex-1">
         <ProductList 
         key={query.toString()}
         initialProducts={products}
         query = {query.toString()}
         />
      </div>
     </div>
    </main>
  );
}

export default Home;
