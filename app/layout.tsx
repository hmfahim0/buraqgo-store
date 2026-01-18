import "./globals.css";
import Link from "next/link";

export const metadata = {
  title: "BuraqGo Toys",
  description: "Premium toy cars for kids & collectors.",
};

function Badge({ value }: { value: number }) {
  if (!value) return null;
  return (
    <span className="absolute -top-2 -right-2 rounded-full bg-red-500 px-2 py-0.5 text-[11px] font-bold text-white">
      {value}
    </span>
  );
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Demo counters (later we can connect cart count from localStorage)
  const notifCount = 19;
  const travelCount = 0;
  const cartCount = 0;

  return (
    <html lang="en">
      <body className="min-h-screen bg-black text-white">
        {/* Top Header */}
        <header className="sticky top-0 z-50 border-b border-white/10 bg-black/80 backdrop-blur">
          <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
            <Link href="/" className="text-xl font-black tracking-tight">
              <span className="text-yellow-400">BURAQ</span>GO
            </Link>

            <nav className="hidden items-center gap-6 text-sm text-white/80 md:flex">
              <Link href="/" className="hover:text-white">
                Home
              </Link>
              <Link href="/shop" className="hover:text-white">
                Shop
              </Link>
              <Link href="/cart" className="hover:text-white">
                Cart
              </Link>
            </nav>

            {/* Icon Row */}
            <div className="flex items-center gap-3">
              <IconButton label="Notifications" href="#">
                🔔
                <Badge value={notifCount} />
              </IconButton>

              <IconButton label="Travel" href="#">
                ✈️
                <Badge value={travelCount} />
              </IconButton>

              <IconButton label="Cart" href="/cart">
                🛒
                <Badge value={cartCount} />
              </IconButton>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="mx-auto max-w-6xl px-4 py-8">{children}</main>

        {/* Floating WhatsApp Button */}
        <a
          href="https://wa.me/8801312322447?text=Hello%20BuraqGo%20%F0%9F%91%8B%20I%20want%20to%20order."
          target="_blank"
          rel="noopener noreferrer"
          className="fixed bottom-5 right-5 z-[9999] flex items-center gap-3 rounded-full bg-green-600 px-4 py-3 text-white shadow-lg hover:bg-green-500"
        >
          <span className="text-lg">💬</span>
          <span className="text-sm font-semibold">WhatsApp</span>
        </a>
      </body>
    </html>
  );
}

function IconButton({
  children,
  label,
  href,
}: {
  children: React.ReactNode;
  label: string;
  href: string;
}) {
  return (
    <Link
      href={href}
      aria-label={label}
      className="relative grid h-10 w-10 place-items-center rounded-full border border-white/10 bg-white/5 hover:bg-white/10"
    >
      <span className="text-lg">{children}</span>
    </Link>
  );
}
