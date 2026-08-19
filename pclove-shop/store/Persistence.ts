import { CartState } from "./cartSlice";

const CART_STORATE_KEY = "pclove-cart";

export function loadCart(): CartState | undefined {
    try {
        const serializedCart = localStorage.getItem(CART_STORATE_KEY);

        if(!serializedCart) {
            return undefined;
        }

        return JSON.parse(serializedCart);
    } catch (error) {
        console.error("Failed to load cart:", error);
        return undefined;
    }
}

export function saveCart(cart: CartState) {
    try{
        const serializedCart = JSON.stringify(cart);

        localStorage.setItem(CART_STORATE_KEY, serializedCart);
    } catch(error) {
        console.error("Failed to save cart:", error);
    }
}