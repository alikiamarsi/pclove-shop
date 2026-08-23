"use client";

import { Product } from "@/types/product";
import { useAppDispatch } from "@/store/hooks";
import { addToCart } from "@/store/cartSlice";

type Props = {
    product: Product;
};


function AddToCartButton({product}: Props) {
    const dispatch = useAppDispatch()

    const isOutOfStock = product.stock <= 0;

    const handleAddToCart = () => {
      if(!isOutOfStock) {
        dispatch(addToCart(product))
      }
    }
  return (
    <button 
    type="button"
    disabled={isOutOfStock}
    onClick={handleAddToCart}
    className="w-full rounded-lg bg-blue-600 py-3 text-lg font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-gray-400"
    >
        {isOutOfStock ? "Out of Stock" : "Add to Cart"}
    </button>
  )
}

export default AddToCartButton