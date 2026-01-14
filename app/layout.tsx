import "./globals.css";

export const metadata = {
  title: "BuraqGo Toys",
  description: "Premium toy cars for kids & collectors.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-black text-white">
        {children}

        {/* Floating WhatsApp Button (all pages) */}
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
