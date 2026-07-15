"use client";

import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { toggleWishlist } from "@/store/wishlistSlice";
import { Product } from "@/types/product";
import { Heart } from "lucide-react";

type Props = {
    product: Product
};

function WishlistButton({product}: Props) {
    const dispatch = useAppDispatch();

    const wishlistItems = useAppSelector(
        (state) => state.wishlist.items
    );

    const isInWishlist = wishlistItems.some(
        (item) => item.id === product.id
    );

  return (
    <button
        onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            dispatch(toggleWishlist(product))
        }}
        className="absolute right-3 top-3 z-10 rounded-full border bg-white p-2 transition hover:bg-red-50"
    >
        <Heart 
            size={22}
            className={
                isInWishlist
                ? "fill-red-500 text-red-500"
                : "text-gray-500"
            }
        />

    </button>
  )
}

export default WishlistButton