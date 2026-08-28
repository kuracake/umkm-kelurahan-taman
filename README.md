# UMKM Kelurahan Taman

Website katalog digital untuk UMKM di Kelurahan Taman dibangun untuk membantu para pelaku usaha mikro, kecil, dan menengah mempromosikan produk mereka secara online dengan tampilan modern, cepat, dan mudah diakses.

## Tentang Project

UMKM Kelurahan Taman adalah platform digital yang menampilkan katalog produk dari para pelaku UMKM di wilayah Kelurahan Taman. Website ini dirancang untuk memudahkan masyarakat menemukan produk-produk lokal sekaligus membantu UMKM membangun identitas digital tanpa perlu keahlian teknis.

## Fitur

- 🛍️ **Katalog Produk** — Menampilkan daftar produk UMKM lengkap dengan foto, deskripsi, dan harga
- 🏪 **Profil UMKM** — Informasi detail tiap pelaku usaha (nama toko, kontak, lokasi)
- 🗂️ **Kategori Produk** — Filter produk berdasarkan kategori untuk memudahkan pencarian
- 💬 **Kontak Langsung** — Integrasi tombol pesan ke WhatsApp untuk transaksi langsung dengan penjual
- 🔐 **Admin Panel** — Dashboard admin dengan sistem CRUD penuh untuk mengelola data UMKM dan produk
- 📤 **Upload Gambar** — Manajemen gambar produk terintegrasi dengan Cloudinary
- 📱 **Responsive Design** — Tampilan optimal di perangkat mobile dan desktop, dengan navigasi bawah (bottom navigation) untuk pengalaman mobile-first
- 🔍 **SEO Ready** — Sudah dilengkapi sitemap, robots.txt, dan siap untuk Google Search Console

## Tech Stack

- **Framework:** [Next.js 15](https://nextjs.org/) (App Router)
- **Database ORM:** [Prisma 6](https://www.prisma.io/)
- **Database:** [Neon](https://neon.tech/) (Serverless PostgreSQL)
- **Autentikasi:** [Auth.js](https://authjs.dev/)
- **Media Storage:** [Cloudinary](https://cloudinary.com/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **Deployment:** [Vercel](https://vercel.com/)

## Getting Started

### Prasyarat

- Node.js 18+
- Akun Neon (PostgreSQL)
- Akun Cloudinary

### Instalasi

1. Clone repository ini

```bash
git clone https://github.com/kuracake/umkm-kelurahan-taman.git
cd umkm-kelurahan-taman
```

2. Install dependencies

```bash
npm install --ignore-scripts
```

3. Salin file environment variable

```bash
cp .env.example .env
```

4. Isi variabel di dalam `.env`:

```env
DATABASE_URL=
AUTH_SECRET=
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
```

5. Jalankan migrasi database

```bash
npx prisma generate
npx prisma db push
```

6. Jalankan development server

```bash
npm run dev
```

Buka [http://localhost:3000](http://localhost:3000) di browser untuk melihat hasilnya.

## Struktur Project

Project ini mengikuti pendekatan **Feature-First Architecture**, di mana setiap fitur memiliki folder tersendiri yang berisi komponen, logic, dan tipe data terkait — memudahkan maintenance dan pengembangan fitur baru.

## Kontribusi

Project ini dikembangkan dan dikelola oleh [Kura Agency](https://github.com/kuracake) sebagai bagian dari layanan digitalisasi UMKM.

## Lisensi

Hak cipta dilindungi. Project ini dibuat khusus untuk UMKM Kelurahan Taman.
