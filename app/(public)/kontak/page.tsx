import {
  MapPin,
  Mail,
  MessageCircle,
  ChevronRight,
  Store,
} from "lucide-react";
import { websiteSettingService } from "@/features/website-setting/services/website-setting.service";
import { resolveMapsEmbedUrl } from "@/lib/maps";

export default async function KontakPage() {
  const setting = await websiteSettingService.get();
  const namaWebsite = setting?.namaWebsite ?? "UMKM Kelurahan Taman";

  const hasContact =
    setting?.alamat || setting?.whatsapp || setting?.email;

  const { url: mapsEmbedUrl, error: mapsError } =
    await resolveMapsEmbedUrl(setting?.maps);

  return (
    <div className="mx-auto max-w-2xl px-4 py-10">
      {/* Header */}
      <div className="mb-8 flex items-start gap-4">
        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-brand text-white shadow-md shadow-brand/20">
          <MessageCircle size={26} strokeWidth={2} />
        </div>

        <div>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
            Kontak Kami
          </h1>

          <p className="mt-1.5 text-sm leading-relaxed text-gray-500">
            Hubungi kami untuk informasi lebih lanjut mengenai{" "}
            <span className="font-medium text-brand">
              {namaWebsite}
            </span>
            .
          </p>
        </div>
      </div>

      {/* Card kontak */}
      <div className="overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-[0_4px_24px_-6px_rgba(14,165,233,0.12)]">
        {/* Alamat */}
        {setting?.alamat && (
          <div className="flex items-start gap-4 border-b border-gray-100 p-5">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-brand-light text-brand">
              <MapPin size={19} />
            </div>

            <div>
              <p className="text-[11px] font-medium uppercase tracking-wide text-gray-400">
                Alamat
              </p>

              <p className="mt-1 text-sm font-semibold leading-relaxed text-gray-900">
                {setting.alamat}
              </p>
            </div>
          </div>
        )}

        {/* WhatsApp */}
        {setting?.whatsapp && (
          <a
            href={`https://wa.me/${setting.whatsapp.replace(/\D/g, "")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-4 border-b border-gray-100 p-5 transition-colors duration-200 hover:bg-brand-light/30"
          >
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-brand-light text-brand">
              <MessageCircle size={19} />
            </div>

            <div className="min-w-0 flex-1">
              <p className="text-[11px] font-medium uppercase tracking-wide text-gray-400">
                WhatsApp
              </p>

              <p className="truncate font-semibold text-brand">
                {setting.whatsapp}
              </p>

              <p className="text-xs text-gray-500">
                Chat kami melalui WhatsApp
              </p>
            </div>

            <ChevronRight
              className="shrink-0 text-gray-300"
              size={18}
            />
          </a>
        )}

        {/* Email */}
        {setting?.email && (
          <a
            href={`mailto:${setting.email}`}
            className="flex items-center gap-4 p-5 transition-colors duration-200 hover:bg-brand-light/30"
          >
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-brand-light text-brand">
              <Mail size={19} />
            </div>

            <div className="min-w-0 flex-1">
              <p className="text-[11px] font-medium uppercase tracking-wide text-gray-400">
                Email
              </p>

              <p className="truncate font-semibold text-brand">
                {setting.email}
              </p>

              <p className="text-xs text-gray-500">
                Kirim email kepada kami
              </p>
            </div>

            <ChevronRight
              className="shrink-0 text-gray-300"
              size={18}
            />
          </a>
        )}

        {/* Tidak ada kontak */}
        {!hasContact && (
          <div className="p-10 text-center text-sm text-gray-500">
            Informasi kontak belum tersedia.
          </div>
        )}
      </div>

      {/* Banner ajakan */}
      <div className="mt-6 rounded-3xl bg-brand-light/40 p-5">
        <div className="flex items-center gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-white shadow-sm">
            <Store className="text-brand" size={22} />
          </div>

          <div>
            <p className="font-bold text-brand">
              Dukung UMKM Lokal
            </p>

            <p className="mt-0.5 text-sm leading-relaxed text-gray-600">
              Bersama kita majukan UMKM di lingkungan{" "}
              <span className="font-semibold">
                {namaWebsite}
              </span>
              .
            </p>
          </div>
        </div>
      </div>

      {/* Google Maps */}
      {setting?.maps && (
        <div className="mt-6 overflow-hidden rounded-3xl border border-gray-100 shadow-[0_4px_24px_-6px_rgba(14,165,233,0.12)]">
          {mapsEmbedUrl ? (
            <iframe
              src={mapsEmbedUrl}
              title={`Lokasi ${namaWebsite}`}
              width="100%"
              height="300"
              style={{ border: 0 }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          ) : (
            <div className="flex h-75 flex-col items-center justify-center gap-2 bg-gray-50 p-6 text-center">
              <MapPin
                className="text-gray-300"
                size={28}
              />

              <p className="text-sm text-gray-500">
                {mapsError === "unreachable"
                  ? "Tidak bisa memuat lokasi Maps saat ini. Coba lagi nanti."
                  : "Link Maps belum valid. Pastikan link berasal dari Google Maps."}
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}