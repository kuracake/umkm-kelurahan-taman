// hero-intro.tsx
import Link from "next/link";

export function HeroIntro({ namaWebsite }: { namaWebsite: string }) {
  return (
    <section className="relative overflow-hidden bg-texture-hero px-4 py-10 text-center sm:py-14">
      <div className="relative z-10 mx-auto max-w-2xl">
        <h1 className="text-3xl font-extrabold leading-tight tracking-tight text-brand-dark sm:text-4xl">
          {namaWebsite}
        </h1>

        <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-gray-600 sm:text-base">
          Temukan dan kenali produk usaha lokal dari pelaku UMKM di{" "}
          {namaWebsite}. Dukung pertumbuhan ekonomi lingkungan sekitar kita.
        </p>

        <div className="mx-auto mt-6 flex max-w-xs flex-col gap-3">
          <Link
            href="/umkm"
            className="rounded-full bg-brand px-6 py-3 text-sm font-semibold text-white shadow-[0_6px_16px_-4px_rgba(14,165,233,0.4)] transition-transform duration-200 hover:-translate-y-0.5"
          >
            Jelajahi UMKM
          </Link>

          <Link
            href="/produk"
            className="rounded-full bg-white px-6 py-3 text-sm font-semibold text-gray-700 shadow-sm transition-colors duration-200 hover:bg-gray-50"
          >
            Tentang Produk
          </Link>
        </div>
      </div>
    </section>
  );
}