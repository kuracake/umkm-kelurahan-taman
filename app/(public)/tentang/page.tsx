import { websiteSettingService } from "@/features/website-setting/services/website-setting.service";

export default async function TentangPage() {
  const setting = await websiteSettingService.get();

  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="mb-6 text-2xl font-bold text-[#1F2937]">
        Tentang {setting?.namaWebsite ?? "UMKM Kelurahan Taman"}
      </h1>

      {setting?.deskripsi ? (
        <p className="whitespace-pre-line leading-relaxed text-[#1F2937]">
          {setting.deskripsi}
        </p>
      ) : (
        <p className="text-gray-500">
          UMKM Kelurahan Taman adalah katalog digital yang menghubungkan
          pengunjung dengan UMKM warga Kelurahan Taman di sekitar wilayah Taman, Sidoarjo.
          Website ini bukan marketplace, setiap pemesanan dilakukan langsung
          antara pembeli dan pemilik UMKM melalui WhatsApp.
        </p>
      )}
    </div>
  );
}