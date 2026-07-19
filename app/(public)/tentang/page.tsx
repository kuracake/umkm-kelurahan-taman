import { websiteSettingService } from "@/features/website-setting/services/website-setting.service";

export default async function TentangPage() {
  const setting = await websiteSettingService.get();

  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="mb-6 text-2xl font-bold text-[#1F2937]">
        Tentang {setting?.namaWebsite ?? "Kampung Jajanan RW 06"}
      </h1>

      {setting?.deskripsi ? (
        <p className="whitespace-pre-line leading-relaxed text-[#1F2937]">
          {setting.deskripsi}
        </p>
      ) : (
        <p className="text-gray-500">
          Kampung Jajanan RW 06 Wonorejo adalah katalog digital yang menghubungkan
          pengunjung dengan UMKM jajanan tradisional di sekitar wilayah RW 06.
          Website ini bukan marketplace — setiap pemesanan dilakukan langsung
          antara pembeli dan pemilik UMKM melalui WhatsApp.
        </p>
      )}
    </div>
  );
}