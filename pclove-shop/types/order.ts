import { CartItem } from "./cart";


export interface Order {
    id: number;
    items: CartItem[];
    total: number;
    status: "wating" | "preparing" | "onTheWay" | "delivered";
    createAt: string
}