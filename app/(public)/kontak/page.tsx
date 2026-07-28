import Link from "next/link";
import { MapPin, Mail, ChevronRight, Store, Heart } from "lucide-react";
import { websiteSettingService } from "@/features/website-setting/services/website-setting.service";

export default async function KontakPage() {
  const setting = await websiteSettingService.get();
  const namaWebsite =
    setting?.namaWebsite ?? "Kampung Jajanan RW 06 Wonorejo";

  return (
    <div className="mx-auto max-w-2xl px-4 py-8">
      {/* Header */}
      <div className="mb-8 flex items-start gap-4">
        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-brand text-white shadow-md">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="h-7 w-7"
          >
            <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38a9.87 9.87 0 004.74 1.21h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0012.04 2zm0 1.67c2.19 0 4.25.85 5.79 2.4a8.2 8.2 0 012.4 5.84c0 4.55-3.7 8.25-8.25 8.25a8.2 8.2 0 01-4.19-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.18 8.18 0 01-1.27-4.39c.01-4.55 3.71-8.24 8.31-8.24z" />
          </svg>
        </div>

        <div>
          <h1 className="text-3xl font-bold text-gray-900">Kontak Kami</h1>

          <p className="mt-2 text-sm leading-relaxed text-gray-500">
            Hubungi kami untuk informasi lebih lanjut mengenai{" "}
            <span className="font-medium text-brand">{namaWebsite}</span>.
          </p>
        </div>
      </div>

      {/* Card */}
      <div className="overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-xl">

        {/* Alamat */}
        {setting?.alamat && (
          <div className="flex gap-4 border-b border-gray-100 p-5">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-brand-light/60 text-brand">
              <MapPin size={20} />
            </div>

            <div>
              <p className="text-xs uppercase tracking-wide text-gray-400">
                Alamat
              </p>

              <p className="mt-1 font-semibold text-gray-900">
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
            className="flex items-center gap-4 border-b border-gray-100 p-5 transition-all duration-200 hover:bg-brand-light/20"
          >
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-brand-light/60 text-brand">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="h-5 w-5"
              >
                <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38a9.87 9.87 0 004.74 1.21h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0012.04 2zm0 1.67c2.19 0 4.25.85 5.79 2.4a8.2 8.2 0 012.4 5.84c0 4.55-3.7 8.25-8.25 8.25a8.2 8.2 0 01-4.19-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.18 8.18 0 01-1.27-4.39c.01-4.55 3.71-8.24 8.31-8.24z" />
              </svg>
            </div>

            <div className="flex-1">
              <p className="text-xs uppercase tracking-wide text-gray-400">
                WhatsApp
              </p>

              <p className="font-bold text-brand">{setting.whatsapp}</p>

              <p className="text-sm text-gray-500">
                Chat kami melalui WhatsApp
              </p>
            </div>

            <ChevronRight className="text-gray-300" size={20} />
          </a>
        )}

        {/* Email */}
        {setting?.email && (
          <a
            href={`mailto:${setting.email}`}
            className="flex items-center gap-4 p-5 transition-all duration-200 hover:bg-brand-light/20"
          >
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-brand-light/60 text-brand">
              <Mail size={20} />
            </div>

            <div className="flex-1">
              <p className="text-xs uppercase tracking-wide text-gray-400">
                Email
              </p>

              <p className="font-bold text-brand">{setting.email}</p>

              <p className="text-sm text-gray-500">
                Kirim email kepada kami
              </p>
            </div>

            <ChevronRight className="text-gray-300" size={20} />
          </a>
        )}

        {!setting?.alamat &&
          !setting?.whatsapp &&
          !setting?.email && (
            <div className="p-8 text-center text-gray-500">
              Informasi kontak belum tersedia.
            </div>
          )}
      </div>

      {/* Banner */}
      <div className="mt-6 rounded-3xl bg-linear-to-r from-brand-light/40 to-brand-light/20 p-5">
        <div className="flex items-center gap-4">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white shadow">
            <Store className="text-brand" size={24} />
          </div>

          <div>
            <div className="flex items-center gap-2">
              <p className="font-bold text-brand">
                Dukung UMKM Lokal
              </p>
            </div>

            <p className="mt-1 text-sm text-gray-600">
              Bersama kita majukan UMKM di lingkungan{" "}
              <span className="font-semibold">{namaWebsite}</span>.
            </p>
          </div>
        </div>
      </div>

      {/* Google Maps */}
      {setting?.maps && (
        <div className="mt-6 overflow-hidden rounded-3xl border border-gray-100 shadow-lg">
          <iframe
            src={setting.maps}
            width="100%"
            height="320"
            style={{ border: 0 }}
            loading="lazy"
          />
        </div>
      )}
    </div>
  );
}