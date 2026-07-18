"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { deleteUmkmAction, toggleUmkmActiveAction } from "../actions/umkm.action";
import type { Umkm } from "@prisma/client";

export function UmkmList({ umkms }: { umkms: Umkm[] }) {
  const router = useRouter();

  const handleDelete = async (id: string) => {
    if (!confirm("Yakin hapus UMKM ini? Semua produknya juga akan terhapus.")) return;
    await deleteUmkmAction(id);
    router.refresh();
  };

  const handleToggle = async (id: string, current: boolean) => {
    await toggleUmkmActiveAction(id, !current);
    router.refresh();
  };

  if (umkms.length === 0) {
    return (
      <div className="rounded-lg border border-gray-100 bg-white p-6 text-center text-gray-500 shadow-sm">
        Belum ada UMKM. Tambahkan lewat form di samping.
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3">
      {umkms.map((umkm) => (
        <div
          key={umkm.id}
          className="flex items-center gap-4 rounded-lg border border-gray-100 bg-white p-4 shadow-sm"
        >
          <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-md bg-gray-100">
            {umkm.foto ? (
              <Image
                src={umkm.foto}
                alt={umkm.namaUmkm}
                fill
                className="object-cover"
              />
            ) : (
              <div className="flex h-full items-center justify-center text-xs text-gray-400">
                No Foto
              </div>
            )}
          </div>

          <div className="flex-1">
            <p className="font-medium text-[#1F2937]">{umkm.namaUmkm}</p>
            <p className="text-sm text-gray-500">{umkm.namaPemilik}</p>
            <p className="text-sm text-gray-500">{umkm.whatsapp}</p>
          </div>

          <div className="flex flex-col items-end gap-2">
            <button
              onClick={() => handleToggle(umkm.id, umkm.isActive)}
              className={`rounded-full px-3 py-1 text-xs font-medium ${
                umkm.isActive
                  ? "bg-green-100 text-green-700"
                  : "bg-gray-100 text-gray-500"
              }`}
            >
              {umkm.isActive ? "Aktif" : "Nonaktif"}
            </button>
            <button
              onClick={() => handleDelete(umkm.id)}
              className="text-sm text-red-600 hover:underline"
            >
              Hapus
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}