"use client";

import { useEffect, useState, type ReactNode } from "react";
import { usePathname } from "next/navigation";

// Template: dibuat ULANG di setiap navigasi antar halaman buku.
// Berguna untuk mencatat page view, animasi masuk, dan mereset draft ulasan.
export default function BukuTemplate({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const [draftUlasan, setDraftUlasan] = useState("");

  useEffect(() => {
    console.log("Page view:", pathname);
  }, [pathname]);

  return (
    <div className="fade-in">
      {children}
      <hr />
      <label>
        Draft ulasan (otomatis kosong saat pindah buku):
        <br />
        <textarea
          value={draftUlasan}
          onChange={(e) => setDraftUlasan(e.target.value)}
          rows={3}
        />
      </label>
    </div>
  );
}
