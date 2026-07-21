import API_URL from "@/lib/api";
import { Order } from "@/types/order";

export async function getOrders(): Promise<Order[]>{
    const res = await fetch(`${API_URL}/orders`, {
        cache: "no-store",
    });

    if(!res.ok){
        throw new Error("Failed to fetch orders");
    }

    return res.json()
}