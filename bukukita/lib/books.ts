export type Buku = {
  slug: string;
  judul: string;
  penulis: string;
  harga: number;
  kategori: "Novel" | "Komik" | "Sains";
  sinopsis: string;
};

export const DAFTAR_BUKU: Buku[] = [
  {
    slug: "laskar-pelangi",
    judul: "Laskar Pelangi",
    penulis: "Andrea Hirata",
    harga: 85000,
    kategori: "Novel",
    sinopsis: "Kisah sepuluh anak di Belitung yang berjuang untuk tetap bersekolah.",
  },
  {
    slug: "atomic-habits",
    judul: "Atomic Habits",
    penulis: "James Clear",
    harga: 99000,
    kategori: "Sains",
    sinopsis: "Cara membangun kebiasaan kecil yang memberi hasil besar.",
  },
  {
    slug: "bumi-manusia",
    judul: "Bumi Manusia",
    penulis: "Pramoedya Ananta Toer",
    harga: 110000,
    kategori: "Novel",
    sinopsis: "Kisah Minke pada masa kolonial di awal abad ke-20.",
  },
];

export async function getAllBooks(): Promise<Buku[]> {
  return DAFTAR_BUKU;
}

export async function getBookBySlug(slug: string): Promise<Buku | undefined> {
  return DAFTAR_BUKU.find((b) => b.slug === slug);
}

export const SLUG_REGEX = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

export function isSlugValid(slug: string): boolean {
  return slug.length >= 3 && slug.length <= 80 && SLUG_REGEX.test(slug);
}
