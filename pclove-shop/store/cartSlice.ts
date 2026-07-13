import { CartItem } from "@/types/cart";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Product } from "@/types/product";

interface CartState {
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
            const existingItem = state.items.find(
                (item) => item.id === product.id
            );

            if(existingItem) {
                existingItem.quantity += 1;
            } else {
                state.items.push({
                    id: product.id,
                    title: product.title,
                    price: product.price,
                    image: product.image,
                    quantity: 1,
                })
            }
        },

        increaseQuantity: (
            state,
            action: PayloadAction<number>
        ) => {
            const item = state.items.find(
                (item) => item.id === action.payload
            );
            if(item){
                item.quantity += 1;
            }
        },

        decreaseQuantity: (
            state,
            action: PayloadAction<number>
        ) => {
            const item = state.items.find(
                (item) => item.id === action.payload
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
        }
    },

})

export const {
    addToCart,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
} = cartSlice.actions
export default cartSlice.reducer;