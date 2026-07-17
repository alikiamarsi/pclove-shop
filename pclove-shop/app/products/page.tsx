import ProductCard from "@/components/ProductCard";
import ProductGrid from "@/components/ProductGrid";
import { Product } from "@/types/product";
import Link from "next/link";

type PageProps = {
  searchParams: Promise<{
    category?: string;
    search?: string
  }>;
};

async function getProducts(category?: string): Promise<Product[]> {

  const url = category
    ? `http://localhost:5000/products?category=${encodeURIComponent(category)}`
    : "http://localhost:5000/products";

  const res = await fetch(url, {
    cache: "no-store",
  });
  if (!res.ok) {
    throw new Error("Failed to fetch products");
  }
  return res.json();
}

async function Home({ searchParams }: PageProps) {
  const { category, search } = await searchParams;

  let products = await getProducts(category);

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
      <ProductGrid products={products} />
    </main>
  );
}

export default Home;
