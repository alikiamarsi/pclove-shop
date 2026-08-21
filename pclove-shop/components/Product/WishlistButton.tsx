"use client";

import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { toggleWishlist } from "@/store/wishlistSlice";
import { Product } from "@/types/product";
import { Heart } from "lucide-react";
import { useSyncExternalStore } from "react";

type Props = {
    product: Product
};

const subscribe = () => () => {};
function useHasHydrated() {
    return useSyncExternalStore(
        subscribe,
        () => true,
        () => false,
    );
}

function WishlistButton({product}: Props) {
    const dispatch = useAppDispatch();

    const wishlistItems = useAppSelector(
        (state) => state.wishlist.items
    );

    const hasHydrated = useHasHydrated();

    const isInWishlist =
    hasHydrated &&
    wishlistItems.some((item) => item.id === product.id)

  return (
    <button
        onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            dispatch(toggleWishlist(product))
        }}
          className="
            group/wishlist
            absolute right-3 top-3 z-10
            flex h-10 w-10 items-center justify-center
            rounded-full
            bg-white/90
            shadow-md
            backdrop-blur-sm
            transition-all duration-200
          hover:bg-red-50
            hover:shadow-lg
            "
    >
        <Heart
            size={22}
            className={
                isInWishlist
                ? "fill-red-500 text-red-500"
                : "text-gray-500 transition-colors group-hover/wishlist:text-red-500"
            }
        />

    </button>
  )
}

export default WishlistButton