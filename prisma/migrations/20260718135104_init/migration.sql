-- CreateTable
CREATE TABLE "admins" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "admins_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "umkms" (
    "id" TEXT NOT NULL,
    "nama_umkm" TEXT NOT NULL,
    "nama_pemilik" TEXT NOT NULL,
    "whatsapp" TEXT NOT NULL,
    "alamat" TEXT NOT NULL,
    "deskripsi" TEXT,
    "foto" TEXT,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "umkms_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "kategoris" (
    "id" TEXT NOT NULL,
    "nama" TEXT NOT NULL,
    "icon" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "kategoris_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "produks" (
    "id" TEXT NOT NULL,
    "nama_produk" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "deskripsi" TEXT,
    "harga" INTEGER NOT NULL,
    "foto" TEXT,
    "best_seller" BOOLEAN NOT NULL DEFAULT false,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "umkm_id" TEXT NOT NULL,
    "kategori_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "produks_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "banners" (
    "id" TEXT NOT NULL,
    "judul" TEXT NOT NULL,
    "subjudul" TEXT,
    "gambar" TEXT NOT NULL,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "banners_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "website_settings" (
    "id" TEXT NOT NULL,
    "nama_website" TEXT NOT NULL DEFAULT 'Kampung Jajanan RW 06',
    "deskripsi" TEXT,
    "alamat" TEXT,
    "whatsapp" TEXT,
    "email" TEXT,
    "maps" TEXT,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "website_settings_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "admins_email_key" ON "admins"("email");

-- CreateIndex
CREATE UNIQUE INDEX "kategoris_nama_key" ON "kategoris"("nama");

-- CreateIndex
CREATE UNIQUE INDEX "produks_slug_key" ON "produks"("slug");

-- CreateIndex
CREATE INDEX "produks_umkm_id_idx" ON "produks"("umkm_id");

-- CreateIndex
CREATE INDEX "produks_kategori_id_idx" ON "produks"("kategori_id");

-- AddForeignKey
ALTER TABLE "produks" ADD CONSTRAINT "produks_umkm_id_fkey" FOREIGN KEY ("umkm_id") REFERENCES "umkms"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "produks" ADD CONSTRAINT "produks_kategori_id_fkey" FOREIGN KEY ("kategori_id") REFERENCES "kategoris"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
