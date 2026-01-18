import "./globals.css";

export const metadata = {
  title: "BuraqGo",
  description: "BuraqGo Toy Cars",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
