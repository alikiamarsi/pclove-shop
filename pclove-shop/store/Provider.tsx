"use client";

import { Provider } from "react-redux";
import { store } from "./index";
import { useEffect } from "react";
import { loadCart, loadWishlist, saveCart, saveWishlist } from "./Persistence";
import { setCart } from "./cartSlice";
import { setWishlist } from "./wishlistSlice";

export default function Providers({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    const savedCart = loadCart();

    if(savedCart) {
      store.dispatch(setCart(savedCart));
    }

    const savedWishlist = loadWishlist();

    if(savedWishlist) {
      store.dispatch(setWishlist(savedWishlist));
    }
  }, []);

  useEffect(() => {
    let previousCart = store.getState().cart;

    const unsubscribe = store.subscribe(() => {
      const currentCart = store.getState().cart;

      if(currentCart !== previousCart) {
        saveCart(currentCart);
        previousCart = currentCart;
      }
    });

    return unsubscribe;
  }, [])

  useEffect(() => {
    let previousWishlist = store.getState().wishlist;

    const unsubscribe = store.subscribe(() => {
      const currentWishlist = store.getState().wishlist;

      if(currentWishlist !== previousWishlist) {
        saveWishlist(currentWishlist);
        previousWishlist = currentWishlist;
      }
    });
    return unsubscribe;
  }, []);
  return <Provider store={store}>{children}</Provider>;
}