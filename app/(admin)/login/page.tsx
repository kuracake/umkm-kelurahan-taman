import { websiteSettingService } from "@/features/website-setting/services/website-setting.service";
import { Navbar } from "@/components/shared/navbar";
import { BottomNav } from "@/components/shared/bottom-nav";
import { LoginForm } from "./login-form";

export default async function LoginPage() {
  const setting = await websiteSettingService.get();
  const namaWebsite = setting?.namaWebsite ?? "UMKM Kelurahan Taman";

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar namaWebsite={namaWebsite} />

      <main className="flex-1 pb-20 sm:pb-0">
        <div className="mx-auto max-w-sm px-4 py-10 sm:py-16">
          <LoginForm />
        </div>
      </main>

      <BottomNav />
    </div>
  );
}