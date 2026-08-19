"use client";

import { Provider } from "react-redux";
import { store } from "./index";
import { useEffect } from "react";
import { loadCart, saveCart } from "./Persistence";
import { setCart } from "./cartSlice";

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
  return <Provider store={store}>{children}</Provider>;
}