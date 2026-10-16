import Link from "next/link";
import type { Buku } from "@/lib/books";
import AddToCartButton from "./AddToCartButton";

// SERVER COMPONENT: hanya menampilkan data, tanpa state atau event.
export default function BookCard({ buku }: { buku: Buku }) {
  return (
    <div className="card">
      <h3>
        <Link href={`/buku/${buku.slug}`}>{buku.judul}</Link>
      </h3>
      <p>{buku.penulis}</p>
      <p>Rp {buku.harga.toLocaleString("id-ID")}</p>
      {/* Pulau client kecil di dalam Server Component */}
      <AddToCartButton slug={buku.slug} />
    </div>
  );
}
