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

function parseNonNegativeNumber(
  value: string | undefined,
): number | undefined {
  if(!value?.trim()) {
    return undefined
  }

  const parsedValue = Number(value);

  return Number.isFinite(parsedValue) && parsedValue >= 0
    ? parsedValue
    : undefined;
}

function parseRating(
  value: string | undefined,
): number | undefined {
  const parsedValue = parseNonNegativeNumber(value);

  return parsedValue !== undefined && parsedValue <= 5
    ? parsedValue
    : undefined;
}

export class ProductNotFoundError extends Error {
  constructor(id: string) {
    super(`Product with id "${id}" was not found`);
    this.name = "ProductNotFoundError"
  }
}

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
}: GetProductsParams = {}): Promise<{
  data: Product[];
  total: number;
}> {
  const url = new URL(`${API_URL}/products`);

  url.searchParams.set("_page", String(page));
  url.searchParams.set("_per_page", String(limit));

  if(category) {
    url.searchParams.set("category", category);
  }

  brands.forEach((brand) => {
    url.searchParams.append("brand", brand);
  });

  const minimumPrice = parseNonNegativeNumber(minPrice);
  const maximumPrice = parseNonNegativeNumber(maxPrice);
  const minimumRating = parseRating(rating);

    if(minimumPrice !== undefined) {
    url.searchParams.set("price:gte", String(minimumPrice));
  }

  if(maximumPrice !== undefined) {
    url.searchParams.set("price:lte", String(maximumPrice));
  }

  if(minimumRating !== undefined) {
    url.searchParams.set("rating:gte", String(minimumRating));
  }

  if(stock === "true") {
    url.searchParams.set("stock:gt", "0");
  }

  if(search) {
    url.searchParams.set("title_like", search);
  }

  if (sort === "price-asc") {
  url.searchParams.set("_sort", "price");
} else if (sort === "price-desc") {
  url.searchParams.set("_sort", "-price");
} else if (sort === "rating-desc") {
  url.searchParams.set("_sort", "-rating");
}

  const res = await fetch(url.toString(), {
    cache: "no-store",
  });

  if(!res.ok) {
    throw new Error("Failed to fetch products");
  }

  const result = await res.json();

  return {
    data: result.data as Product[],
    total: result.items,
  };

}

const fetchAllProducts = cache(async (): Promise<Product[]> => {
  const res = await fetch(`${API_URL}/products`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch products");
  }

  const result = await res.json();

  return result.data ?? result;
});

export const getproduct = cache(async (
  id: string,
): Promise<Product> => {
  const res = await fetch(`${API_URL}/products/${id}`, {
    cache: "no-store",
  });

  if (res.status === 404) {
    throw new ProductNotFoundError(id);
  }

  if (!res.ok) {
    throw new Error("Failed to fetch product");
  }

  return res.json();
});

export async function getBrands() {
  const products = await fetchAllProducts();

  return [
    ...new Set(
      products.map((product) => product.brand),
    ),
  ].sort();
}

export async function getCategories() {
  const products = await fetchAllProducts();

  return [
    ...new Set(
      products.map((product) => product.category),
    ),
  ].sort();
}