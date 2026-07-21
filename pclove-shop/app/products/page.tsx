import ProductGrid from "@/components/ProductGrid";
import { getProducts } from "@/services/product.service";
import Link from "next/link";

type PageProps = {
  searchParams: Promise<{
    category?: string;
    search?: string
  }>;
};

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
