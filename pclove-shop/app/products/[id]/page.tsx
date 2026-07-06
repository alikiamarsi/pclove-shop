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
    <main className="mx-auto max-w-7xl p-6">
        <h1 className="mb-4 text-3xl font-bold">{product.title}</h1>
        <p>{product.brand}</p>
        <p>{product.category}</p>
        <p>{product.description}</p>
        <p>${product.price}</p>
        <p>⭐{product.rating}</p>
        <p>Stock: {product.stock}</p>
        <Image 
            src={product.image}
            alt={product.title}
            width={500}
            height={500}
            className="rounded-lg object-contain"
        />
    </main>
  )
}

export default ProductDetails