import { getProducts } from "@/services/product.service";
import { NextResponse } from "next/server";


export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);

    const requestedPage = Number(searchParams.get("page") || "1");
    const requestedLimit = Number(searchParams.get("limit") || "12");

    const page =
        Number.isInteger(requestedPage) && requestedPage > 0
        ? requestedPage
        : 1;
    const limit =
        Number.isInteger(requestedLimit) && requestedLimit > 0
        ? Math.min(requestedLimit, 50)
        : 12;

    const category = searchParams.get("category") || undefined;
    const rating = searchParams.get("rating") || undefined;
    const stock = searchParams.get("stock") || undefined;
    const minPrice = searchParams.get("minPrice") || undefined;
    const maxPrice = searchParams.get("maxPrice") || undefined;
    const sort = searchParams.get("sort") || undefined;
    const search = searchParams.get("search") || undefined;
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
        search,
        sort,
    });

    return NextResponse.json(products)
}