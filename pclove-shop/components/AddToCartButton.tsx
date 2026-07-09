"use client";

import { Product } from "@/types/product";
import { useAppDispatch } from "@/store/hooks";
import { addToCart } from "@/store/cartSlice";

type Props = {
    product: Product;
};


function AddToCardButton({product}: Props) {
    const dispatch = useAppDispatch()
  return (
    <button 
    onClick={() => dispatch(addToCart(product))}
    className="w-full rounded-lg bg-blue-600 py-2 text-white"
    >
        Add to Cart
    </button>
  )
}

export default AddToCardButton