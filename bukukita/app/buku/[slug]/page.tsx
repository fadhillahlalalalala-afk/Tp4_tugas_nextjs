import { notFound } from "next/navigation";
import { getBookBySlug, isSlugValid } from "@/lib/books";
import AddToCartButton from "@/components/AddToCartButton";

// Rute dinamis: /buku/[slug]
export default async function DetailBuku({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  // Aturan 1-3: format dan panjang slug
  if (!isSlugValid(slug)) notFound();

  // Aturan 4: slug harus ada di katalog
  const buku = await getBookBySlug(slug);
  if (!buku) notFound();

  return (
    <article>
      <h1>{buku.judul}</h1>
      <p>Penulis: {buku.penulis}</p>
      <p>Kategori: {buku.kategori}</p>
      <p>{buku.sinopsis}</p>
      <p>Rp {buku.harga.toLocaleString("id-ID")}</p>
      <AddToCartButton slug={buku.slug} />
    </article>
  );
}
