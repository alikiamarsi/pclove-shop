import API_URL from "@/lib/api";
import { Product } from "@/types/product";

export async function getProducts(
  category?: string,
  brands: string[] = [],
  minPrice?: string,
  maxPrice?: string,
  rating?: string,
  stock?: string
): Promise<Product[]> {
  const url = category
    ? `${API_URL}/products?category=${encodeURIComponent(category)}`
    : `${API_URL}/products`;

  const res = await fetch(url, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch products");
  }

  let products: Product[] = await res.json();

  if(brands.length > 0) {
    products = products.filter((product) =>
    brands.includes(product.brand))
  }

  if(minPrice) {
    products = products.filter(
      (product) => product.price >= Number(minPrice)
    )
  }

  if(maxPrice) {
    products = products.filter(
      (products) => products.price <= Number(maxPrice)
    )
  }

  if(rating) {
    products = products.filter(
      product => product.rating >= Number(rating)
    )
  }

  if(stock === "true") {
    products = products.filter(
      (product) => product.stock > 0
    )
  }

  return products
}

export async function getproduct(
    id: string,
): Promise<Product> {
    const res = await fetch(`${API_URL}/products/${id}`, {
        cache: "no-store",
    });

    if(!res.ok) {
        throw new Error("Failed to fetch product");
    }

    return res.json()
}

export async function getBrands() {
  const products = await getProducts();

  return [...new Set(products.map((product) => product.brand))].sort();
}