import type { ReactNode } from "react";
import Link from "next/link";
import "./globals.css";

export const metadata = {
  title: "BukuKita",
  description: "Toko buku online sederhana",
};

// Root layout: membungkus SEMUA halaman (Navbar + Footer).
export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="id">
      <body>
        <nav className="navbar">
          <Link href="/">BukuKita</Link>
          <Link href="/buku">Katalog</Link>
          <Link href="/keranjang">Keranjang</Link>
          <Link href="/tentang">Tentang</Link>
        </nav>
        <main>{children}</main>
        <footer className="footer">&copy; 2026 BukuKita</footer>
      </body>
    </html>
  );
}
