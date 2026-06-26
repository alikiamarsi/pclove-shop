import ProductCard from "@/components/ProductCard";
import { Product } from "@/types/product";

async function getProducts(): Promise<Product[]> {
  const res = await fetch("http://localhost:5000/products", {
    cache: "no-store",
  })
  if(!res.ok) {
    throw new Error("Failed to fetch products");
  }
  return res.json();
}

 async function Home() {
  const products = await getProducts();
  return (
    <main>
      <h1>Product</h1>
      <div>
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </main>
  )
}

export default Home