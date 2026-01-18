"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getCart, addToCart, type CartItem } from "../../lib/cart";

export default function CartPage() {
  const [cart, setCart] = useState<CartItem[]>([]);

  function refreshCart() {
    setCart(getCart());
  }

  useEffect(() => {
    refreshCart();
  }, []);

  // total items count
  const totalItems = cart.reduce((sum, i) => sum + i.qty, 0);

  // total price
  const totalPrice = cart.reduce((sum, i) => sum + i.price * i.qty, 0);

  // decrease qty
  function decreaseQty(id: string) {
    const updated = cart
      .map((item) => (item.id === id ? { ...item, qty: item.qty - 1 } : item))
      .filter((item) => item.qty > 0);

    localStorage.setItem("cart", JSON.stringify(updated));
    refreshCart();
  }

  // increase qty (reuse addToCart)
  function increaseQty(item: CartItem) {
    addToCart({ ...item, qty: 1 });
    refreshCart();
  }

  // remove item
  function removeItem(id: string) {
    const updated = cart.filter((item) => item.id !== id);
    localStorage.setItem("cart", JSON.stringify(updated));
    refreshCart();
  }

  // clear cart
  function clearCart() {
    localStorage.removeItem("cart");
    refreshCart();
  }

  return (
    <main className="min-h-screen bg-black text-white p-8">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold">Cart ({totalItems} items)</h1>
          <Link href="/shop" className="text-yellow-400 hover:underline">
            ← Continue Shopping
          </Link>
        </div>

        {cart.length === 0 ? (
          <div className="bg-white/5 rounded-xl p-10 text-center">
            <p className="text-lg mb-4">Your cart is empty 🛒</p>
            <Link
              href="/shop"
              className="inline-block bg-yellow-400 text-black px-6 py-3 rounded-lg font-semibold hover:bg-yellow-300"
            >
              Go to Shop
            </Link>
          </div>
        ) : (
          <>
            <div className="space-y-4">
              {cart.map((item) => (
                <div
                  key={item.id}
                  className="bg-white/5 rounded-xl p-5 flex items-center justify-between"
                >
                  <div>
                    <h2 className="text-lg font-semibold">{item.name}</h2>
                    <p className="text-sm text-gray-400">৳{item.price}</p>
                  </div>

                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => decreaseQty(item.id)}
                      className="px-3 py-1 rounded bg-gray-700 hover:bg-gray-600"
                    >
                      -
                    </button>

                    <span className="text-lg">{item.qty}</span>

                    <button
                      onClick={() => increaseQty(item)}
                      className="px-3 py-1 rounded bg-gray-700 hover:bg-gray-600"
                    >
                      +
                    </button>
                  </div>

                  <div className="text-right">
                    <p className="font-bold">
                      ৳{item.price * item.qty}
                    </p>
                    <button
                      onClick={() => removeItem(item.id)}
                      className="text-red-400 text-sm hover:underline"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Summary */}
            <div className="mt-8 bg-white/5 rounded-xl p-6 flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Total Price</p>
                <p className="text-2xl font-bold">৳{totalPrice}</p>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={clearCart}
                  className="border border-white/20 px-5 py-2 rounded-lg hover:bg-white/10"
                >
                  Clear Cart
                </button>

                <Link
                  href="/checkout"
                  className="bg-yellow-400 text-black px-6 py-2 rounded-lg font-semibold hover:bg-yellow-300"
                >
                  Checkout →
                </Link>
              </div>
            </div>
          </>
        )}
      </div>
    </main>
  );
}
