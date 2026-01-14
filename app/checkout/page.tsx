"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { getCart, clearCart } from "../../lib/cart";
import { products } from "../../data/products";
import { formatBDT } from "../../lib/money";

const SHIPPING = 700;

// ✅ Your WhatsApp number (no +)
const WHATSAPP_NUMBER = "8801312322447";

// ✅ Your Google Apps Script Web App URL (ends with /exec)
const SHEET_WEBHOOK_URL =
  "https://script.google.com/macros/s/AKfycb1gyowjTJj5GTQUrVcf14CKE7DHB0g7h7tS3-9nZVRBnYusdHX3F08txqdYsQyILJm/exec";

export default function CheckoutPage() {
  const [method, setMethod] = useState<"COD" | "BKASH" | "NAGAD">("COD");
  const [cart, setCart] = useState<{ id: string; qty: number }[]>([]);

  // Customer info
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  // UI state
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => setCart(getCart()), []);

  const items = useMemo(() => {
    return cart
      .map((c) => {
        const p = products.find((x) => x.id === c.id);
        if (!p) return null;
        return {
          id: c.id,
          name: p.name,
          qty: c.qty,
          price: p.price,
          subtotal: p.price * c.qty,
        };
      })
      .filter(Boolean) as Array<{
      id: string;
      name: string;
      qty: number;
      price: number;
      subtotal: number;
    }>;
  }, [cart]);

  const subtotal = items.reduce((s, i) => s + i.subtotal, 0);
  const total = items.length ? subtotal + SHIPPING : 0;

  function paymentLabel() {
    return method === "COD"
      ? "Cash on Delivery"
      : method === "BKASH"
      ? "bKash"
      : "Nagad";
  }

  function buildWhatsAppMessage() {
    const lines = [
      "Hello BuraqGo 👋",
      "I want to place an order:",
      "",
      ...items.map((i) => `- ${i.name} × ${i.qty} = ${formatBDT(i.subtotal)}`),
      "",
      `Shipping: ${formatBDT(SHIPPING)}`,
      `Total: ${formatBDT(total)}`,
      `Payment: ${paymentLabel()}`,
      "",
      `Name: ${name || "(not given)"}`,
      `Phone: ${phone || "(not given)"}`,
      `Address: ${address || "(not given)"}`,
    ];
    return lines.join("\n");
  }

  function orderOnWhatsApp() {
    const text = encodeURIComponent(buildWhatsAppMessage());
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${text}`, "_blank");
  }

  async function sendOrderToGoogleSheet(order: any) {
    const form = new URLSearchParams();
    form.set("payload", JSON.stringify(order));
  
    await fetch(SHEET_WEBHOOK_URL, {
      method: "POST",
      mode: "no-cors",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: form.toString(),
    });
  }
  

  async function placeOrder(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (items.length === 0) {
      setError("Your cart is empty.");
      return;
    }

    if (!name.trim() || !phone.trim() || !address.trim()) {
      setError("Please fill Name, Phone, and Address.");
      return;
    }

    setSaving(true);

    const itemsText = items
      .map((i) => `${i.name} x ${i.qty} = ${formatBDT(i.subtotal)}`)
      .join(" | ");

    const orderPayload = {
      name,
      phone,
      address,
      payment: paymentLabel(),
      itemsText,
      subtotal,
      shipping: SHIPPING,
      total,
      source: "website",
      timestamp: new Date().toISOString(),
    };

    try {
      await sendOrderToGoogleSheet(orderPayload);

      clearCart();
      window.location.href = "/success";
    } catch (err: any) {
      setError(err?.message || "Failed to save order to sheet.");
    } finally {
      setSaving(false);
    }
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

            {items.map((i) => (
              <div key={i.id} className="flex justify-between text-zinc-600">
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
              <input
                className="rounded-2xl border px-4 py-3"
                required
                placeholder="Your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className="grid gap-2">
              <label className="text-sm font-semibold">Phone</label>
              <input
                className="rounded-2xl border px-4 py-3"
                required
                placeholder="01XXXXXXXXX"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>

            <div className="grid gap-2">
              <label className="text-sm font-semibold">Address</label>
              <textarea
                className="rounded-2xl border px-4 py-3"
                required
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

            {(method === "BKASH" || method === "NAGAD") && (
              <div className="rounded-2xl border p-4 text-sm text-zinc-600 space-y-2">
                <div className="font-semibold text-zinc-900">Payment info</div>
                <div>
                  After placing the order, we’ll confirm by phone and share the payment number.
                </div>
              </div>
            )}

            {error && (
              <div className="rounded-2xl border p-3 text-sm text-red-600">{error}</div>
            )}

            <button
              type="button"
              onClick={orderOnWhatsApp}
              className="w-full rounded-2xl bg-green-600 px-5 py-3 text-white hover:bg-green-500"
            >
              Order on WhatsApp
            </button>

            <button
              disabled={saving}
              className="w-full rounded-2xl bg-zinc-900 px-5 py-3 text-white hover:bg-zinc-800 disabled:opacity-60"
            >
              {saving ? "Saving..." : "Place Order (Save to Sheet)"}
            </button>
          </form>
        </>
      )}
    </div>
  );
}
