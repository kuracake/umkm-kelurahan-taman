import Link from "next/link";
import { FaWhatsapp, FaInstagram } from "react-icons/fa";
import {
  ArrowRight,
  MapPin,
  Mail,
  Phone,
  MessageCircle,
} from "lucide-react";

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect height="17" rx="4" stroke="currentColor" strokeWidth="2" width="17" x="3.5" y="3.5" />
      <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="2" />
      <circle cx="17.5" cy="6.5" fill="currentColor" r="1" />
    </svg>
  );
}

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
  const instagramUsername = instagram.replace("@", "");

  return (
    <footer className="bg-brand-dark text-white">
      {/* =========================================================
          CTA
      ========================================================== */}

      <div className="mx-auto max-w-7xl px-5 pt-8 sm:px-8 sm:pt-10 lg:px-10 lg:pt-12">
        <div
          className="
            overflow-hidden
            rounded-2xl
            border border-white/10
            bg-white/8
            px-5
            py-6
            sm:rounded-3xl
            sm:px-8
            sm:py-8
            lg:px-10
          "
        >
          <div
            className="
              flex
              flex-col
              gap-5
              sm:flex-row
              sm:items-center
              sm:justify-between
            "
          >
            {/* CTA text */}

            <div className="max-w-xl">
              <p className="text-xs font-semibold uppercase tracking-wide text-sky-200">
                Bergabung bersama kami
              </p>

              <h2 className="mt-1.5 text-xl font-bold tracking-tight text-white sm:text-2xl">
                Punya usaha di {alamat}?
              </h2>

              <p className="mt-2 max-w-lg text-sm leading-6 text-white/70 sm:text-base sm:leading-7">
                Kenalkan produkmu kepada lebih banyak masyarakat dan tumbuh
                bersama {namaWebsite}.
              </p>
            </div>

            {/* CTA button */}

            <Link
              href="/kontak"
              className="
                inline-flex
                shrink-0
                items-center
                justify-center
                gap-2
                rounded-xl
                bg-white
                px-5
                py-3
                text-sm
                font-semibold
                text-brand-dark
                shadow-sm
                transition-all
                duration-200
                hover:-translate-y-0.5
                hover:bg-slate-50
                hover:shadow-md
                sm:px-6
                sm:py-3.5
              "
            >
              Daftarkan UMKM
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>

      {/* =========================================================
          MAIN FOOTER
      ========================================================== */}

      <div className="mx-auto max-w-7xl px-5 py-10 sm:px-8 sm:py-12 lg:px-10 lg:py-14">
        <div
          className="
            grid
            grid-cols-1
            gap-10
            sm:grid-cols-2
            lg:grid-cols-[1.3fr_0.8fr_1fr_1.1fr]
            lg:gap-12
          "
        >
          {/* =====================================================
              BRAND
          ====================================================== */}

          <div>
            <Link
              href="/"
              className="inline-flex items-center text-base font-bold tracking-tight text-white transition-colors hover:text-sky-200"
            >
              {namaWebsite}
            </Link>

            <p className="mt-3 max-w-sm text-sm leading-6 text-white/65">
              Platform untuk mengenal dan menemukan produk UMKM lokal{" "}
              {alamat}.
            </p>

            {/* Social */}

            <div className="mt-5 flex items-center gap-2.5">
              <a
                href={`https://instagram.com/${instagramUsername}`}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="
                  flex
                  h-9
                  w-9
                  items-center
                  justify-center
                  rounded-full
                  border
                  border-white/15
                  text-white/75
                  transition-all
                  duration-200
                  hover:border-white/30
                  hover:bg-white/10
                  hover:text-white
                "
              >
                <FaInstagram className="h-5 w-5" />
              </a>

              <a
                href={`https://wa.me/${telepon.replace(/\D/g, "")}`}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                className="
                  flex
                  h-9
                  w-9
                  items-center
                  justify-center
                  rounded-full
                  border
                  border-white/15
                  text-xs
                  font-semibold
                  text-white/75
                  transition-all
                  duration-200
                  hover:border-white/30
                  hover:bg-white/10
                  hover:text-white
                "
              >
                <FaWhatsapp className="h-5 w-5" />
              </a>

              <a
                href={`mailto:${email}`}
                aria-label="Email"
                className="
                  flex
                  h-9
                  w-9
                  items-center
                  justify-center
                  rounded-full
                  border
                  border-white/15
                  text-white/75
                  transition-all
                  duration-200
                  hover:border-white/30
                  hover:bg-white/10
                  hover:text-white
                "
              >
                <Mail className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* =====================================================
              NAVIGASI
          ====================================================== */}

          <div>
            <h3 className="text-sm font-semibold text-white">
              Navigasi
            </h3>

            <ul className="mt-4 space-y-3">
              <li>
                <Link
                  href="/"
                  className="text-sm text-white/65 transition-colors hover:text-white"
                >
                  Beranda
                </Link>
              </li>

              <li>
                <Link
                  href="/produk"
                  className="text-sm text-white/65 transition-colors hover:text-white"
                >
                  Produk
                </Link>
              </li>

              <li>
                <Link
                  href="/umkm"
                  className="text-sm text-white/65 transition-colors hover:text-white"
                >
                  UMKM
                </Link>
              </li>
            </ul>
          </div>

          {/* =====================================================
              KATEGORI
          ====================================================== */}

          <div>
            <h3 className="text-sm font-semibold text-white">
              Kategori
            </h3>

            <ul className="mt-4 space-y-3">
              {kategoris.map((kategori) => (
                <li key={kategori.id}>
                  <Link
                    href={`/produk?kategori=${kategori.id}`}
                    prefetch={false}
                    className="
                      text-sm
                      text-white/65
                      transition-colors
                      hover:text-white
                    "
                  >
                    {kategori.nama}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* =====================================================
              KONTAK
          ====================================================== */}

          <div>
            <h3 className="text-sm font-semibold text-white">
              Hubungi Kami
            </h3>

            <ul className="mt-4 space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-sky-200" />

                <span className="text-sm leading-6 text-white/65">
                  {alamat}
                </span>
              </li>

              <li className="flex items-center gap-3">
                <Phone className="h-4 w-4 shrink-0 text-sky-200" />

                <a
                  href={`https://wa.me/${telepon.replace(/\D/g, "")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="
                    text-sm
                    text-white/65
                    transition-colors
                    hover:text-white
                  "
                >
                  {telepon}
                </a>
              </li>

              <li className="flex items-start gap-3">
                <InstagramIcon className="mt-0.5 h-4 w-4 shrink-0 text-sky-200" />

                <a
                  href={`https://instagram.com/${instagramUsername}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="
                    text-sm
                    text-white/65
                    transition-colors
                    hover:text-white
                  "
                >
                  {instagram}
                </a>
              </li>

              <li className="flex items-start gap-3">
                <Mail className="mt-0.5 h-4 w-4 shrink-0 text-sky-200" />

                <a
                  href={`mailto:${email}`}
                  className="
                    break-all
                    text-sm
                    leading-6
                    text-white/65
                    transition-colors
                    hover:text-white
                  "
                >
                  {email}
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* =========================================================
          COPYRIGHT
      ========================================================== */}

      <div className="border-t border-white/10">
        <div className="mx-auto max-w-7xl px-5 py-5 sm:px-8 lg:px-10">
          <div className="flex flex-col gap-2 text-center sm:flex-row sm:items-center sm:justify-between sm:text-left">
            <p className="text-xs leading-5 text-white/50">
              © {new Date().getFullYear()} {namaWebsite}
            </p>

            <p className="text-xs leading-5 text-white/50">
              Mendukung produk lokal, menguatkan ekonomi masyarakat.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}