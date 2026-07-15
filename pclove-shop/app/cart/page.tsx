"use client"

import Image from "next/image";
import { Trash2 } from "lucide-react";
import { useAppSelector, useAppDispatch } from "@/store/hooks"
import { decreaseQuantity, increaseQuantity, removeFromCart } from "@/store/cartSlice";

function CartPage() {
    const dispatch = useAppDispatch();

    const cartItems = useAppSelector((state) => state.cart.items);

    const subtotal = cartItems.reduce(
        (total, item) => total + item.price * item.quantity,
        0
    );

    const totalItems = cartItems.reduce(
        (total, item) => total + item.quantity,
        0
    )

    const shipping = subtotal === 0
        ? 0
        : subtotal >= 200
            ? 0
            : 10;

    const total = subtotal + shipping; 

  return (
    <main className="mx-auto max-w-7xl px-6 py-10">
        <h1 className="mb-6 text-3xl font-bold">
            Shopping Cart
        </h1>

        {cartItems.length === 0 ? (
            <p className="text-gray-500">
                Your cart is empty
            </p>
        ) : (
            <>
            <div className="space-y-5">
                {cartItems.map((item) => (
                    <div
                        key={item.id}
                        className="flex items-center gap-6 rounded-xl border bg-white p-4 shadow-sm"
                    >
                        <div className="relative h-28 w-28 shrink-0">
                            <Image 
                                src={item.image}
                                alt={item.title}
                                fill
                                className="object-contain"
                            />
                        </div>
                        <div className="flex flex-1 flex-col">
                            <h2 className="text-lg font-semibold">
                                {item.title}
                            </h2>
                            <p className="mt-2 text-lg font-bold text-blue-600">
                            ${item.price.toFixed(2)}
                        </p>
                        </div>

                        <div className="flex items-center gap-3">
                            <button 
                                onClick={() => dispatch(decreaseQuantity(item.id))}
                                className="flex h-9 w-9 items-center justify-center rounded-lg border hover:bg-gray-100"
                            >
                                -
                            </button>

                            <span className="w-8 text-center font-semibold">
                                {item.quantity}
                            </span>

                            <button 
                                onClick={() => dispatch(increaseQuantity(item.id))}
                                className="flex h-9 w-9 items-center justify-center rounded-lg border hover:bg-gray-100"
                            >
                                +
                            </button>
                        </div>

                        <div className="w-28 text-right">
                            <p className="font-bold">
                                ${(item.price * item.quantity).toFixed(2)}
                            </p>
                        </div>
                        <button
                            onClick={() => dispatch(removeFromCart(item.id))}
                            className="rounded-lg p-2 text-red-600 transition hover:bg-red-50"
                        >
                            <Trash2 size={20} />
                        </button>
                    </div>
                ))}
            </div>
            <div className="mt-10 flex justify-end">
                <div className="w-full max-w-md rounded-xl border bg-white p-6 shadow-sm">
                    <h2 className="mb-6 text-xl font-bold">
                        Order Summary
                    </h2>

                    <div className="space-y-3">
                        <div className="flex justify-between text-gray-600">
                            <span>Items</span>
                            <span>{totalItems}</span>
                        </div>

                        <div className="flex justify-between text-gray-600">
                            <span>Subtotal</span>
                            <span>${subtotal.toFixed(2)}</span>
                        </div>

                        <div className="flex justify-between text-gray-600">
                            <span>Shipping</span>
                            <span className="text-green-600">
                                {shipping === 0 ? (
                                    <span className="text-green-600">Free</span>
                                ) : (
                                    `$${shipping.toFixed(2)}`
                                )}
                            </span>
                        </div>

                        <hr />

                        <div className="flex justify-between text-xl font-bold">
                            <span>total</span>
                            <span>${total.toFixed(2)}</span>
                        </div>
                    </div>
                    {subtotal > 0 && subtotal < 200 && (
                        <p className="mt-4 rounded-lg bg-orange-50 p-3 text-sm text-orange-700">
                            Add <span className="font-semibold">${(200 - subtotal).toFixed(2)}</span> more
                            to get <span className="font-semibold">FREE Shipping!</span>
                        </p>
                    )}
                    <button className="mt-6 w-full rounded-lg bg-blue-600 py-3 font-semibold text-white transition hover:bg-blue-700">
                        Proceed to Chekout
                    </button>
                </div>
            </div>
            </>
        )}
    </main>
  )
}

export default CartPage