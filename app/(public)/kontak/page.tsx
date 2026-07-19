import { websiteSettingService } from "@/features/website-setting/services/website-setting.service";

export default async function KontakPage() {
  const setting = await websiteSettingService.get();

  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="mb-6 text-2xl font-bold text-[#1F2937]">Kontak</h1>

      <div className="flex flex-col gap-4 rounded-lg border border-gray-100 bg-white p-6 shadow-sm">
        {setting?.alamat && (
          <div>
            <p className="text-sm text-gray-500">Alamat</p>
            <p className="text-[#1F2937]">{setting.alamat}</p>
          </div>
        )}

        {setting?.whatsapp && (
          <div>
            <p className="text-sm text-gray-500">WhatsApp</p>
            <a href={`https://wa.me/${setting.whatsapp}`} target="_blank" className="text-[#2E7D32] hover:underline">
              {setting.whatsapp}
            </a>
          </div>
        )}

        {setting?.email && (
          <div>
            <p className="text-sm text-gray-500">Email</p>
            <a href={`mailto:${setting.email}`} className="text-[#2E7D32] hover:underline">
              {setting.email}
            </a>
          </div>
        )}

        {!setting?.alamat && !setting?.whatsapp && !setting?.email && (
          <p className="text-gray-500">
            Informasi kontak belum diatur. Silakan isi di Dashboard → Pengaturan.
          </p>
        )}
      </div>

      {setting?.maps && (
        <div className="mt-6 overflow-hidden rounded-lg border border-gray-100">
          <iframe src={setting.maps} width="100%" height="300" style={{ border: 0 }} loading="lazy" />
        </div>
      )}
    </div>
  );
}