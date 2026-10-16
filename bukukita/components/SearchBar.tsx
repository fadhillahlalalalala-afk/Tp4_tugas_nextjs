"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

// CLIENT COMPONENT: butuh useState, useRouter, dan useSearchParams.
export default function SearchBar() {
  const router = useRouter();
  const params = useSearchParams();
  const [teks, setTeks] = useState(params.get("q") ?? "");

  function ubah(nilai: string) {
    setTeks(nilai);
    const q = nilai ? `?q=${encodeURIComponent(nilai)}` : "";
    router.replace(`/buku${q}`);
  }

  return (
    <input
      type="search"
      placeholder="Cari judul buku..."
      value={teks}
      onChange={(e) => ubah(e.target.value)}
    />
  );
}
