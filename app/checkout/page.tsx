"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { getCart } from "../../lib/cart";
import { products } from "../../data/products";
import { formatBDT } from "../../lib/money";

const SHIPPING = 700;
const WHATSAPP_NUMBER = "8801312322447";

export default function CheckoutPage() {
  const [method, setMethod] = useState<"COD" | "BKASH" | "NAGAD">("COD");
  const [cart, setCart] = useState<{ id: string; qty: number }[]>([]);

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

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

  const paymentLabel =
    method === "COD" ? "Cash on Delivery" : method === "BKASH" ? "bKash" : "Nagad";

  function orderOnWhatsApp() {
    const lines = [
      "Hello BuraqGo 👋",
      "I want to place an order:",
      "",
      ...items.map((i) => `- ${i.name} × ${i.qty} = ${formatBDT(i.subtotal)}`),
      "",
      `Shipping: ${formatBDT(SHIPPING)}`,
      `Total: ${formatBDT(total)}`,
      `Payment: ${paymentLabel}`,
      "",
      `Name: ${name || "(not given)"}`,
      `Phone: ${phone || "(not given)"}`,
      `Address: ${address || "(not given)"}`,
    ];

    const text = encodeURIComponent(lines.join("\n"));
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${text}`, "_blank");
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

          <div className="rounded-3xl border p-6 space-y-4">
            <div className="grid gap-2">
              <label className="text-sm font-semibold">Full Name</label>
              <input
                className="rounded-2xl border px-4 py-3"
                placeholder="Your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className="grid gap-2">
              <label className="text-sm font-semibold">Phone</label>
              <input
                className="rounded-2xl border px-4 py-3"
                placeholder="01XXXXXXXXX"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>

            <div className="grid gap-2">
              <label className="text-sm font-semibold">Address</label>
              <textarea
                className="rounded-2xl border px-4 py-3"
                placeholder="Full delivery address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
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

            <button
              type="button"
              onClick={orderOnWhatsApp}
              className="w-full rounded-2xl bg-green-600 px-5 py-3 text-white hover:bg-green-500"
            >
              Order on WhatsApp
            </button>
          </div>
        </>
      )}
    </div>
  );
}
