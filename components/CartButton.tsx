"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { getCart } from "../lib/cart";

export default function CartButton() {
  const [count, setCount] = useState(0);

  function refresh() {
    const cart = getCart();
    const total = cart.reduce((sum, i) => sum + i.qty, 0);
    setCount(total);
  }

  useEffect(() => {
    refresh();

    // update when cart changes in same tab
    const onCartUpdated = () => refresh();
    window.addEventListener("cart-updated", onCartUpdated);

    // update when cart changes in other tabs
    const onStorage = () => refresh();
    window.addEventListener("storage", onStorage);

    return () => {
      window.removeEventListener("cart-updated", onCartUpdated);
      window.removeEventListener("storage", onStorage);
    };
  }, []);

  return (
    <Link
      href="/cart"
      className="relative inline-flex items-center rounded-full border border-white/30 px-5 py-2 text-white hover:bg-white/10 transition"
    >
      Cart
      <span className="ml-3 inline-flex min-w-[26px] justify-center rounded-full bg-white px-2 py-0.5 text-xs font-bold text-black">
        {count}
      </span>
    </Link>
  );
}
