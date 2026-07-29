import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { prisma } from "@/lib/prisma";

export default async function DashboardPage() {
  const [totalUmkm, totalProduk, totalKategori] = await Promise.all([
    prisma.umkm.count(),
    prisma.produk.count(),
    prisma.kategori.count(),
  ]);

  const stats = [
    { label: "Total UMKM", value: totalUmkm },
    { label: "Total Produk", value: totalProduk },
    { label: "Total Kategori", value: totalKategori },
  ];

  return (
    <div>
      <Link
        href="/"
        className="mb-4 inline-flex items-center gap-1.5 text-sm font-medium text-gray-500 transition hover:text-brand"
      >
        <ArrowLeft size={16} />
        Kembali ke Beranda
      </Link>

      <h1 className="mb-6 text-2xl font-bold text-[#1F2937]">Dashboard</h1>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="rounded-lg bg-white p-6 shadow-sm border border-gray-100"
          >
            <p className="text-sm text-gray-500">{stat.label}</p>
            <p className="mt-2 text-3xl font-bold text-[#2E7D32]">
              {stat.value}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}