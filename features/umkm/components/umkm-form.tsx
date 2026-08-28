"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { createUmkmAction } from "../actions/umkm.action";

export function UmkmForm() {
  const router = useRouter();
  const formRef = useRef<HTMLFormElement>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (formData: FormData) => {
    setLoading(true);
    setError("");

    const result = await createUmkmAction(formData);

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
      <h2 className="font-semibold text-[#1F2937]">Tambah UMKM</h2>

      <div>
        <label className="mb-1 block text-sm font-medium text-[#1F2937]">
          Nama UMKM
        </label>
        <input
          name="namaUmkm"
          type="text"
          required
          placeholder="Contoh: Warung Kue Bu Siti"
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
          placeholder="628123456789"
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
          className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-brand focus:outline-none"
        />
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium text-[#1F2937]">
          Foto UMKM
        </label>
        <input
          name="foto"
          type="file"
          accept="image/*"
          className="w-full text-sm"
        />
      </div>

      {error && <p className="text-sm text-red-600">{error}</p>}

      <button
        type="submit"
        disabled={loading}
        className="rounded-md bg-brand py-2 font-medium text-white hover:bg-brand-dark disabled:opacity-50"
      >
        {loading ? "Menyimpan..." : "Tambah UMKM"}
      </button>
    </form>
  );
}