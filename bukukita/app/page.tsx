import Link from "next/link";

// Rute: /  (statis)
export default function Beranda() {
  return (
    <section>
      <h1>Selamat datang di BukuKita</h1>
      <p>Promo bulan ini: diskon 20% untuk semua novel.</p>
      <Link href="/buku">Lihat katalog buku</Link>
    </section>
  );
}
