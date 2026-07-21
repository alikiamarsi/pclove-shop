import API_URL from "@/lib/api";
import { Product } from "@/types/product";

export async function getProducts(
  category?: string,
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

  return res.json();
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