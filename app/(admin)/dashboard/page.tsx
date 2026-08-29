import Link from "next/link";
import { Store, Package, Tags, Image as ImageIcon, Plus, ArrowUpRight } from "lucide-react";
import { prisma } from "@/lib/prisma";

export default async function DashboardPage() {
  const [totalUmkm, totalProduk, totalKategori, totalBanner] = await Promise.all([
    prisma.umkm.count(),
    prisma.produk.count(),
    prisma.kategori.count(),
    prisma.banner.count(),
  ]);

  const stats = [
    { label: "UMKM", value: totalUmkm, icon: Store, href: "/dashboard/umkm" },
    { label: "Produk", value: totalProduk, icon: Package, href: "/dashboard/produk" },
    { label: "Kategori", value: totalKategori, icon: Tags, href: "/dashboard/kategori" },
    { label: "Banner", value: totalBanner, icon: ImageIcon, href: "/dashboard/banner" },
  ];

  const quickActions = [
    { label: "UMKM", href: "/dashboard/umkm" },
    { label: "Produk", href: "/dashboard/produk" },
    { label: "Banner", href: "/dashboard/banner" },
  ];

  return (
    <div>
      <h1 className="mb-1 text-center text-2xl font-bold text-[#1F2937] sm:text-2xl">Dashboard</h1>
      <p className="mb-6 text-center text-sm text-gray-500">Ringkasan data website kamu</p>

      <div className="overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm">
        {stats.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <Link
              key={stat.label}
              href={stat.href}
              className={`group flex items-center justify-between px-5 py-4 transition-colors hover:bg-[#F8F9FA] ${
                i !== stats.length - 1 ? "border-b border-gray-100" : ""
              }`}
            >
              <div className="flex items-center gap-3">
                <Icon size={17} className="text-gray-400" strokeWidth={1.8} />
                <span className="text-sm font-medium text-gray-600">{stat.label}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-lg font-bold text-[#1F2937]">{stat.value}</span>
                <ArrowUpRight
                  size={15}
                  className="text-gray-300 transition-colors group-hover:text-brand"
                />
              </div>
            </Link>
          );
        })}
      </div>

      <div className="mt-6 flex gap-2">
        {quickActions.map((action) => (
          <Link
            key={action.href}
            href={action.href}
            className="flex flex-1 items-center justify-center gap-1.5 rounded-lg border border-gray-200 bg-white py-2.5 text-xs font-medium text-gray-600 transition-colors hover:border-brand/40 hover:text-brand sm:text-sm"
          >
            <Plus size={14} />
            {action.label}
          </Link>
        ))}
      </div>
    </div>
  );
}