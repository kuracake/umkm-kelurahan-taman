import Link from "next/link";
import { websiteSettingService } from "@/features/website-setting/services/website-setting.service";
import { Navbar } from "@/components/shared/navbar";
import { BottomNav } from "@/components/shared/bottom-nav";

export default async function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const setting = await websiteSettingService.get();
  const namaWebsite = setting?.namaWebsite ?? "Kampung Jajanan RW 06";

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar namaWebsite={namaWebsite} />

      <main className="flex-1 pb-16 sm:pb-0">{children}</main>

      <footer className="hidden border-t border-gray-100 bg-white sm:block">
        <div className="border-b border-gray-100 bg-brand-light/40 py-6">
        </div>

        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-2 px-4 py-4 text-xs text-gray-400 sm:flex-row">
          <p>
            Speeding Up Satisfaction, Belanja Jajanan Lebih Mudah! © {new Date().getFullYear()} {namaWebsite}
          </p>
        </div>
      </footer>

      <BottomNav />
    </div>
  );
}