import { auth, signOut } from "@/lib/auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import { BottomNav } from "@/components/shared/bottom-nav";
import { AdminMobileMenu } from "@/components/shared/admin-mobile-menu";
import { LogOut } from "lucide-react";

const menuItems = [
  { label: "Dashboard", href: "/dashboard" },
  { label: "UMKM", href: "/dashboard/umkm" },
  { label: "Produk", href: "/dashboard/produk" },
  { label: "Kategori", href: "/dashboard/kategori" },
  { label: "Banner", href: "/dashboard/banner" },
  { label: "Pengaturan", href: "/dashboard/pengaturan" },
];

  export default async function DashboardLayout({
    children,
  }: {
    children: React.ReactNode;
  }) {
    const session = await auth();

    if (!session) {
      redirect("/login");
    }

  return (
    <div className="flex min-h-screen flex-col bg-[#F8F9FA] lg:flex-row">
      {/* Header — mobile only, samakan gaya dengan Navbar publik */}
      <div className="sticky top-0 z-20 flex items-center justify-between gap-3 border-b border-gray-100 bg-white/95 px-4 py-3 backdrop-blur-sm lg:hidden">
        <div className="flex items-center gap-3">
          <AdminMobileMenu />
        </div>
        <form
          action={async () => {
            "use server";
            await signOut({ redirectTo: "/login" });
          }}
        >
          <button
            type="submit"
            className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-100 text-gray-500 hover:bg-gray-200"
            aria-label="Logout"
          >
            <LogOut size={16} />
          </button>
        </form>
      </div>

      {/* Sidebar — desktop only */}
      <aside className="hidden w-64 flex-col border-r border-gray-200 bg-white lg:flex">
        <div className="border-b border-gray-200 p-6">
          <h2 className="text-lg font-bold text-[#2E7D32]">Kampung Jajanan</h2>
          <p className="text-xs text-gray-500">Admin Panel</p>
        </div>

        <nav className="flex-1 p-4">
          <ul className="flex flex-col gap-1">
            {menuItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="block rounded-md px-4 py-2 text-sm text-[#1F2937] hover:bg-[#F8F9FA] hover:text-[#2E7D32]"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="border-t border-gray-200 p-4">
          <p className="mb-2 text-xs text-gray-500">Masuk sebagai {session.user?.email}</p>
          <form
            action={async () => {
              "use server";
              await signOut({ redirectTo: "/login" });
            }}
          >
            <button
              type="submit"
              className="w-full rounded-md border border-gray-300 py-2 text-sm text-[#1F2937] hover:bg-gray-50"
            >
              Logout
            </button>
          </form>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-4 pb-20 sm:p-8 lg:pb-8">{children}</main>

      <BottomNav />
    </div>
  );
}