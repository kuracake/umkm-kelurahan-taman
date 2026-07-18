"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createKategoriAction } from "../actions/kategori.action";

export function KategoriForm() {
  const router = useRouter();
  const [nama, setNama] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const result = await createKategoriAction({ nama });

    setLoading(false);

    if (!result.success) {
      setError(result.error ?? "Terjadi kesalahan");
      return;
    }

    setNama("");
    router.refresh();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-lg border border-gray-100 bg-white p-6 shadow-sm"
    >
      <h2 className="mb-4 font-semibold text-[#1F2937]">Tambah Kategori</h2>

      <div className="mb-4">
        <label className="mb-1 block text-sm font-medium text-[#1F2937]">
          Nama Kategori
        </label>
        <input
          type="text"
          value={nama}
          onChange={(e) => setNama(e.target.value)}
          required
          placeholder="Contoh: Kue Basah"
          className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-[#2E7D32] focus:outline-none"
        />
      </div>

      {error && <p className="mb-3 text-sm text-red-600">{error}</p>}

      <button
        type="submit"
        disabled={loading}
        className="w-full rounded-md bg-[#2E7D32] py-2 font-medium text-white hover:bg-[#256428] disabled:opacity-50"
      >
        {loading ? "Menyimpan..." : "Tambah"}
      </button>
    </form>
  );
}