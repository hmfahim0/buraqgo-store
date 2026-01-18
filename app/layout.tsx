import "./globals.css";
import type { Metadata } from "next";
import Link from "next/link";
import CartButton from "../components/CartButton";

export const metadata: Metadata = {
  title: "BuraqGo Toys",
  description: "Premium toy cars for kids & collectors",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-black text-white">
        {/* HEADER */}
        <header className="sticky top-0 z-50 border-b border-white/10 bg-black/80 backdrop-blur">
          <div className="mx-auto max-w-6xl px-6 py-4 flex items-center justify-between">
            {/* LOGO */}
            <Link href="/" className="text-xl font-bold tracking-wide">
              <span className="text-yellow-400">BURAQ</span>GO
            </Link>

            {/* NAV */}
            <nav className="flex items-center gap-6 text-sm">
              <Link href="/" className="hover:text-white/80">
                Home
              </Link>
              <Link href="/shop" className="hover:text-white/80">
                Shop
              </Link>

              {/* CART BUTTON WITH COUNT */}
              <CartButton />
            </nav>
          </div>
        </header>

        {/* PAGE CONTENT */}
        <main>{children}</main>
      </body>
    </html>
  );
}
