import { CartState } from "./cartSlice";
import { WishlistState } from "./wishlistSlice";

const CART_STORATE_KEY = "pclove-cart";
const WISHLIST_STORAGE_KEY = "pclove-wishlist";

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

export function loadWishlist(): WishlistState | undefined {
    try {
        const serializedWishlist = localStorage.getItem(WISHLIST_STORAGE_KEY);

        if (!serializedWishlist) {
            return undefined;
        }

        return JSON.parse(serializedWishlist);
    } catch(error) {
        console.error("Failed to load wishlist:", error);
        return undefined
    }
}

export function saveWishlist(wishlist: WishlistState) {
    try {
        const serializedWishlist = JSON.stringify(wishlist);

        localStorage.setItem(WISHLIST_STORAGE_KEY, serializedWishlist);
    } catch(error) {
        console.error("Failed to save wishlist:", error)
    }
}