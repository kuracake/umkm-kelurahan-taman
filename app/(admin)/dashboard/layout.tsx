import { auth, signOut } from "@/lib/auth";
import { redirect } from "next/navigation";
import Link from "next/link";

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
    <div className="flex min-h-screen bg-[#F8F9FA]">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-200 flex flex-col">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-lg font-bold text-[#2E7D32]">
            Kampung Jajanan
          </h2>
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

        <div className="p-4 border-t border-gray-200">
          <p className="mb-2 text-xs text-gray-500">
            Masuk sebagai {session.user?.email}
          </p>
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
      <main className="flex-1 p-8">{children}</main>
    </div>
  );
}