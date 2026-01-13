"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { getCart, clearCart } from "../../lib/cart";
import { products } from "../../data/products";
import { formatBDT } from "../../lib/money";

const SHIPPING = 700;

export default function CheckoutPage() {
  const [method, setMethod] = useState<"COD" | "BKASH" | "NAGAD">("COD");
  const [cart, setCart] = useState<{ id: string; qty: number }[]>([]);

  useEffect(() => setCart(getCart()), []);

  const items = useMemo(() => {
    return cart
      .map((c) => {
        const p = products.find((x) => x.id === c.id);
        if (!p) return null;
        return { name: p.name, qty: c.qty, subtotal: p.price * c.qty };
      })
      .filter(Boolean) as any[];
  }, [cart]);

  const subtotal = items.reduce((s, i) => s + i.subtotal, 0);
  const total = items.length ? subtotal + SHIPPING : 0;

  function placeOrder(e: React.FormEvent) {
    e.preventDefault();
    clearCart();
    window.location.href = "/success";
  }

  return (
    <div className="mx-auto max-w-xl space-y-6">
      <div className="flex items-end justify-between">
        <h1 className="text-3xl font-black">Checkout</h1>
        <Link href="/cart" className="text-sm text-zinc-600 hover:underline">
          Back to cart
        </Link>
      </div>

      {items.length === 0 ? (
        <div className="rounded-3xl border p-6">
          Your cart is empty.{" "}
          <Link className="underline" href="/shop">
            Shop now
          </Link>
          .
        </div>
      ) : (
        <>
          <div className="rounded-3xl border p-6 space-y-2 text-sm">
            <div className="font-semibold">Order summary</div>
            {items.map((i, idx) => (
              <div key={idx} className="flex justify-between text-zinc-600">
                <span>
                  {i.name} × {i.qty}
                </span>
                <span>{formatBDT(i.subtotal)}</span>
              </div>
            ))}
            <div className="flex justify-between text-zinc-600 pt-2 border-t">
              <span>Shipping</span>
              <span>{formatBDT(SHIPPING)}</span>
            </div>
            <div className="flex justify-between font-bold pt-2">
              <span>Total</span>
              <span>{formatBDT(total)}</span>
            </div>
          </div>

          <form onSubmit={placeOrder} className="rounded-3xl border p-6 space-y-4">
            <div className="grid gap-2">
              <label className="text-sm font-semibold">Full Name</label>
              <input className="rounded-2xl border px-4 py-3" required placeholder="Your name" />
            </div>

            <div className="grid gap-2">
              <label className="text-sm font-semibold">Phone</label>
              <input className="rounded-2xl border px-4 py-3" required placeholder="01XXXXXXXXX" />
            </div>

            <div className="grid gap-2">
              <label className="text-sm font-semibold">Address</label>
              <textarea className="rounded-2xl border px-4 py-3" required placeholder="Full delivery address" />
            </div>

            <div className="grid gap-2">
              <label className="text-sm font-semibold">Payment Method</label>
              <select
                className="rounded-2xl border px-4 py-3"
                value={method}
                onChange={(e) => setMethod(e.target.value as any)}
              >
                <option value="COD">Cash on Delivery</option>
                <option value="BKASH">bKash</option>
                <option value="NAGAD">Nagad</option>
              </select>
            </div>

            {(method === "BKASH" || method === "NAGAD") && (
              <div className="rounded-2xl border p-4 text-sm text-zinc-600 space-y-2">
                <div className="font-semibold text-zinc-900">Payment info</div>
                <div>
                  After placing the order, we’ll confirm by phone and share the payment number.
                </div>
                <input
                  className="mt-2 w-full rounded-2xl border px-4 py-3"
                  placeholder={`${method === "BKASH" ? "bKash" : "Nagad"} transaction ID (optional)`}
                />
              </div>
            )}

            <button className="w-full rounded-2xl bg-zinc-900 px-5 py-3 text-white hover:bg-zinc-800">
              Place Order
            </button>
          </form>
        </>
      )}
    </div>
  );
}
