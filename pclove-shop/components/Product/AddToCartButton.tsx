"use client";

import { Product } from "@/types/product";
import { useAppDispatch } from "@/store/hooks";
import { addToCart } from "@/store/cartSlice";

type Props = {
    product: Product;
};


function AddToCartButton({product}: Props) {
    const dispatch = useAppDispatch()

    const handleAddToCart = () => {
      dispatch(addToCart(product))
    }
  return (
    <button 
    onClick={handleAddToCart}
    className="w-full cursor-pointer rounded-lg bg-blue-600 py-3 text-lg font-semibold text-white transition hover:bg-blue-700"
    >
        Add to Cart
    </button>
  )
}

export default AddToCartButton