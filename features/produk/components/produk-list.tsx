"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { deleteProdukAction, toggleProdukActiveAction } from "../actions/produk.action";
import type { Produk, Umkm, Kategori } from "@prisma/client";
import Link from "next/link";

type ProdukWithRelations = Produk & { umkm: Umkm; kategori: Kategori };

export function ProdukList({ produks }: { produks: ProdukWithRelations[] }) {
  const router = useRouter();

  const handleDelete = async (id: string) => {
    if (!confirm("Yakin hapus produk ini?")) return;
    await deleteProdukAction(id);
    router.refresh();
  };

  const handleToggle = async (id: string, current: boolean) => {
    await toggleProdukActiveAction(id, !current);
    router.refresh();
  };

  if (produks.length === 0) {
    return (
      <div className="rounded-lg border border-gray-100 bg-white p-6 text-center text-gray-500 shadow-sm">
        Belum ada produk. Tambahkan lewat form di samping.
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3">
      {produks.map((produk) => (
        <div
          key={produk.id}
          className="flex items-center gap-4 rounded-lg border border-gray-100 bg-white p-4 shadow-sm"
        >
          <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-md bg-gray-100">
            {produk.foto ? (
              <Image src={produk.foto} alt={produk.namaProduk} fill className="object-cover" />
            ) : (
              <div className="flex h-full items-center justify-center text-xs text-gray-400">
                No Foto
              </div>
            )}
          </div>

          <div className="flex-1">
            <div className="flex items-center gap-2">
              <p className="font-medium text-[#1F2937]">{produk.namaProduk}</p>
              {produk.bestSeller && (
                <span className="rounded-full bg-yellow-100 px-2 py-0.5 text-xs text-yellow-700">
                  Best Seller
                </span>
              )}
            </div>
            <p className="text-sm text-gray-500">
              {produk.umkm.namaUmkm} · {produk.kategori.nama}
            </p>
            <p className="text-sm font-medium text-brand">
              Rp{produk.harga.toLocaleString("id-ID")}
            </p>
          </div>

          <div className="flex flex-col items-end gap-2">
            <button
              onClick={() => handleToggle(produk.id, produk.isActive)}
              className={`rounded-full px-3 py-1 text-xs font-medium ${
                produk.isActive
                  ? "bg-brand-light text-brand"
                  : "bg-gray-100 text-gray-500"
              }`}
            >
              {produk.isActive ? "Aktif" : "Nonaktif"}
            </button>
            <div className="flex gap-3">
              <Link
                href={`/dashboard/produk/${produk.id}/edit`}
                className="text-sm text-brand hover:underline"
              >
                Edit
              </Link>
              <button
                onClick={() => handleDelete(produk.id)}
                className="text-sm text-red-600 hover:underline"
              >
                Hapus
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}