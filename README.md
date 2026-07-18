# Kampung Jajanan RW 06 Wonorejo

Website katalog digital UMKM jajanan tradisional RW 06 Wonorejo. Program Kerja KKN — bukan marketplace, pemesanan langsung via WhatsApp.

## Tech Stack

- Next.js 15 (App Router) + React + TypeScript
- Tailwind CSS + Shadcn UI
- Prisma ORM v6 + PostgreSQL (Neon)
- Auth.js (autentikasi admin)
- Cloudinary (penyimpanan foto)
- TanStack Query

## Getting Started

1. Clone repo ini
2. Copy `.env.example` menjadi `.env` dan isi kredensial (Neon, Auth.js secret, Cloudinary)
3. Install dependencies:
```bash
   npm install
```
4. Jalankan migrasi Prisma:
```bash
   npx prisma migrate dev
```
5. Jalankan development server:
```bash
   npm run dev
```

## Struktur Proyek

Menggunakan pendekatan **Feature-First Architecture**:

features/<nama-fitur>/
├── actions/        # Server Actions
├── services/       # Business logic
├── repositories/   # Query database via Prisma
└── schemas/        # Validasi Zod

Lihat `PRD-Website-Pasar-Jajanan-RW06.md` untuk detail requirement lengkap.

## Branching Strategy

- `main` — branch produksi, selalu stabil
- `develop` — branch integrasi
- `feature/*` — satu branch per fitur

## Roadmap

Lihat dokumen PRD section 8.2 untuk roadmap 17 fase pengembangan.