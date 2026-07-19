import Link from "next/link";
import Image from "next/image";
import { bannerService } from "@/features/banner/services/banner.service";
import { produkService } from "@/features/produk/services/produk.service";
import { kategoriService } from "@/features/kategori/services/kategori.service";
import { umkmService } from "@/features/umkm/services/umkm.service";

export default async function HomePage() {
  const [banners, produks, kategoris, umkms] = await Promise.all([
    bannerService.getActive(),
    produkService.getActive(),
    kategoriService.getAll(),
    umkmService.getActive(),
  ]);

  const produkUnggulan = produks.filter((p) => p.bestSeller).slice(0, 6);
  const activeBanner = banners[0];

  return (
    <div>
      {/* Hero Banner */}
      <section className="relative flex h-90 items-center justify-center bg-[#2E7D32] text-white">
        {activeBanner ? (
          <>
            <Image
              src={activeBanner.gambar}
              alt={activeBanner.judul}
              fill
              className="object-cover opacity-40"
              priority
            />
            <div className="relative z-10 max-w-2xl px-4 text-center">
              <h1 className="text-3xl font-bold sm:text-4xl">
                {activeBanner.judul}
              </h1>
              {activeBanner.subjudul && (
                <p className="mt-3 text-lg">{activeBanner.subjudul}</p>
              )}
              <Link
                href="/produk"
                className="mt-6 inline-block rounded-md bg-white px-6 py-2 font-medium text-[#2E7D32] hover:bg-gray-100"
              >
                Lihat Produk
              </Link>
            </div>
          </>
        ) : (
          <div className="px-4 text-center">
            <h1 className="text-3xl font-bold sm:text-4xl">
              Kampung Jajanan RW 06 Wonorejo
            </h1>
            <p className="mt-3 text-lg">
              Temukan jajanan tradisional dari UMKM warga sekitar
            </p>
            <Link
              href="/produk"
              className="mt-6 inline-block rounded-md bg-white px-6 py-2 font-medium text-[#2E7D32] hover:bg-gray-100"
            >
              Lihat Produk
            </Link>
          </div>
        )}
      </section>

      {/* Kategori */}
      {kategoris.length > 0 && (
        <section className="mx-auto max-w-6xl px-4 py-12">
          <h2 className="mb-6 text-xl font-bold text-[#1F2937]">Kategori</h2>
          <div className="flex flex-wrap gap-3">
            {kategoris.map((kategori) => (
              <Link
                key={kategori.id}
                href={`/produk?kategori=${kategori.id}`}
                className="rounded-full border border-gray-200 bg-white px-4 py-2 text-sm text-[#1F2937] hover:border-[#2E7D32] hover:text-[#2E7D32]"
              >
                {kategori.nama}
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Produk Unggulan */}
      {produkUnggulan.length > 0 && (
        <section className="mx-auto max-w-6xl px-4 py-12">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-xl font-bold text-[#1F2937]">Produk Unggulan</h2>
            <Link href="/produk" className="text-sm text-[#2E7D32] hover:underline">
              Lihat Semua
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
            {produkUnggulan.map((produk) => (
              <Link
                key={produk.id}
                href={`/produk/${produk.slug}`}
                className="group overflow-hidden rounded-lg border border-gray-100 bg-white shadow-sm transition hover:shadow-md"
              >
                <div className="relative aspect-square bg-gray-100">
                  {produk.foto ? (
                    <Image
                      src={produk.foto}
                      alt={produk.namaProduk}
                      fill
                      className="object-cover transition group-hover:scale-105"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center text-xs text-gray-400">
                      No Foto
                    </div>
                  )}
                </div>
                <div className="p-3">
                  <p className="truncate text-sm font-medium text-[#1F2937]">
                    {produk.namaProduk}
                  </p>
                  <p className="text-sm font-semibold text-[#2E7D32]">
                    Rp{produk.harga.toLocaleString("id-ID")}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Daftar UMKM */}
      {umkms.length > 0 && (
        <section className="mx-auto max-w-6xl px-4 py-12">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-xl font-bold text-[#1F2937]">UMKM Kami</h2>
            <Link href="/umkm" className="text-sm text-[#2E7D32] hover:underline">
              Lihat Semua
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            {umkms.slice(0, 8).map((umkm) => (
              <div
                key={umkm.id}
                className="flex flex-col items-center rounded-lg border border-gray-100 bg-white p-4 text-center shadow-sm"
              >
                <div className="relative mb-2 h-16 w-16 overflow-hidden rounded-full bg-gray-100">
                  {umkm.foto ? (
                    <Image src={umkm.foto} alt={umkm.namaUmkm} fill className="object-cover" />
                  ) : (
                    <div className="flex h-full items-center justify-center text-xs text-gray-400">
                      🏪
                    </div>
                  )}
                </div>
                <p className="text-sm font-medium text-[#1F2937]">{umkm.namaUmkm}</p>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}