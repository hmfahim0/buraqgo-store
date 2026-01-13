import Link from "next/link";

export default function Home() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-10 space-y-12">
      <header className="flex items-center justify-between">
        <div className="text-2xl font-black tracking-tight">
          BuraqGo<span className="text-zinc-500">.</span>
        </div>
        <nav className="flex gap-4 text-sm">
          <Link className="hover:underline" href="/shop">Shop</Link>
          <Link className="rounded-xl border px-3 py-1.5 hover:bg-zinc-50" href="/cart">
            Cart
          </Link>
        </nav>
      </header>

      <section className="rounded-3xl border bg-gradient-to-b from-zinc-50 to-white p-8 md:p-12">
        <div className="grid gap-8 md:grid-cols-2 md:items-center">
          <div className="space-y-4">
            <h1 className="text-3xl md:text-5xl font-black tracking-tight">
              Premium toy cars for kids & collectors.
            </h1>
            <p className="text-zinc-600 md:text-lg">
              Fast delivery in Bangladesh • Cash on Delivery • bKash/Nagad supported
            </p>
            <div className="flex gap-3">
              <Link
                href="/shop"
                className="rounded-2xl bg-zinc-900 px-5 py-3 text-white hover:bg-zinc-800"
              >
                Shop Now
              </Link>
              <Link
                href="/shop"
                className="rounded-2xl border px-5 py-3 hover:bg-zinc-50"
              >
                View Collection
              </Link>
            </div>
          </div>

          <div className="rounded-3xl border bg-white p-6">
            <div className="text-sm text-zinc-600">Quick links</div>
            <div className="mt-3 grid gap-3">
              <Link className="rounded-2xl border p-4 hover:bg-zinc-50" href="/shop">
                🛍️ Shop products
              </Link>
              <Link className="rounded-2xl border p-4 hover:bg-zinc-50" href="/cart">
                🛒 View cart
              </Link>
              <Link className="rounded-2xl border p-4 hover:bg-zinc-50" href="/checkout">
                ✅ Checkout
              </Link>
            </div>
          </div>
        </div>
      </section>

      <footer className="text-sm text-zinc-600">
        © {new Date().getFullYear()} BuraqGo Toys • Bangladesh
      </footer>
    </main>
  );
}
