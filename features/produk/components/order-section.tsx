"use client";

import type { Produk, Umkm, Kategori } from "@prisma/client";

type ProdukWithRelations = Produk & { umkm: Umkm; kategori: Kategori };

export function OrderSection({ produk }: { produk: ProdukWithRelations }) {
  const handleOrder = () => {
    const pesan = `Halo, saya mau menanyakan tentang\n\n${produk.namaProduk}\n\n,Mohon info ketersediaan dan cara pembayaran. Terima kasih!`;

    const nomorWa = produk.umkm.whatsapp.startsWith("0")
      ? "62" + produk.umkm.whatsapp.slice(1)
      : produk.umkm.whatsapp;

    const url = `https://wa.me/${nomorWa}?text=${encodeURIComponent(pesan)}`;
    window.open(url, "_blank");
  };

  return (
    <div className="mt-6">
      <button
        onClick={handleOrder}
        className="flex w-full items-center justify-center gap-2 rounded-md bg-[#25D366] py-3 font-medium text-white hover:bg-[#1FBE5A]"
      >
        Pesan via WhatsApp
      </button>
    </div>
  );
}