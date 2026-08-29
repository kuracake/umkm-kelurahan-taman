import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import { AdminMobileMenu } from "@/components/shared/admin-mobile-menu";
import { LogoutButton } from "@/components/shared/logout-button";

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
      {/* Header — mobile only */}
      <div className="sticky top-0 z-20 flex items-center justify-between border-b border-gray-100 bg-white/80 px-4 py-3 backdrop-blur-md lg:hidden">
        <AdminMobileMenu />
        <LogoutButton variant="icon" />
      </div>

      {/* Sidebar — desktop only */}
      <aside className="hidden w-64 flex-col border-r border-gray-200 bg-white lg:flex">
        <div className="border-b border-gray-200 p-6">
          <h2 className="text-lg font-bold text-brand">UMKM Taman</h2>
          <p className="text-xs text-gray-500">Admin Panel</p>
        </div>

        <nav className="flex-1 p-4">
          <ul className="flex flex-col gap-1">
            {menuItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="block rounded-md px-4 py-2 text-sm text-[#1F2937] hover:bg-[#F8F9FA] hover:text-brand"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="border-t border-gray-200 p-4">
          <p className="mb-2 truncate text-xs text-gray-500">{session.user?.email}</p>
          <LogoutButton variant="full" />
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-4 pb-8 sm:p-8">{children}</main>
    </div>
  );
}