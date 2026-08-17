import AddToCartButton from "@/components/Product/AddToCartButton"
import WishlistButton from "@/components/Product/WishlistButton"
import { getproduct} from "@/services/product.service"
import { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"


interface PageProps {
    params: Promise<{
        id: string
    }>
}

export async function generateMetadata({
  params,
}: PageProps) : Promise<Metadata> {
  const {id} = await params;

  const product = await getproduct(id);

  return {
    title: product.title,
    description: product.description
  }
}

async function ProductDetails({params}: PageProps) {
    const {id} = await params;

    let product;

    try {
      product = await getproduct(id);
    } catch {
      notFound();
    }
    
  return (
    <main className="mx-auto max-w-7xl px-6 py-10">
      <div className="mb-8 flex items-center gap-2 text-sm text-gray-500">
        <Link
          href="/"
          className="transition hover:text-blue-600"
        >
          Home
        </Link>
        <span className="text-gray-300">/</span>

        <Link
          href={`/?category=${encodeURIComponent(product.category)}`}
          className="transition hover:text-blue-600"
        >
          {product.category}
        </Link>

        <span className="text-gray-300">/</span>

        <span className="max-w-xs truncate text-gray-700">
          {product.title}
        </span>
      </div>
      <div className="grid gap-10 lg:grid-cols-2">
        {/* Image */}
        <div className="rounded-xl border bg-white p-8 shadow-sm">
          <div className="relative h-112.5 w-full">

            <WishlistButton product={product} />

            <Image
              src={product.image}
              alt={product.title}
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
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
            ${product.price.toFixed(2)}
          </p>

          <p className="text-green-600 font-medium">
            In Stock: {product.stock}
          </p>

          <AddToCartButton product={product} />
          

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