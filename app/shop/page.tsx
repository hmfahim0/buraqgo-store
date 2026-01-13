"use client";

import Link from "next/link";
import { products } from "../../data/products";
import { formatBDT } from "../../lib/money";
import { addToCart } from "../../lib/cart";

export default function ShopPage() {
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
            <div className="text-sm text-zinc-600">
              {formatBDT(p.price)}
            </div>

            <button
              onClick={() => addToCart(p.id, 1)}
              className="mt-4 w-full rounded-2xl bg-zinc-900 px-4 py-2 text-white hover:bg-zinc-800"
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
