import Link from "next/link";
import Image from "next/image";
import { bannerService } from "@/features/banner/services/banner.service";
import { produkService } from "@/features/produk/services/produk.service";
import { kategoriService } from "@/features/kategori/services/kategori.service";
import { umkmService } from "@/features/umkm/services/umkm.service";
import { ProductCard } from "@/components/shared/product-card";
import { HeroBanner } from "@/components/shared/hero-banner";
import { KategoriProdukCarousel } from "@/components/shared/kategori-produk-carousel";

// Peta ikon per kategori — fallback ke 🍽️ kalau nama kategori belum terdaftar.
// Sesuaikan key-nya dengan nama kategori asli di database.
const KATEGORI_ICON: Record<string, string> = {
  "Camilan Kering": "🍘",
  "Gorengan": "🍤",
  "Kue Basah": "🧁",
  "Makanan Berat": "🍛",
  "Minuman": "🥤",
};

export default async function HomePage() {
  const [banners, produks, kategoris, umkms] = await Promise.all([
    bannerService.getActive(),
    produkService.getActive(),
    kategoriService.getAll(),
    umkmService.getActive(),
  ]);

  const produkUnggulan = produks.filter((p) => p.bestSeller).slice(0, 6);

  return (
    <div className="bg-white">
      <HeroBanner banners={banners} />

      {/* Kategori */}
      {kategoris.length > 0 && (
        <section className="mx-auto max-w-6xl px-4 py-10 sm:py-14">
          <h2 className="mb-5 text-lg font-bold text-gray-900 sm:text-xl">
            Kategori
          </h2>
          <div className="grid grid-cols-3 gap-3 sm:grid-cols-5 sm:gap-4">
            {kategoris.map((kategori) => (
              <Link
                key={kategori.id}
                href={`/produk?kategori=${kategori.id}`}
                className="group flex flex-col items-center gap-2 rounded-2xl border border-gray-100 bg-[--color-surface-tint] px-3 py-5 text-center transition-all duration-200 ease-out hover:-translate-y-0.5 hover:border-brand/30 hover:shadow-[--shadow-card]"
              >
                <span className="text-3xl transition-transform duration-200 ease-out group-hover:scale-110">
                  {KATEGORI_ICON[kategori.nama] ?? "🍽️"}
                </span>
                <span className="text-xs font-medium text-gray-800 sm:text-sm">
                  {kategori.nama}
                </span>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Produk per Kategori */}
      {kategoris.map((kategori) => {
        const produkKategori = produks.filter((p) => p.kategoriId === kategori.id);
        return (
          <KategoriProdukCarousel
            key={kategori.id}
            kategoriId={kategori.id}
            kategoriNama={kategori.nama}
            produks={produkKategori}
          />
        );
      })}

      {/* UMKM */}
      {umkms.length > 0 && (
        <section className="mx-auto max-w-6xl px-4 py-10 sm:py-14">
          <div className="mb-5 flex items-center justify-between">
            <h2 className="text-lg font-bold text-gray-900 sm:text-xl">
              UMKM Kami
            </h2>
            <Link
              href="/umkm"
              className="text-sm font-medium text-brand transition-colors hover:text-brand-dark"
            >
              Lihat Semua 
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
            {umkms.slice(0, 8).map((umkm) => (
              <Link
                key={umkm.id}
                href={`/umkm/${umkm.id}`}
                className="group flex flex-col items-center gap-2 rounded-2xl border border-gray-100 bg-white p-4 text-center shadow-[--shadow-card] transition-all duration-200 ease-out hover:-translate-y-0.5 hover:border-brand/30"
              >
                <div className="relative h-16 w-16 overflow-hidden rounded-full ring-2 ring-brand-light sm:h-18 sm:w-18">
                  {umkm.foto ? (
                    <Image
                      src={umkm.foto}
                      alt={umkm.namaUmkm}
                      fill
                      className="object-cover transition-transform duration-200 ease-out group-hover:scale-105"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center bg-brand-light text-xl">
                      🏪
                    </div>
                  )}
                </div>
                <p className="text-xs font-medium text-gray-800 sm:text-sm">
                  {umkm.namaUmkm}
                </p>
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}