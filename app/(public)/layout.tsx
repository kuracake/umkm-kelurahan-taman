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
          <div className="mx-auto flex max-w-6xl items-center justify-center gap-3 px-4">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-brand text-white">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
                <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38a9.87 9.87 0 004.74 1.21h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0012.04 2zm0 1.67c2.19 0 4.25.85 5.79 2.4a8.2 8.2 0 012.4 5.84c0 4.55-3.7 8.25-8.25 8.25a8.2 8.2 0 01-4.19-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.18 8.18 0 01-1.27-4.39c.01-4.55 3.71-8.24 8.31-8.24z" />
              </svg>
            </div>
            {setting?.whatsapp && (
              <a href={`https://wa.me/${setting.whatsapp}`} target="_blank" className="text-sm font-bold text-gray-800 hover:text-brand">
                {setting.whatsapp}
              </a>
            )}
          </div>
        </div>

        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-2 px-4 py-4 text-xs text-gray-400 sm:flex-row">
          <p>
            Speeding Up Satisfaction, Belanja Jajanan Lebih Mudah! © {new Date().getFullYear()} {namaWebsite}
          </p>
          <Link href="/login" className="hover:text-brand">
            Admin Login
          </Link>
        </div>
      </footer>

      <BottomNav />
    </div>
  );
}