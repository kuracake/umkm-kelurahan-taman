import type { Kategori } from "@prisma/client";

export function KategoriList({ kategoris }: { kategoris: Kategori[] }) {
  if (kategoris.length === 0) {
    return (
      <div className="rounded-lg border border-gray-100 bg-white p-6 text-center text-gray-500 shadow-sm">
        Belum ada kategori. Jalankan seed terlebih dahulu.
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-lg border border-gray-100 bg-white shadow-sm">
      <table className="w-full text-left text-sm">
        <thead className="bg-[#F8F9FA] text-[#1F2937]">
          <tr>
            <th className="px-4 py-3">Ikon</th>
            <th className="px-4 py-3">Nama</th>
          </tr>
        </thead>
        <tbody>
          {kategoris.map((kategori) => (
            <tr key={kategori.id} className="border-t border-gray-100">
              <td className="px-4 py-3 text-xl">{kategori.icon}</td>
              <td className="px-4 py-3 text-[#1F2937]">{kategori.nama}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}