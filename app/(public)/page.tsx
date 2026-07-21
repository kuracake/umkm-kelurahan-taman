import Link from "next/link";
import Image from "next/image";
import { bannerService } from "@/features/banner/services/banner.service";
import { produkService } from "@/features/produk/services/produk.service";
import { kategoriService } from "@/features/kategori/services/kategori.service";
import { umkmService } from "@/features/umkm/services/umkm.service";
import { ProductCard } from "@/components/shared/product-card";

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
    <div className="bg-white">
      {/* Hero */}
      <section className="relative flex h-75 items-center justify-center overflow-hidden sm:h-105">
        <div className="absolute inset-0 bg-linear-to-br from-brand to-brand-dark" />
        {activeBanner && (
          <Image
            src={activeBanner.gambar}
            alt={activeBanner.judul}
            fill
            className="object-cover opacity-30"
            priority
          />
        )}
        <div className="relative z-10 max-w-xl px-4 text-center text-white">
          <h1 className="text-2xl font-bold leading-tight sm:text-4xl">
            {activeBanner?.judul ?? "Kampung Jajanan RW 06 Wonorejo"}
          </h1>
          <p className="mt-3 text-sm text-white/90 sm:text-base">
            {activeBanner?.subjudul ?? "Jajanan tradisional langsung dari dapur warga sekitar"}
          </p>
          <Link
            href="/produk"
            className="mt-6 inline-block rounded-full bg-white px-7 py-2.5 text-sm font-bold text-brand shadow-md transition hover:scale-105"
          >
            Lihat Semua Produk
          </Link>
        </div>
      </section>

      {/* Kategori */}
      {kategoris.length > 0 && (
        <section className="mx-auto max-w-6xl px-4 py-10 sm:py-14">
          <h2 className="mb-5 text-lg font-bold text-gray-800 sm:text-xl">Kategori</h2>
          <div className="grid grid-cols-3 gap-3 sm:grid-cols-5 sm:gap-4">
            {kategoris.map((kategori) => (
              <Link
                key={kategori.id}
                href={`/produk?kategori=${kategori.id}`}
                className="card-hover flex flex-col items-center gap-2 rounded-2xl border border-gray-100 bg-brand-light/40 px-3 py-4 text-center"
              >
                <span className="text-2xl">🍢</span>
                <span className="text-xs font-medium text-gray-700 sm:text-sm">
                  {kategori.nama}
                </span>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Produk Unggulan */}
      {produkUnggulan.length > 0 && (
        <section className="mx-auto max-w-6xl px-4 py-10 sm:py-14">
          <div className="mb-5 flex items-center justify-between">
            <h2 className="text-lg font-bold text-gray-800 sm:text-xl">Produk Favorit</h2>
            <Link href="/produk" className="text-sm font-medium text-brand hover:underline">
              Lihat Semua →
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-6">
            {produkUnggulan.map((produk) => (
              <ProductCard key={produk.id} produk={produk} />
            ))}
          </div>
        </section>
      )}

      {/* UMKM */}
      {umkms.length > 0 && (
        <section className="mx-auto max-w-6xl px-4 py-10 sm:py-14">
          <div className="mb-5 flex items-center justify-between">
            <h2 className="text-lg font-bold text-gray-800 sm:text-xl">UMKM Kami</h2>
            <Link href="/umkm" className="text-sm font-medium text-brand hover:underline">
              Lihat Semua →
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
            {umkms.slice(0, 8).map((umkm) => (
              <div
                key={umkm.id}
                className="card-hover flex flex-col items-center gap-2 rounded-2xl border border-gray-100 bg-white p-4 text-center shadow-[0_2px_8px_-2px_rgba(0,0,0,0.06)]"
              >
                <div className="relative h-14 w-14 overflow-hidden rounded-full bg-brand-light sm:h-16 sm:w-16">
                  {umkm.foto ? (
                    <Image src={umkm.foto} alt={umkm.namaUmkm} fill className="object-cover" />
                  ) : (
                    <div className="flex h-full items-center justify-center text-xl">🏪</div>
                  )}
                </div>
                <p className="text-xs font-medium text-gray-700 sm:text-sm">{umkm.namaUmkm}</p>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}