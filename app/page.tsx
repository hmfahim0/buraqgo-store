import Link from "next/link";

export default function Home() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-10 space-y-14">
      {/* HEADER */}
      <header className="flex items-center justify-between">
        <div className="text-2xl font-black tracking-tight">
          BuraqGo<span className="text-zinc-500">.</span>
        </div>
        <nav className="flex gap-4 text-sm">
          <Link className="hover:underline" href="/shop">Shop</Link>
          <Link
            className="rounded-xl border px-3 py-1.5 hover:bg-zinc-50"
            href="/cart"
          >
            Cart
          </Link>
        </nav>
      </header>

      {/* HERO SECTION */}
      <section className="rounded-3xl border bg-gradient-to-b from-zinc-50 to-white p-8 md:p-12">
        <div className="grid gap-10 md:grid-cols-2 md:items-center">
          <div className="space-y-5">
            <h1 className="text-3xl md:text-5xl font-black tracking-tight">
              Premium Toy Cars for Kids & Collectors
            </h1>
            <p className="text-zinc-600 md:text-lg">
              Fast delivery across Bangladesh • Cash on Delivery • bKash & Nagad supported
            </p>

            <div className="flex gap-3">
              <Link
                href="/shop"
                className="rounded-2xl bg-zinc-900 px-6 py-3 text-white hover:bg-zinc-800"
              >
                Shop Now
              </Link>
              <Link
                href="/shop"
                className="rounded-2xl border px-6 py-3 hover:bg-zinc-50"
              >
                View Collection
              </Link>
            </div>
          </div>

          <div className="rounded-3xl border bg-white p-6 space-y-3">
            <div className="text-sm text-zinc-600">Why choose BuraqGo?</div>
            <ul className="space-y-2 text-sm">
              <li>✅ High-quality toy cars</li>
              <li>✅ Trusted delivery in Bangladesh</li>
              <li>✅ Cash on Delivery available</li>
              <li>✅ Secure bKash & Nagad payments</li>
            </ul>
          </div>
        </div>
      </section>

      {/* QUICK LINKS */}
      <section className="grid gap-4 md:grid-cols-3">
        <Link href="/shop" className="rounded-3xl border p-6 hover:bg-zinc-50">
          <div className="text-lg font-semibold">🛍️ Shop Products</div>
          <p className="text-sm text-zinc-600">Browse all toy cars</p>
        </Link>

        <Link href="/cart" className="rounded-3xl border p-6 hover:bg-zinc-50">
          <div className="text-lg font-semibold">🛒 View Cart</div>
          <p className="text-sm text-zinc-600">See selected items</p>
        </Link>

        <Link href="/checkout" className="rounded-3xl border p-6 hover:bg-zinc-50">
          <div className="text-lg font-semibold">✅ Checkout</div>
          <p className="text-sm text-zinc-600">Complete your order</p>
        </Link>
      </section>

      {/* FOOTER */}
      <footer className="text-center text-sm text-zinc-600">
        © {new Date().getFullYear()} BuraqGo Toys • Bangladesh
      </footer>
    </main>
  );
}
