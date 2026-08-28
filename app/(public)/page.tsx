// page.tsx
import Link from "next/link";
import Image from "next/image";

import { bannerService } from "@/features/banner/services/banner.service";
import { produkService } from "@/features/produk/services/produk.service";
import { kategoriService } from "@/features/kategori/services/kategori.service";
import { umkmService } from "@/features/umkm/services/umkm.service";
import { websiteSettingService } from "@/features/website-setting/services/website-setting.service";

import { HeroIntro } from "@/components/shared/hero-intro";
import { HeroBanner } from "@/components/shared/hero-banner";
import { KategoriProdukCarousel } from "@/components/shared/kategori-produk-carousel";

const KATEGORI_ICON: Record<string, string> = {
  "Camilan Kering": "🍘",
  Gorengan: "🍤",
  "Kue Basah": "🧁",
  "Makanan Berat": "🍛",
  Minuman: "🥤",
  "Lain-lain": "🛒",
};


export default async function HomePage() {
  const [banners, produks, kategoris, umkms, setting] = await Promise.all([
    bannerService.getActive(),
    produkService.getActive(),
    kategoriService.getAll(),
    umkmService.getActive(),
    websiteSettingService.get(),
  ]);

  const namaWebsite = setting?.namaWebsite ?? "UMKM Kelurahan Taman";

  const kategorisSorted = [...kategoris].sort((a, b) => {
    if (a.nama === "Lain-lain") return 1;
    if (b.nama === "Lain-lain") return -1;

    return 0;
  });

  return (
    <div className="bg-white">
      <HeroIntro namaWebsite={namaWebsite} />

      {/* Banner */}
      <div className="mx-auto max-w-6xl px-4 pt-6 sm:pt-8">
        <div className="overflow-hidden rounded-3xl shadow-[0_8px_28px_-8px_rgba(14,165,233,0.2)]">
          <HeroBanner banners={banners} />
        </div>
      </div>

      {/* Kategori */}
      {kategorisSorted.length > 0 && (
        <section className="mx-auto max-w-6xl px-4 pb-2 pt-10 sm:pt-14">
          <h2 className="mb-6 text-lg font-bold tracking-tight text-gray-900 sm:text-xl">
            Kategori
          </h2>

          <div className="grid grid-cols-3 gap-3 sm:grid-cols-5 sm:gap-4">
            {kategorisSorted.map((kategori) => (
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

      {/* Pembatas */}
      <div className="mx-auto max-w-6xl px-4">
        <div className="border-t border-gray-100" />
      </div>

      {/* Produk per Kategori */}
      <div className="*:border-b *:border-gray-50 [&>*:last-child]:border-b-0">
        {kategorisSorted.map((kategori) => {
          const produkKategori = produks.filter(
            (produk) => produk.kategoriId === kategori.id
          );

          return (
            <KategoriProdukCarousel
              key={kategori.id}
              kategoriId={kategori.id}
              kategoriNama={kategori.nama}
              produks={produkKategori}
            />
          );
        })}
      </div>

      {/* UMKM */}
      {umkms.length > 0 && (
        <section className="relative mt-4 overflow-hidden bg-texture-mesh px-4 py-10 sm:py-14">
          <div className="relative z-10 mx-auto max-w-6xl">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-lg font-bold tracking-tight text-gray-900 sm:text-xl">
                UMKM Kami
              </h2>

              <Link
                href="/umkm"
                className="flex items-center gap-1 rounded-full border border-gray-200 px-3 py-1 text-sm font-medium text-gray-700 transition-colors hover:border-brand hover:text-brand"
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
                  <div className="relative h-16 w-16 overflow-hidden rounded-full ring-2 ring-brand-light sm:h-20 sm:w-20">
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
          </div>
        </section>
      )}
    </div>
  );
}