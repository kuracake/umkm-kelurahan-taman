"use client";

import { useRouter } from "next/navigation";
import { deleteKategoriAction } from "../actions/kategori.action";
import type { Kategori } from "@prisma/client";

export function KategoriList({ kategoris }: { kategoris: Kategori[] }) {
  const router = useRouter();

  const handleDelete = async (id: string) => {
    if (!confirm("Yakin hapus kategori ini?")) return;
    await deleteKategoriAction(id);
    router.refresh();
  };

  if (kategoris.length === 0) {
    return (
      <div className="rounded-lg border border-gray-100 bg-white p-6 text-center text-gray-500 shadow-sm">
        Belum ada kategori. Tambahkan lewat form di samping.
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-lg border border-gray-100 bg-white shadow-sm">
      <table className="w-full text-left text-sm">
        <thead className="bg-[#F8F9FA] text-[#1F2937]">
          <tr>
            <th className="px-4 py-3">Nama</th>
            <th className="px-4 py-3 text-right">Aksi</th>
          </tr>
        </thead>
        <tbody>
          {kategoris.map((kategori) => (
            <tr key={kategori.id} className="border-t border-gray-100">
              <td className="px-4 py-3 text-[#1F2937]">{kategori.nama}</td>
              <td className="px-4 py-3 text-right">
                <button
                  onClick={() => handleDelete(kategori.id)}
                  className="text-red-600 hover:underline"
                >
                  Hapus
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}