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

      <footer className="hidden border-t border-gray-100 bg-[#F8F9FA] py-8 sm:block">
        <div className="mx-auto max-w-6xl px-4 text-center text-sm text-gray-500">
          <p>© {new Date().getFullYear()} {namaWebsite}. Semua hak cipta dilindungi.</p>
          {setting?.whatsapp && <p className="mt-1">WhatsApp: {setting.whatsapp}</p>}
        </div>
      </footer>

      <BottomNav />
    </div>
  );
}