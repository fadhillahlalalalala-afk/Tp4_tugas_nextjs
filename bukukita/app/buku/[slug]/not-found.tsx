import Link from "next/link";

// 404 khusus rute /buku/[slug]
export default function BukuNotFound() {
  return (
    <section>
      <h1>Buku tidak ditemukan</h1>
      <p>Alamat buku tidak valid atau buku tidak ada di katalog.</p>
      <Link href="/buku">Kembali ke katalog</Link>
    </section>
  );
}
