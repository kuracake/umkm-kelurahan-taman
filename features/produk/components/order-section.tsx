"use client";

import { useState } from "react";
import type { Produk, Umkm, Kategori } from "@prisma/client";

type ProdukWithRelations = Produk & { umkm: Umkm; kategori: Kategori };

export function OrderSection({ produk }: { produk: ProdukWithRelations }) {
  const [jumlah, setJumlah] = useState(1);

  const total = produk.harga * jumlah;

  const handleOrder = () => {
    const pesan = `Halo, saya mau pesan:\n\n*${produk.namaProduk}*\nJumlah: ${jumlah}\nTotal: Rp${total.toLocaleString("id-ID")}\n\nMohon info ketersediaan dan cara pembayaran. Terima kasih!`;

    const nomorWa = produk.umkm.whatsapp.startsWith("0")
      ? "62" + produk.umkm.whatsapp.slice(1)
      : produk.umkm.whatsapp;

    const url = `https://wa.me/${nomorWa}?text=${encodeURIComponent(pesan)}`;
    window.open(url, "_blank");
  };

  return (
    <div className="mt-6 rounded-lg border border-gray-100 bg-[#F8F9FA] p-4">
      <div className="mb-4 flex items-center gap-4">
        <label className="text-sm font-medium text-[#1F2937]">Jumlah</label>
        <div className="flex items-center rounded-md border border-gray-300">
          <button
            type="button"
            onClick={() => setJumlah((j) => Math.max(1, j - 1))}
            className="px-3 py-1 text-lg text-[#1F2937] hover:bg-gray-100"
          >
            −
          </button>
          <span className="w-10 text-center">{jumlah}</span>
          <button
            type="button"
            onClick={() => setJumlah((j) => j + 1)}
            className="px-3 py-1 text-lg text-[#1F2937] hover:bg-gray-100"
          >
            +
          </button>
        </div>
      </div>

      <div className="mb-4 flex items-center justify-between">
        <span className="text-sm text-gray-600">Total</span>
        <span className="text-xl font-bold text-[#2E7D32]">
          Rp{total.toLocaleString("id-ID")}
        </span>
      </div>

      <button
        onClick={handleOrder}
        className="flex w-full items-center justify-center gap-2 rounded-md bg-[#25D366] py-3 font-medium text-white hover:bg-[#1FBE5A]"
      >
        Pesan via WhatsApp
      </button>
    </div>
  );
}