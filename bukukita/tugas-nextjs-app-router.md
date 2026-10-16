# Tugas Next.js App Router: Peta Rute BukuKita

> **Catatan:** Contoh produk yang dipakai adalah **BukuKita**, toko buku online sederhana. Kalau produkmu berbeda, ganti nama rute, komponen, dan contoh isinya, tetapi struktur jawabannya bisa dipakai apa adanya.

## 1. Peta Rute Produk

| No | URL | Berkas di `app/` | Jenis Rute | Isi Halaman |
|---|---|---|---|---|
| 1 | `/` | `app/page.tsx` | Statis | Beranda: banner promo, buku terlaris, dan tautan ke katalog |
| 2 | `/buku` | `app/buku/page.tsx` | Statis | Katalog: daftar semua buku dalam bentuk kartu, dengan kolom pencarian |
| 3 | `/buku/[slug]` | `app/buku/[slug]/page.tsx` | **Dinamis** | Detail satu buku: sampul, sinopsis, harga, tombol tambah ke keranjang |
| 4 | `/keranjang` | `app/keranjang/page.tsx` | Statis | Daftar buku yang dipilih, total harga, tombol checkout |
| 5 | `/tentang` | `app/tentang/page.tsx` | Statis | Profil toko, kontak, dan jam operasional |

Berkas pendukung (bukan rute sendiri): `app/layout.tsx`, `app/not-found.tsx`, `app/buku/layout.tsx`, `app/buku/template.tsx`, `app/buku/loading.tsx`, `app/buku/[slug]/not-found.tsx`.

## 2. Struktur Folder `app/`

```
app/
├── layout.tsx            # Root layout: <html>, <body>, Navbar, Footer
├── page.tsx              # /
├── globals.css
├── not-found.tsx         # 404 global
├── tentang/
│   └── page.tsx          # /tentang
├── keranjang/
│   └── page.tsx          # /keranjang
└── buku/
    ├── layout.tsx        # Layout bersarang: sidebar kategori (Novel, Komik, Sains)
    ├── template.tsx      # Template: animasi masuk dan reset draft ulasan
    ├── loading.tsx       # Skeleton saat daftar buku dimuat
    ├── page.tsx          # /buku
    └── [slug]/
        ├── page.tsx      # /buku/[slug]
        └── not-found.tsx # 404 khusus buku
```

**Layout bersarang yang direncanakan:**

1. `app/layout.tsx` membungkus semua halaman (Navbar dan Footer).
2. `app/buku/layout.tsx` membungkus `/buku` dan `/buku/[slug]` dengan sidebar kategori.
3. Halaman `/buku/[slug]` jadi berlapis: Root layout → layout buku → template buku → page.

## 3. Aturan Params pada Rute Dinamis `/buku/[slug]`

### Aturan nilai `slug` yang sah

1. Hanya huruf kecil `a-z`, angka `0-9`, dan tanda hubung `-`.
2. Tidak diawali atau diakhiri tanda hubung, dan tidak ada tanda hubung ganda.
3. Panjang 3 sampai 80 karakter.
4. Slug harus ada di katalog buku (database atau data lokal).

Pola regex: `^[a-z0-9]+(?:-[a-z0-9]+)*$`

Contoh URL sah: `/buku/laskar-pelangi`, `/buku/atomic-habits`, `/buku/bumi-manusia-2`.

### Tiga contoh URL tidak sah

| No | URL | Alasan Tidak Sah | Tampilan yang Diharapkan |
|---|---|---|---|
| 1 | `/buku/Laskar_Pelangi!!` | Mengandung huruf besar, garis bawah, dan tanda seru (melanggar aturan 1) | Status 404. `not-found.tsx` menampilkan: "Alamat buku tidak valid" dan tombol kembali ke `/buku` |
| 2 | `/buku/ab` | Hanya 2 karakter (melanggar aturan 3) | Status 404 dengan tampilan yang sama seperti nomor 1 |
| 3 | `/buku/buku-yang-tidak-ada` | Format benar, tetapi tidak ada di katalog (melanggar aturan 4) | Status 404. Menampilkan: "Buku tidak ditemukan", saran mencari lewat katalog, dan tautan ke `/buku` |

### Cuplikan validasi

```tsx
// app/buku/[slug]/page.tsx
import { notFound } from "next/navigation";
import { getBookBySlug } from "@/lib/books";

const SLUG_REGEX = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

export default async function BukuDetail({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  if (slug.length < 3 || slug.length > 80 || !SLUG_REGEX.test(slug)) {
    notFound();
  }

  const buku = await getBookBySlug(slug);
  if (!buku) notFound();

  return <h1>{buku.judul}</h1>;
}
```

## 4. Perbedaan `layout.tsx` dan `template.tsx`

| Aspek | `layout.tsx` | `template.tsx` |
|---|---|---|
| Saat navigasi antar halaman anak | **Dipertahankan**, tidak dibuat ulang | **Dibuat ulang**, instans baru untuk setiap navigasi |
| State komponen client | Tetap terjaga | Di-reset |
| `useEffect` | Tidak dijalankan ulang | Dijalankan ulang di setiap navigasi |
| Cocok untuk | Elemen yang konsisten seperti Navbar, sidebar, footer | Animasi masuk, pencatatan page view, form yang harus kosong lagi |

Keduanya menerima `children` dan bisa dipakai bersamaan. Layout membungkus template, lalu template membungkus halaman.

**Contoh kebutuhan di BukuKita yang lebih cocok memakai template:** pada halaman detail buku terdapat form ulasan. Saat pembeli berpindah dari buku A ke buku B, draft ulasan buku A harus hilang agar tidak terkirim ke buku yang salah. Dengan `app/buku/template.tsx`, komponen dibuat ulang tiap pindah buku sehingga state form otomatis kosong. Template yang sama juga bisa memberi animasi fade-in dan mencatat page view untuk setiap buku yang dibuka. Kalau memakai layout, state draft akan terbawa karena layout tidak di-mount ulang.

## 5. Server Component atau Client Component

| Komponen | Jenis | Alasan |
|---|---|---|
| `BookCard` (kartu buku di katalog) | **Server Component** | Hanya menampilkan data (sampul, judul, harga) tanpa interaksi. Data bisa diambil langsung di server, tidak menambah JavaScript ke browser, dan baik untuk SEO |
| `AddToCartButton` (tombol tambah ke keranjang) | **Client Component** (`"use client"`) | Perlu event `onClick`, state jumlah, dan akses `localStorage` atau context keranjang, semuanya hanya tersedia di browser |
| `SearchBar` (kolom pencarian katalog) | **Client Component** (`"use client"`) | Perlu `useState` untuk teks input, serta `useRouter` dan `useSearchParams` untuk memperbarui URL saat pengguna mengetik |

**Prinsip yang dipakai:** semua komponen dijadikan Server Component secara default, dan hanya komponen yang butuh interaksi, state, atau API browser yang diberi `"use client"`. Dengan begitu `BookCard` tetap ringan, sedangkan `AddToCartButton` bisa diletakkan di dalamnya sebagai "pulau" client kecil.
