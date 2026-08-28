"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { ImagePlus, X } from "lucide-react";
import { createUmkmAction } from "../actions/umkm.action";

export function UmkmForm() {
  const router = useRouter();
  const formRef = useRef<HTMLFormElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [preview, setPreview] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) {
      setPreview(null);
      setFileName(null);
      return;
    }
    setFileName(file.name);
    setPreview(URL.createObjectURL(file));
  };

  const handleRemoveFile = () => {
    if (fileInputRef.current) fileInputRef.current.value = "";
    setPreview(null);
    setFileName(null);
  };

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
    setPreview(null);
    setFileName(null);
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
          ref={fileInputRef}
          name="foto"
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="hidden"
        />

        {preview ? (
          <div className="flex items-center gap-3 rounded-lg border border-gray-200 bg-gray-50 p-3">
            <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-md bg-white">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={preview} alt="Preview foto UMKM" className="h-full w-full object-cover" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium text-gray-800">{fileName}</p>
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="text-xs font-medium text-brand hover:underline"
              >
                Ganti foto
              </button>
            </div>
            <button
              type="button"
              onClick={handleRemoveFile}
              aria-label="Hapus foto"
              className="shrink-0 rounded-full p-1.5 text-gray-400 transition-colors hover:bg-gray-200 hover:text-gray-600"
            >
              <X size={16} />
            </button>
          </div>
        ) : (
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="flex w-full flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed border-gray-200 bg-gray-50 px-4 py-6 text-center transition-colors hover:border-brand/40 hover:bg-brand-light/20"
          >
            <ImagePlus size={22} className="text-gray-400" />
            <span className="text-sm font-medium text-gray-600">
              Klik untuk pilih foto
            </span>
            <span className="text-xs text-gray-400">PNG, JPG, atau WEBP</span>
          </button>
        )}
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