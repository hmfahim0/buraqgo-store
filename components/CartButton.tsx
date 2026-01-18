"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { getCart } from "../lib/cart";

export default function CartButton() {
  const [count, setCount] = useState(0);

  function refreshCount() {
    const cart = getCart();
    const totalQty = cart.reduce((sum, item) => sum + (item.qty || 0), 0);
    setCount(totalQty);
  }

  useEffect(() => {
    refreshCount();

    // update when other tabs/pages change localStorage
    const onStorage = () => refreshCount();
    window.addEventListener("storage", onStorage);

    return () => window.removeEventListener("storage", onStorage);
  }, []);

  return (
    <Link
      href="/cart"
      className="relative rounded-full border border-white/20 px-6 py-2 text-sm hover:bg-white/10"
    >
      Cart
      <span className="ml-3 inline-flex min-w-[26px] justify-center rounded-full bg-white px-2 py-0.5 text-xs font-bold text-black">
        {count}
      </span>
    </Link>
  );
}
