import Link from "next/link";
import { MapPin, Phone, Mail, ArrowRight, Store } from "lucide-react";

type FooterProps = {
  namaWebsite: string;
  kategoris: { id: string; nama: string }[];
  alamat?: string;
  telepon?: string;
  instagram?: string;
  email?: string;
};

export function Footer({
  namaWebsite,
  kategoris,
  alamat = "Kelurahan Taman",
  telepon = "0812-3456-7890",
  instagram = "@umkmtaman",
  email = "info@umkmtaman.id",
}: FooterProps) {
  return (
    <footer className="bg-brand-dark">
      {/* CTA */}
      <div className="mx-auto max-w-6xl px-4 pt-10 sm:pt-14">
        <div className="relative overflow-hidden rounded-3xl bg-white px-6 py-8 shadow-xl sm:px-10 sm:py-10">
          <div className="flex flex-col items-center gap-6 sm:flex-row sm:items-center">
            <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl bg-brand-light sm:h-24 sm:w-24">
              <Store className="h-10 w-10 text-brand" />
            </div>

            <div className="flex-1 text-center sm:text-left">
              <h2 className="text-lg font-bold tracking-tight text-gray-900 sm:text-xl">
                Punya usaha di {alamat}?
              </h2>
              <p className="mt-1 text-sm leading-relaxed text-gray-600 sm:text-base">
                Mari kenalkan produkmu kepada lebih banyak masyarakat dan
                tumbuh bersama {namaWebsite}.
              </p>

              <Link
                href="/kontak"
                className="mt-4 inline-flex items-center gap-1.5 rounded-full bg-brand px-5 py-2.5 text-sm font-semibold text-white shadow-[0_6px_16px_-4px_rgba(14,165,233,0.4)] transition-transform duration-200 hover:-translate-y-0.5"
              >
                Daftarkan UMKM Anda
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Footer links */}
      <div className="mx-auto max-w-6xl px-4 py-10 sm:py-14">
        <div className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-4 sm:gap-8">
          {/* Brand */}
          <div className="col-span-2 sm:col-span-1">
            <div className="flex items-center gap-2">
              <Store className="h-5 w-5 text-white" />
              <span className="text-sm font-bold text-white">{namaWebsite}</span>
            </div>
            <p className="mt-3 max-w-50 text-xs leading-relaxed text-blue-100/80 sm:text-sm">
              Platform untuk mengenal dan menemukan produk UMKM lokal {alamat}.
            </p>

            <div className="mt-4 flex items-center gap-2.5">
              <a
                href={`https://instagram.com/${instagram.replace("@", "")}`}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-white/20 text-white/80 transition-colors hover:border-white hover:bg-white/10 hover:text-white font-bold text-xs"
              >
                @
              </a>
              <a
                href={`https://wa.me/${telepon.replace(/\D/g, "")}`}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-white/20 text-white/80 transition-colors hover:border-white hover:bg-white/10 hover:text-white"
              >
                <Phone className="h-4 w-4" />
              </a>
              <a
                href={`mailto:${email}`}
                aria-label="Email"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-white/20 text-white/80 transition-colors hover:border-white hover:bg-white/10 hover:text-white"
              >
                <Mail className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Navigasi */}
          <div>
            <h3 className="text-sm font-bold text-white">Navigasi</h3>
            <ul className="mt-3.5 space-y-2.5 text-sm text-blue-100/80">
              <li><Link href="/" className="transition-colors hover:text-white">Beranda</Link></li>
              <li><Link href="/produk" className="transition-colors hover:text-white">Produk</Link></li>
              <li><Link href="/umkm" className="transition-colors hover:text-white">UMKM</Link></li>
              <li><Link href="/tentang" className="transition-colors hover:text-white">Tentang Kami</Link></li>
            </ul>
          </div>

          {/* Kategori — chip */}
          <div>
            <h3 className="text-sm font-bold text-white">Kategori</h3>
            <div className="mt-3.5 flex flex-wrap gap-2">
              {kategoris.map((kategori) => (
                <Link
                  key={kategori.id}
                  href={`/produk?kategori=${kategori.id}`}
                  prefetch={false}
                  className="rounded-full border border-white/20 px-3 py-1 text-xs font-medium text-blue-100/90 transition-colors hover:border-white hover:bg-white/10 hover:text-white"
                >
                  {kategori.nama}
                </Link>
              ))}
            </div>
          </div>

          {/* Kontak */}
          <div className="col-span-2 sm:col-span-1">
            <h3 className="text-sm font-bold text-white">Kontak Kami</h3>
            <ul className="mt-3.5 space-y-3 text-sm text-blue-100/80">
              <li className="flex items-start gap-2.5">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-white/70" />
                <span className="leading-relaxed">{alamat}</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="h-4 w-4 shrink-0 text-white/70" />
                {telepon}
              </li>
              <li className="flex items-center gap-2.5">
                <span className="text-xs text-white/70">📱</span>
                <a href={`https://instagram.com/${instagram.replace("@", "")}`} target="_blank" rel="noopener noreferrer" className="text-blue-100/80 hover:text-white hover:underline">{instagram}</a>
              </li>
              <li className="flex items-start gap-2.5">
                <Mail className="mt-0.5 h-4 w-4 shrink-0 text-white/70" />
                <span className="break-all leading-relaxed">{email}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-white/10 py-5">
        <p className="px-4 text-center text-xs leading-relaxed text-blue-100/70">
          © {new Date().getFullYear()} {namaWebsite}. Mendukung produk lokal,
          menguatkan ekonomi masyarakat.
        </p>
      </div>
    </footer>
  );
}