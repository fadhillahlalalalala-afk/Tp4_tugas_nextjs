import type { ReactNode } from "react";

// Layout bersarang: berlaku untuk /buku dan /buku/[slug].
// Tidak dibuat ulang saat berpindah antar halaman buku.
export default function BukuLayout({ children }: { children: ReactNode }) {
  return (
    <div className="with-sidebar">
      <aside className="sidebar">
        <h3>Kategori</h3>
        <ul>
          <li>Novel</li>
          <li>Komik</li>
          <li>Sains</li>
        </ul>
      </aside>
      <div>{children}</div>
    </div>
  );
}
