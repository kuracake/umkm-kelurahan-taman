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

  const hasContact = setting?.alamat || setting?.whatsapp || setting?.email;

  const { url: mapsEmbedUrl, error: mapsError } = await resolveMapsEmbedUrl(setting?.maps);

  return (
    <div className="mx-auto max-w-2xl px-4 py-10">
      {hasContact ? (
        <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
          {/* WhatsApp */}
          {setting?.whatsapp && (
            
            <a
              href={`https://wa.me/${setting.whatsapp.replace(/\D/g, "")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-4 border-b border-gray-100 p-5 transition-colors duration-200 hover:bg-brand-light/20"
            >
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-brand-light text-brand">
                <MessageCircle size={19} />
              </div>

              <div className="min-w-0 flex-1">
                <p className="text-[11px] font-medium uppercase tracking-wide text-gray-400">
                  WhatsApp
                </p>
                <p className="mt-1 truncate text-sm font-semibold text-gray-900">
                  {setting.whatsapp}
                </p>
                <p className="text-xs text-gray-500">Respon lebih cepat lewat WhatsApp</p>
              </div>

              <ChevronRight
                size={18}
                className="shrink-0 text-gray-300 transition-transform duration-200 group-hover:translate-x-0.5"
              />
            </a>
          )}

          {/* Alamat */}
          {setting?.alamat && (
            <div className="flex items-start gap-4 border-b border-gray-100 p-5">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-brand-light text-brand">
                <MapPin size={19} />
              </div>

              <div className="min-w-0 flex-1 pt-0.5">
                <p className="text-[11px] font-medium uppercase tracking-wide text-gray-400">
                  Alamat
                </p>
                <p className="mt-1 text-sm font-semibold leading-relaxed text-gray-900">
                  {setting.alamat}
                </p>
              </div>
            </div>
          )}

          {/* Email */}
          {setting?.email && (
            
            <a
              href={`mailto:${setting.email}`}
              className="group flex items-center gap-4 border-b border-gray-100 p-5 transition-colors duration-200 hover:bg-brand-light/20"
            >
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-brand-light text-brand">
                <Mail size={19} />
              </div>

              <div className="min-w-0 flex-1">
                <p className="text-[11px] font-medium uppercase tracking-wide text-gray-400">
                  Email
                </p>
                <p className="mt-1 truncate text-sm font-semibold text-gray-900">
                  {setting.email}
                </p>
              </div>

              <ChevronRight
                size={18}
                className="shrink-0 text-gray-300 transition-transform duration-200 group-hover:translate-x-0.5"
              />
            </a>
          )}

          {/* Dukung UMKM Lokal */}
          <div className="flex items-center gap-4 p-5">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-brand-light text-brand">
              <Store size={19} />
            </div>

            <div className="min-w-0 flex-1">
              <p className="text-[11px] font-medium uppercase tracking-wide text-gray-400">
                Dukung UMKM Lokal
              </p>
              <p className="mt-1 text-sm leading-relaxed text-gray-600">
                Bersama kita majukan UMKM di lingkungan{" "}
                <span className="font-semibold text-gray-900">{namaWebsite}</span>.
              </p>
            </div>
          </div>
        </div>
      ) : (
        <div className="rounded-2xl border border-gray-100 bg-white p-10 text-center text-sm text-gray-500 shadow-sm">
          Informasi kontak belum tersedia.
        </div>
      )}

      {/* Google Maps */}
      {setting?.maps && (
        <div className="mt-4 overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
          {mapsEmbedUrl ? (
            <iframe
              src={mapsEmbedUrl}
              title={`Lokasi ${namaWebsite}`}
              width="100%"
              height="280"
              style={{ border: 0, display: "block" }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          ) : (
            <div className="flex h-72 flex-col items-center justify-center gap-2 bg-gray-50 p-6 text-center">
              <MapPin className="text-gray-300" size={28} />
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