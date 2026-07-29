import API_URL from "@/lib/api";
import { Product } from "@/types/product";

type GetProductsParams = {
  page?: number;
  limit?: number;
  category?: string;
  brands?: string[];
  minPrice?: string;
  maxPrice?: string;
  rating?: string;
  stock?: string;
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

  const total = products.length

  const start = (page - 1) * limit;
  const end = start + limit;

  products = products.slice(start, end)

  return {
    data: products,
    total,
  }
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
  const {data: products} = await getProducts({
    limit: 1000
  });

  return [...new Set(products.map((product) => product.brand))].sort();
}

export async function getCategories() {
  const {data: products} = await getProducts({
    limit: 1000
  });

  return [
    ...new Set(products.map((product) => product.category))
  ].sort();
}