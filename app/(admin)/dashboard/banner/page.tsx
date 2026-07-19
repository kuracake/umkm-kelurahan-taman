import { bannerService } from "@/features/banner/services/banner.service";
import { BannerForm } from "@/features/banner/components/banner-form";
import { BannerList } from "@/features/banner/components/banner-list";

export default async function BannerPage() {
  const banners = await bannerService.getAll();

  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold text-[#1F2937]">Kelola Banner</h1>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-1">
          <BannerForm />
        </div>
        <div className="lg:col-span-2">
          <BannerList banners={banners} />
        </div>
      </div>
    </div>
  );
}