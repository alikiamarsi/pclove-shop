import { getProducts } from "@/services/product.service";
import { NextResponse } from "next/server";


export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);

    const page = Number(searchParams.get("page") || "1");
    const limit = Number(searchParams.get("limit") || "12");

    const category = searchParams.get("category") || undefined;
    const rating = searchParams.get("rating") || undefined;
    const stock = searchParams.get("stock") || undefined;
    const minPrice = searchParams.get("minPrice") || undefined;
    const maxPrice = searchParams.get("maxPrice") || undefined;
    const sort = searchParams.get("sort") || undefined;
    const brands = searchParams.getAll("brand");

    const products = await getProducts({
        page,
        limit,
        category,
        rating,
        stock,
        minPrice,
        maxPrice,
        brands,
        sort,
    });

    return NextResponse.json(products)
}