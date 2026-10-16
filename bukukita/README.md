# BukuKita (tugas Next.js App Router)

Proyek contoh untuk tugas peta rute. Isi jawaban tertulis ada di `tugas-nextjs-app-router.md`.

## Menjalankan

```bash
npm install
npm run dev
```

Buka http://localhost:3000

## Rute

| URL | Berkas | Jenis |
|---|---|---|
| `/` | `app/page.tsx` | Statis |
| `/buku` | `app/buku/page.tsx` | Statis |
| `/buku/[slug]` | `app/buku/[slug]/page.tsx` | Dinamis |
| `/keranjang` | `app/keranjang/page.tsx` | Statis |
| `/tentang` | `app/tentang/page.tsx` | Statis |

## Coba URL tidak sah

- `/buku/Laskar_Pelangi!!`
- `/buku/ab`
- `/buku/buku-yang-tidak-ada`

Ketiganya menampilkan halaman 404 dari `app/buku/[slug]/not-found.tsx`.
