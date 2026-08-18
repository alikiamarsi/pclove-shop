import API_URL from "@/lib/api";
import { Product } from "@/types/product";
import { cache } from "react";

type GetProductsParams = {
  page?: number;
  limit?: number;
  category?: string;
  brands?: string[];
  minPrice?: string;
  maxPrice?: string;
  rating?: string;
  stock?: string;
  sort?: string;
  search?: string;
};

export async function getProducts({
  page = 1,
  limit = 12,
  category,
  brands = [],
  minPrice,
  maxPrice,
  rating,
  stock,
  sort,
  search,
}
: GetProductsParams = {}): Promise<{data: Product[]; total: number}> {
  const url = new URL(`${API_URL}/products`);

  const res = await fetch(url.toString(), {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch products");
  }

 const result = await res.json();

  let products: Product[] = result.data ?? result;

  if(category) {
  products = products.filter(
    (product) => product.category === category
  );
}

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

  if(search) {
    products = products.filter((product) => 
    product.title.toLocaleLowerCase().includes(search.toLowerCase())
    );
  }

  if(sort === "price-asc") {
    products.sort((a, b) => a.price - b.price);
  }

  if(sort === "price-desc") {
    products.sort((a, b) => b.price - a.price);
  }

  if(sort === "rating-desc") {
    products.sort((a, b) => b.rating - a.rating)
  }

  const total = products.length

  const start = (page - 1) * limit;
  const end = start + limit;

  products = products.slice(start, end)

  return {
    data: products,
    total,
  }
}

const fetchAllProducts = cache(async (): Promise<Product[]> => {
  const res = await fetch(`${API_URL}/products`, {
    cache: "no-store",
  });

  if(!res.ok) {
    throw new Error("Failed to fetch products");
  }

  const result = await res.json();

  return result.data ?? result
})

export const getproduct = cache(async (
    id: string,
): Promise<Product> => {
    const res = await fetch(`${API_URL}/products/${id}`, {
        cache: "no-store",
    });

    if(!res.ok) {
        throw new Error("Failed to fetch product");
    }

    return res.json()
})

export async function getBrands() {
  const products = await fetchAllProducts();

  return [...new Set(
    products.map((product) => product.brand))
  ].sort();
}

export async function getCategories() {
  const products = await fetchAllProducts();

  return [
    ...new Set(
      products.map((product) => product.category))
  ].sort();
}