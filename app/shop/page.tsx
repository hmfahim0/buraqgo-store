"use client";

import Link from "next/link";
import { products } from "../../data/products";
import { formatBDT } from "../../lib/money";
import { addToCart } from "../../lib/cart";

const WHATSAPP_NUMBER = "8801312322447";

export default function ShopPage() {
  function orderProductOnWhatsApp(name: string, price: number) {
    const text = encodeURIComponent(
      `Hello BuraqGo 👋\nI want to order:\n- ${name}\nPrice: ৳${price}\nPayment: Cash on Delivery`
    );
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${text}`, "_blank");
  }

  return (
    <div className="space-y-6">
      <div className="flex items-end justify-between">
        <h1 className="text-3xl font-black">Shop</h1>
        <Link
          href="/cart"
          className="rounded-xl border px-3 py-1.5 hover:bg-zinc-50"
        >
          Cart
        </Link>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
        {products.map((p) => (
          <div key={p.id} className="rounded-3xl border p-4">
            <div className="text-xs text-zinc-500">{p.category}</div>
            <div className="mt-1 font-semibold">{p.name}</div>
            <div className="text-sm text-zinc-600">{formatBDT(p.price)}</div>

            <div className="mt-4 flex gap-2">
              <button
                onClick={() => addToCart(p.id, 1)}
                className="flex-1 rounded-2xl bg-zinc-900 px-4 py-2 text-white hover:bg-zinc-800"
              >
                Add to Cart
              </button>

              <button
                onClick={() => orderProductOnWhatsApp(p.name, p.price)}
                className="flex-1 rounded-2xl bg-green-600 px-4 py-2 text-white hover:bg-green-500"
              >
                WhatsApp
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
