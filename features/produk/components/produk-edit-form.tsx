"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { updateProdukAction } from "../actions/produk.action";
import type { Produk, Umkm, Kategori } from "@prisma/client";
import { CurrencyInput } from "@/components/shared/currency-input";

type ProdukWithRelations = Produk & { umkm: Umkm; kategori: Kategori };

export function ProdukEditForm({
  produk,
  umkms,
  kategoris,
}: {
  produk: ProdukWithRelations;
  umkms: Umkm[];
  kategoris: Kategori[];
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (formData: FormData) => {
    setLoading(true);
    setError("");

    const result = await updateProdukAction(produk.id, formData);

    setLoading(false);

    if (!result.success) {
      setError(result.error ?? "Terjadi kesalahan");
      return;
    }

    router.push("/dashboard/produk");
    router.refresh();
  };

  return (
    <form
      action={handleSubmit}
      className="flex max-w-xl flex-col gap-4 rounded-lg border border-gray-100 bg-white p-6 shadow-sm"
    >
      <div>
        <label className="mb-1 block text-sm font-medium text-[#1F2937]">
          Nama Produk
        </label>
        <input
          name="namaProduk"
          type="text"
          required
          defaultValue={produk.namaProduk}
          className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-brand focus:outline-none"
        />
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium text-[#1F2937]">
          Harga (Rp)
        </label>
        <CurrencyInput name="harga" defaultValue={produk.harga} required />
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium text-[#1F2937]">
          UMKM
        </label>
        <select
          name="umkmId"
          required
          defaultValue={produk.umkmId}
          className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-brand focus:outline-none"
        >
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
          defaultValue={produk.kategoriId}
          className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-brand focus:outline-none"
        >
          {kategoris.map((kategori) => (
            <option key={kategori.id} value={kategori.id}>
              {kategori.nama}
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
          defaultValue={produk.deskripsi ?? ""}
          className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-brand focus:outline-none"
        />
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium text-[#1F2937]">
          Foto Utama Saat Ini
        </label>
        {produk.foto ? (
          <div className="relative mb-2 h-24 w-24 overflow-hidden rounded-md bg-gray-100">
            <Image src={produk.foto} alt={produk.namaProduk} fill className="object-cover" />
          </div>
        ) : (
          <p className="mb-2 text-xs text-gray-400">Belum ada foto</p>
        )}
        <label className="mb-1 block text-sm font-medium text-[#1F2937]">
          Ganti Foto Utama (opsional, kosongkan jika tidak ingin ganti)
        </label>
        <input name="foto" type="file" accept="image/*" className="w-full text-sm" />
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium text-[#1F2937]">
          Foto Tambahan Saat Ini
        </label>
        {produk.fotoTambahan.length > 0 ? (
          <div className="mb-2 grid grid-cols-4 gap-2">
            {produk.fotoTambahan.map((url, i) => (
              <div key={i} className="relative h-16 w-16 overflow-hidden rounded-md bg-gray-100">
                <Image src={url} alt={`Foto tambahan ${i + 1}`} fill className="object-cover" />
              </div>
            ))}
          </div>
        ) : (
          <p className="mb-2 text-xs text-gray-400">Belum ada foto tambahan</p>
        )}
        <label className="mb-1 block text-sm font-medium text-[#1F2937]">
          Ganti Foto Tambahan (opsional, pilih beberapa sekaligus — akan menggantikan semua foto tambahan lama)
        </label>
        <input
          name="fotoTambahan"
          type="file"
          accept="image/*"
          multiple
          className="w-full text-sm"
        />
      </div>

      <label className="flex items-center gap-2 text-sm text-[#1F2937]">
        <input name="bestSeller" type="checkbox" defaultChecked={produk.bestSeller} />
        Tandai sebagai Best Seller
      </label>

      {error && <p className="text-sm text-red-600">{error}</p>}

      <div className="flex gap-3">
        <button
          type="submit"
          disabled={loading}
          className="rounded-md bg-brand px-6 py-2 font-medium text-white hover:bg-brand-dark disabled:opacity-50"
        >
          {loading ? "Menyimpan..." : "Simpan Perubahan"}
        </button>
        <button
          type="button"
          onClick={() => router.push("/dashboard/produk")}
          className="rounded-md border border-gray-300 px-6 py-2 font-medium text-gray-700 hover:bg-gray-50"
        >
          Batal
        </button>
      </div>
    </form>
  );
}