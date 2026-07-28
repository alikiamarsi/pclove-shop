"use client"
import { Product } from "@/types/product"
import ProductCard from "./ProductCard";

type Props = {
    products: Product[];
};

function FeaturedProducts({products}: Props) {
  return (
    <section className="mx-auto max-w-7xl px-6 py-20">
        <div className="mb-10">
            <h2 className="text-3xl font-bold">
                Featured Products
            </h2>

            <p className="mt-3 text-gray-500">
                Discover our top gaming hardware
            </p>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {products.map((product) => (
                <ProductCard 
                    key={product.id}
                    product={product}
                />
            ))}
        </div>
    </section>
  )
}

export default FeaturedProducts