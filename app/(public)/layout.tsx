import { websiteSettingService } from "@/features/website-setting/services/website-setting.service";
import { kategoriService } from "@/features/kategori/services/kategori.service";
import { Navbar } from "@/components/shared/navbar";
import { BottomNav } from "@/components/shared/bottom-nav";
import { Footer } from "@/components/shared/footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "UMKM Kelurahan Taman",
  description: "Platform untuk mengenal dan menemukan produk UMKM lokal Kelurahan Taman.",
  icons: {
    icon: "/logo.png",
  },
};

export default async function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [setting, kategoris] = await Promise.all([
    websiteSettingService.get(),
    kategoriService.getAll(),
  ]);

  const namaWebsite = setting?.namaWebsite ?? "UMKM Kelurahan Taman";

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar namaWebsite={namaWebsite} />

      <main className="flex-1 pb-16 sm:pb-0">{children}</main>

      <Footer
        namaWebsite={namaWebsite}
        kategoris={kategoris}
        alamat={setting?.alamat ?? undefined}
        telepon={setting?.whatsapp ?? undefined}
        email={setting?.email ?? undefined}
      />

      <BottomNav />
    </div>
  );
}