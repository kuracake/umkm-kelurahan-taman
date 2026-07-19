import Link from "next/link";
import { websiteSettingService } from "@/features/website-setting/services/website-setting.service";

const navItems = [
  { label: "Beranda", href: "/" },
  { label: "Produk", href: "/produk" },
  { label: "UMKM", href: "/umkm" },
  { label: "Tentang", href: "/tentang" },
  { label: "Kontak", href: "/kontak" },
];

export default async function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const setting = await websiteSettingService.get();
  const namaWebsite = setting?.namaWebsite ?? "Kampung Jajanan RW 06";

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-10 border-b border-gray-100 bg-white">
        <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
          <Link href="/" className="font-(family-name:--font-heading) text-lg font-bold text-[#2E7D32]">
            {namaWebsite}
          </Link>
          <ul className="flex gap-6 text-sm text-[#1F2937]">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="hover:text-[#2E7D32]">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </header>

      <main className="flex-1">{children}</main>

      <footer className="border-t border-gray-100 bg-[#F8F9FA] py-8">
        <div className="mx-auto max-w-6xl px-4 text-center text-sm text-gray-500">
          <p>© {new Date().getFullYear()} {namaWebsite}. Semua hak cipta dilindungi.</p>
          {setting?.whatsapp && (
            <p className="mt-1">WhatsApp: {setting.whatsapp}</p>
          )}
        </div>
      </footer>
    </div>
  );
}