"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { createProdukAction } from "../actions/produk.action";
import type { Umkm, Kategori } from "@prisma/client";

export function ProdukForm({
  umkms,
  kategoris,
}: {
  umkms: Umkm[];
  kategoris: Kategori[];
}) {
  const router = useRouter();
  const formRef = useRef<HTMLFormElement>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (formData: FormData) => {
    setLoading(true);
    setError("");

    const result = await createProdukAction(formData);

    setLoading(false);

    if (!result.success) {
      setError(result.error ?? "Terjadi kesalahan");
      return;
    }

    formRef.current?.reset();
    router.refresh();
  };

  return (
    <form
      ref={formRef}
      action={handleSubmit}
      className="flex flex-col gap-4 rounded-lg border border-gray-100 bg-white p-6 shadow-sm"
    >
      <h2 className="font-semibold text-[#1F2937]">Tambah Produk</h2>

      <div>
        <label className="mb-1 block text-sm font-medium text-[#1F2937]">
          Nama Produk
        </label>
        <input
          name="namaProduk"
          type="text"
          required
          placeholder="Contoh: Lemper Ayam"
          className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-[#2E7D32] focus:outline-none"
        />
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium text-[#1F2937]">
          Harga (Rp)
        </label>
        <input
          name="harga"
          type="number"
          required
          min="0"
          placeholder="5000"
          className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-[#2E7D32] focus:outline-none"
        />
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium text-[#1F2937]">
          UMKM
        </label>
        <select
          name="umkmId"
          required
          className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-[#2E7D32] focus:outline-none"
        >
          <option value="">Pilih UMKM</option>
          {umkms.map((umkm) => (
            <option key={umkm.id} value={umkm.id}>
              {umkm.namaUmkm}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium text-[#1F2937]">
          Kategori
        </label>
        <select
          name="kategoriId"
          required
          className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-[#2E7D32] focus:outline-none"
        >
          <option value="">Pilih Kategori</option>
          {kategoris.map((kategori) => (
            <option key={kategori.id} value={kategori.id}>
              {kategori.icon ? `${kategori.icon} ${kategori.nama}` : kategori.nama}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium text-[#1F2937]">
          Deskripsi (opsional)
        </label>
        <textarea
          name="deskripsi"
          rows={2}
          className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-[#2E7D32] focus:outline-none"
        />
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium text-[#1F2937]">
          Foto Produk
        </label>
        <input name="foto" type="file" accept="image/*" className="w-full text-sm" />
      </div>

      <label className="flex items-center gap-2 text-sm text-[#1F2937]">
        <input name="bestSeller" type="checkbox" />
        Tandai sebagai Best Seller
      </label>

      {error && <p className="text-sm text-red-600">{error}</p>}

      <button
        type="submit"
        disabled={loading}
        className="rounded-md bg-[#2E7D32] py-2 font-medium text-white hover:bg-[#256428] disabled:opacity-50"
      >
        {loading ? "Menyimpan..." : "Tambah Produk"}
      </button>
    </form>
  );
}