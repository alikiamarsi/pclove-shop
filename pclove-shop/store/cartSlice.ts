import { CartItem } from "@/types/cart";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Product } from "@/types/product";

export interface CartState {
    items: CartItem[];
}

const initialState: CartState = {
    items: [],
};

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addToCart: (
            state,
            action: PayloadAction<Product>
        ) => {
            const product = action.payload;

            if(product.stock <= 0) {
                return;
            }

            const existingItem = state.items.find(
                (item) => item.id === product.id
            );

            if(existingItem) {
                existingItem.stock = product.stock;
                existingItem.quantity = Math.min(
                existingItem.quantity + 1,
                product.stock,
                );
                return;
            }
                state.items.push({
                    id: product.id,
                    title: product.title,
                    price: product.price,
                    image: product.image,
                    stock: product.stock,
                    quantity: 1,
                })
            
        },

        increaseQuantity: (
            state,
            action: PayloadAction<number>
        ) => {
            const item = state.items.find(
                (cartItem) => cartItem.id === action.payload
            );
            if(item && item.quantity < item.stock){
                item.quantity += 1;
            }
        },

        decreaseQuantity: (
            state,
            action: PayloadAction<number>
        ) => {
            const item = state.items.find(
                (cartItem) => cartItem.id === action.payload
            );

            if(item && item.quantity > 1) {
                item.quantity -= 1;
            }
        },

        removeFromCart: (
            state,
            action: PayloadAction<number>
        ) => {
            state.items = state.items.filter(
                (item) => item.id !== action.payload
            )
        },

        setCart: (
            _state,
            action: PayloadAction<CartState>,
        ) => action.payload
    },
});

export const {
    addToCart,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
    setCart,
} = cartSlice.actions
export default cartSlice.reducer;