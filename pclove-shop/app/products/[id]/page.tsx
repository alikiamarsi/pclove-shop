import { Product } from "@/types/product"
import Image from "next/image"

interface PageProps {
    params: Promise<{
        id: string
    }>
}

async function getProducts(id: string): Promise<Product>{
    const res = await fetch(`http://localhost:5000/products/${id}` ,{
        cache: "no-store",
    });
    
    if(!res.ok) {
        throw new Error("Failed to fetch product");
    }
    return res.json();
}

async function ProductDetails({params}: PageProps) {
    const {id} = await params;
    const product = await getProducts(id);
  return (
    <main className="mx-auto max-w-7xl px-6 py-10">
      <div className="grid gap-10 lg:grid-cols-2">
        {/* Image */}
        <div className="rounded-xl border bg-white p-8 shadow-sm">
          <div className="relative `h-112.5` w-full">
            <Image
              src={product.image}
              alt={product.title}
              fill
              className="object-contain"
            />
          </div>
        </div>

        {/* Product Info */}
        <div className="space-y-5">
          <div>
            <p className="text-sm text-gray-500">{product.brand}</p>

            <h1 className="mt-2 text-4xl font-bold">
              {product.title}
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <span className="rounded bg-yellow-100 px-3 py-1 text-sm font-medium text-yellow-700">
              ⭐ {product.rating}
            </span>

            <span className="rounded bg-gray-100 px-3 py-1 text-sm">
              {product.category}
            </span>
          </div>

          <p className="text-4xl font-bold text-blue-600">
            ${product.price}
          </p>

          <p className="text-green-600 font-medium">
            In Stock: {product.stock}
          </p>

          <button className="w-full rounded-lg bg-blue-600 py-3 text-lg font-semibold text-white transition hover:bg-blue-700">
            Add to Cart
          </button>

          <div className="border-t pt-6">
            <h2 className="mb-2 text-xl font-semibold">
              Description
            </h2>

            <p className="leading-7 text-gray-600">
              {product.description}
            </p>
          </div>
        </div>
      </div>
    </main>
  )
}

export default ProductDetails