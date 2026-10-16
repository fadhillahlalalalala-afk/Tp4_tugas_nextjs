import Link from "next/link";

// 404 global
export default function NotFound() {
  return (
    <section>
      <h1>Halaman tidak ditemukan</h1>
      <Link href="/">Kembali ke beranda</Link>
    </section>
  );
}
