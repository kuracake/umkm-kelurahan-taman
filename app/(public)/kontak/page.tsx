import {
  MapPin,
  Mail,
  ChevronRight,
  Store,
} from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";

import { websiteSettingService } from "@/features/website-setting/services/website-setting.service";
import { resolveMapsEmbedUrl } from "@/lib/maps";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Kontak UMKM Kelurahan Taman",
  description:
    "Hubungi UMKM Kelurahan Taman melalui WhatsApp, email, atau kunjungi lokasi yang tersedia di Google Maps.",
  alternates: {
    canonical: "/kontak",
  },
};

export default async function KontakPage() {
  const setting = await websiteSettingService.get();

  const namaWebsite =
    setting?.namaWebsite ?? "UMKM Kelurahan Taman";

  const hasContact =
    setting?.alamat ||
    setting?.whatsapp ||
    setting?.email;

  const {
    url: mapsEmbedUrl,
    error: mapsError,
  } = await resolveMapsEmbedUrl(setting?.maps);

  return (
    <main className="min-h-screen bg-[#fffdf8]">
      <div className="mx-auto max-w-2xl px-4 py-6 sm:px-6 sm:py-10">
        {/* =====================================================
            CONTACT INFORMATION
        ====================================================== */}

        {hasContact ? (
          <div className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-[0_8px_25px_-18px_rgba(15,23,42,0.3)]">
            {/* =================================================
                WHATSAPP
            ================================================== */}

            {setting?.whatsapp && (
              <a
                href={`https://wa.me/${setting.whatsapp.replace(/\D/g, "")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="
                  group
                  flex
                  items-center
                  gap-3.5
                  border-b
                  border-slate-100
                  px-4
                  py-4
                  transition-colors
                  duration-200
                  hover:bg-sky-50/50
                  sm:px-5
                "
              >
                {/* Icon */}

                <div
                  className="
                    flex
                    h-11
                    w-11
                    shrink-0
                    items-center
                    justify-center
                    rounded-full
                    bg-emerald-50
                    text-emerald-500
                  "
                >
                  <FaWhatsapp className="h-5 w-5" />
                </div>

                {/* Content */}

                <div className="min-w-0 flex-1">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.08em] text-slate-400">
                    WhatsApp
                  </p>

                  <p className="mt-0.5 truncate text-sm font-semibold text-slate-900">
                    {setting.whatsapp}
                  </p>

                  <p className="mt-0.5 text-[11px] leading-5 text-slate-500 sm:text-xs">
                    Respon lebih cepat lewat WhatsApp
                  </p>
                </div>

                <ChevronRight
                  className="
                    h-4
                    w-4
                    shrink-0
                    text-slate-300
                    transition-transform
                    duration-200
                    group-hover:translate-x-0.5
                    group-hover:text-brand
                  "
                />
              </a>
            )}

            {/* =================================================
                ALAMAT
            ================================================== */}

            {setting?.alamat && (
              <div
                className="
                  flex
                  items-center
                  gap-3.5
                  border-b
                  border-slate-100
                  px-4
                  py-4
                  sm:px-5
                "
              >
                <div
                  className="
                    flex
                    h-11
                    w-11
                    shrink-0
                    items-center
                    justify-center
                    rounded-full
                    bg-sky-50
                    text-brand
                  "
                >
                  <MapPin className="h-5 w-5" />
                </div>

                <div className="min-w-0 flex-1">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.08em] text-slate-400">
                    Alamat
                  </p>

                  <p className="mt-0.5 text-sm font-semibold leading-6 text-slate-900">
                    {setting.alamat}
                  </p>
                </div>
              </div>
            )}

            {/* =================================================
                EMAIL
            ================================================== */}

            {setting?.email && (
              <a
                href={`mailto:${setting.email}`}
                className="
                  group
                  flex
                  items-center
                  gap-3.5
                  border-b
                  border-slate-100
                  px-4
                  py-4
                  transition-colors
                  duration-200
                  hover:bg-sky-50/50
                  sm:px-5
                "
              >
                <div
                  className="
                    flex
                    h-11
                    w-11
                    shrink-0
                    items-center
                    justify-center
                    rounded-full
                    bg-sky-50
                    text-brand
                  "
                >
                  <Mail className="h-5 w-5" />
                </div>

                <div className="min-w-0 flex-1">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.08em] text-slate-400">
                    Email
                  </p>

                  <p className="mt-0.5 truncate text-sm font-semibold text-slate-900">
                    {setting.email}
                  </p>
                </div>

                <ChevronRight
                  className="
                    h-4
                    w-4
                    shrink-0
                    text-slate-300
                    transition-transform
                    duration-200
                    group-hover:translate-x-0.5
                    group-hover:text-brand
                  "
                />
              </a>
            )}

            {/* =================================================
                SUPPORT UMKM
            ================================================== */}

            <div className="flex items-center gap-3.5 px-4 py-4 sm:px-5">
              <div
                className="
                  flex
                  h-11
                  w-11
                  shrink-0
                  items-center
                  justify-center
                  rounded-full
                  bg-amber-50
                  text-amber-500
                "
              >
                <Store className="h-5 w-5" />
              </div>

              <div className="min-w-0 flex-1">
                <p className="text-[10px] font-semibold uppercase tracking-[0.08em] text-slate-400">
                  Dukung UMKM Lokal
                </p>

                <p className="mt-0.5 text-sm leading-6 text-slate-600">
                  Bersama kita majukan UMKM di lingkungan{" "}
                  <span className="font-semibold text-slate-900">
                    {namaWebsite}
                  </span>
                  .
                </p>
              </div>
            </div>
          </div>
        ) : (
          <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center text-sm text-slate-500 shadow-sm">
            Informasi kontak belum tersedia.
          </div>
        )}

        {/* =====================================================
            GOOGLE MAPS
        ====================================================== */}

        {setting?.maps && (
          <div className="mt-4 overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-[0_8px_25px_-18px_rgba(15,23,42,0.3)]">
            {mapsEmbedUrl ? (
              <iframe
                src={mapsEmbedUrl}
                title={`Lokasi ${namaWebsite}`}
                width="100%"
                height="280"
                style={{
                  border: 0,
                  display: "block",
                }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
            ) : (
              <div className="flex h-72 flex-col items-center justify-center gap-3 bg-slate-50 p-6 text-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-100">
                  <MapPin className="h-5 w-5 text-slate-400" />
                </div>

                <p className="max-w-sm text-sm leading-6 text-slate-500">
                  {mapsError === "unreachable"
                    ? "Tidak bisa memuat lokasi Maps saat ini. Coba lagi nanti."
                    : "Link Maps belum valid. Pastikan link berasal dari Google Maps."}
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </main>
  );
}