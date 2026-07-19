import { websiteSettingService } from "@/features/website-setting/services/website-setting.service";
import { WebsiteSettingForm } from "@/features/website-setting/components/website-setting-form";

export default async function PengaturanPage() {
  const setting = await websiteSettingService.get();

  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold text-[#1F2937]">
        Pengaturan Website
      </h1>
      <WebsiteSettingForm setting={setting} />
    </div>
  );
}