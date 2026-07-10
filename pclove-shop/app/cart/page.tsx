"use client"

import { useAppSelector } from "@/store/hooks"

function CartPage() {
    const cartItems = useAppSelector(
        (state) => state.cart.items
    );

  return (
    <main className="mx-auto max-w-7xl p-6">
        <h1 className="mb-6 text-3xl font-bold">
            Shopping Cart
        </h1>

        {cartItems.length === 0 ? (
            <p className="text-gray-500">
                Your cart is empty
            </p>
        ) : (
            <div className="space-y-4">
                {cartItems.map((item) => (
                    <div
                        key={item.id}
                        className="flex items-center justify-between rounded-xl border bg-white p-4 shadow-sm"
                    >
                        <div>
                            <h2 className="text-lg font-semibold">
                                {item.title}
                            </h2>

                            <p className="text-gray-500">
                                Quantity: {item.quantity}
                            </p>
                        </div>
                        <p className="text-xl font-bold text-blue-600">
                            ${item.price}
                        </p>
                    </div>
                ))}
            </div>
        )}
    </main>
  )
}

export default CartPage