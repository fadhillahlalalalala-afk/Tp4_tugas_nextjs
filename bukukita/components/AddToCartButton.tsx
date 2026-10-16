"use client";

import { useState } from "react";

// CLIENT COMPONENT: butuh onClick, useState, dan akses browser.
export default function AddToCartButton({ slug }: { slug: string }) {
  const [jumlah, setJumlah] = useState(0);

  function tambah() {
    setJumlah((n) => n + 1);
    try {
      const keranjang = JSON.parse(localStorage.getItem("keranjang") ?? "{}");
      keranjang[slug] = (keranjang[slug] ?? 0) + 1;
      localStorage.setItem("keranjang", JSON.stringify(keranjang));
    } catch {
      // abaikan jika localStorage tidak tersedia
    }
  }

  return (
    <button type="button" onClick={tambah}>
      Tambah ke keranjang{jumlah > 0 ? ` (${jumlah})` : ""}
    </button>
  );
}
