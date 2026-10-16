import { getAllBooks } from "@/lib/books";
import BookCard from "@/components/BookCard";
import SearchBar from "@/components/SearchBar";

// Rute: /buku  (statis)
export default async function Katalog({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q } = await searchParams;
  const semua = await getAllBooks();
  const daftar = q
    ? semua.filter((b) => b.judul.toLowerCase().includes(q.toLowerCase()))
    : semua;

  return (
    <section>
      <h1>Katalog Buku</h1>
      <SearchBar />
      <div className="grid">
        {daftar.map((b) => (
          <BookCard key={b.slug} buku={b} />
        ))}
      </div>
    </section>
  );
}
