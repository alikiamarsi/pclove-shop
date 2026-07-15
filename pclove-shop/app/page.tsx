import ProductCard from "@/components/ProductCard";
import { Product } from "@/types/product";

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
      <h1 className="mb-8 text-3xl font-bold">{search ? `Search:${search}`: category || "Products"}</h1>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {products.length === 0 ? (
          <p className="col-span-full text-center text-gray-500">
            No products found
          </p>
        ): (
          products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))
        )}
      </div>
    </main>
  );
}

export default Home;
