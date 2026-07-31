"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { updateUmkmAction } from "../actions/umkm.action";
import type { Umkm } from "@prisma/client";

export function UmkmEditForm({ umkm }: { umkm: Umkm }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (formData: FormData) => {
    setLoading(true);
    setError("");

    const result = await updateUmkmAction(umkm.id, formData);

    setLoading(false);

    if (!result.success) {
      setError(result.error ?? "Terjadi kesalahan");
      return;
    }

    router.push("/dashboard/umkm");
    router.refresh();
  };

  return (
    <form
      action={handleSubmit}
      className="flex max-w-xl flex-col gap-4 rounded-lg border border-gray-100 bg-white p-6 shadow-sm"
    >
      <div>
        <label className="mb-1 block text-sm font-medium text-[#1F2937]">
          Nama UMKM
        </label>
        <input
          name="namaUmkm"
          type="text"
          required
          defaultValue={umkm.namaUmkm}
          className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-brand focus:outline-none"
        />
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium text-[#1F2937]">
          Nama Pemilik
        </label>
        <input
          name="namaPemilik"
          type="text"
          required
          defaultValue={umkm.namaPemilik}
          className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-brand focus:outline-none"
        />
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium text-[#1F2937]">
          Nomor WhatsApp
        </label>
        <input
          name="whatsapp"
          type="text"
          required
          defaultValue={umkm.whatsapp}
          className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-brand focus:outline-none"
        />
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium text-[#1F2937]">
          Alamat
        </label>
        <textarea
          name="alamat"
          required
          rows={2}
          defaultValue={umkm.alamat}
          className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-brand focus:outline-none"
        />
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium text-[#1F2937]">
          Deskripsi (opsional)
        </label>
        <textarea
          name="deskripsi"
          rows={2}
          defaultValue={umkm.deskripsi ?? ""}
          className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-brand focus:outline-none"
        />
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium text-[#1F2937]">
          Foto Saat Ini
        </label>
        {umkm.foto ? (
          <div className="relative mb-2 h-24 w-24 overflow-hidden rounded-md bg-gray-100">
            <Image src={umkm.foto} alt={umkm.namaUmkm} fill className="object-cover" />
          </div>
        ) : (
          <p className="mb-2 text-xs text-gray-400">Belum ada foto</p>
        )}
        <label className="mb-1 block text-sm font-medium text-[#1F2937]">
          Ganti Foto (opsional, kosongkan jika tidak ingin ganti)
        </label>
        <input name="foto" type="file" accept="image/*" className="w-full text-sm" />
      </div>

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
          onClick={() => router.push("/dashboard/umkm")}
          className="rounded-md border border-gray-300 px-6 py-2 font-medium text-gray-700 hover:bg-gray-50"
        >
          Batal
        </button>
      </div>
    </form>
  );
}