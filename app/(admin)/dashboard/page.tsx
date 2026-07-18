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