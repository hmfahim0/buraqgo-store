import "./globals.css";
import Link from "next/link";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-black text-white">
        {/* NAVBAR */}
        <header className="fixed top-0 left-0 w-full z-50 bg-black/80 backdrop-blur border-b border-white/10">
          <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
            {/* Logo */}
            <Link href="/" className="text-xl font-bold">
              <span className="text-yellow-400">BURAQ</span>GO
            </Link>

            {/* Cart only */}
            <Link
              href="/cart"
              className="border border-white/20 px-4 py-2 rounded-full hover:bg-white hover:text-black transition"
            >
              Cart
            </Link>
          </div>
        </header>

        {/* PAGE CONTENT */}
        <main className="pt-20">{children}</main>
      </body>
    </html>
  );
}
