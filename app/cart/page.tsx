"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { products } from "../../data/products";
import { formatBDT } from "../../lib/money";
import { getCart, updateQty, clearCart } from "../../lib/cart";

const SHIPPING = 700;

export default function CartPage() {
  const [cart, setCartState] = useState<{ id: string; qty: number }[]>([]);

  useEffect(() => {
    setCartState(getCart());
  }, []);

  const items = useMemo(() => {
    return cart
      .map((c) => {
        const p = products.find((x) => x.id === c.id);
        if (!p) return null;
        return { ...p, qty: c.qty, subtotal: p.price * c.qty };
      })
      .filter(Boolean) as any[];
  }, [cart]);

  const subtotal = items.reduce((s, i) => s + i.subtotal, 0);
  const total = items.length ? subtotal + SHIPPING : 0;

  function setQty(id: string, qty: number) {
    updateQty(id, qty);
    setCartState(getCart());
  }

  function wipe() {
    clearCart();
    setCartState([]);
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-end justify-between">
        <h1 className="text-3xl font-black">
          Shopping Cart{" "}
          <span className="text-zinc-500">({items.length} items)</span>
        </h1>

        <Link href="/shop" className="text-sm text-zinc-600 hover:underline">
          Continue shopping
        </Link>
      </div>

      {/* Empty State */}
      {items.length === 0 ? (
        <div className="rounded-3xl border bg-white p-6">
          <div className="rounded-3xl bg-zinc-50 p-10 flex items-center justify-center">
            <div className="text-center space-y-4">
              <div className="mx-auto relative h-40 w-56">
                <Image
                  src="/cart/empty.png"
                  alt="Empty cart"
                  fill
                  className="object-contain"
                />
              </div>

              <div className="text-lg font-semibold text-zinc-900">
                Your cart is empty
              </div>
              <div className="text-sm text-zinc-600">
                Add some toy cars from the shop to place an order.
              </div>

              <Link
                href="/shop"
                className="inline-block rounded-2xl bg-zinc-900 px-6 py-3 text-white hover:bg-zinc-800"
              >
                Go to Shop
              </Link>
            </div>
          </div>
        </div>
      ) : (
        <>
          {/* Items */}
          <div className="rounded-3xl border p-4 space-y-3">
            {items.map((i) => (
              <div
                key={i.id}
                className="flex items-center justify-between gap-4 border-b py-3 last:border-b-0"
              >
                <div className="min-w-0">
                  <div className="font-semibold truncate">{i.name}</div>
                  <div className="text-sm text-zinc-600">
                    {formatBDT(i.price)}
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    className="h-9 w-9 rounded-xl border hover:bg-zinc-50"
                    onClick={() => setQty(i.id, Math.max(0, i.qty - 1))}
                  >
                    −
                  </button>
                  <div className="w-10 text-center font-semibold">{i.qty}</div>
                  <button
                    className="h-9 w-9 rounded-xl border hover:bg-zinc-50"
                    onClick={() => setQty(i.id, i.qty + 1)}
                  >
                    +
                  </button>
                </div>

                <div className="font-bold">{formatBDT(i.subtotal)}</div>
              </div>
            ))}
          </div>

          {/* Summary */}
          <div className="rounded-3xl border p-6 space-y-3">
            <div className="flex items-center justify-between text-sm text-zinc-600">
              <span>Subtotal</span>
              <span>{formatBDT(subtotal)}</span>
            </div>
            <div className="flex items-center justify-between text-sm text-zinc-600">
              <span>Shipping</span>
              <span>{formatBDT(SHIPPING)}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-zinc-600">Total</span>
              <span className="text-xl font-black">{formatBDT(total)}</span>
            </div>

            <Link
              href="/checkout"
              className="block text-center rounded-2xl bg-zinc-900 px-5 py-3 text-white hover:bg-zinc-800"
            >
              Checkout
            </Link>

            <button
              onClick={wipe}
              className="w-full rounded-2xl border px-5 py-3 hover:bg-zinc-50"
            >
              Clear cart
            </button>
          </div>
        </>
      )}
    </div>
  );
}
