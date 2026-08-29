"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { ImagePlus, X, Loader2 } from "lucide-react";
import { createBannerAction } from "../actions/banner.action";
import { Toast } from "@/components/shared/toast";

export function BannerForm() {
  const router = useRouter();
  const formRef = useRef<HTMLFormElement>(null);
  const gambarInputRef = useRef<HTMLInputElement>(null);
  const isSubmittingRef = useRef(false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const [gambarPreview, setGambarPreview] = useState<string | null>(null);
  const [gambarName, setGambarName] = useState<string | null>(null);

  const handleGambarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) {
      setGambarPreview(null);
      setGambarName(null);
      return;
    }
    setGambarName(file.name);
    setGambarPreview(URL.createObjectURL(file));
  };

  const handleRemoveGambar = () => {
    if (gambarInputRef.current) gambarInputRef.current.value = "";
    setGambarPreview(null);
    setGambarName(null);
  };

  const handleSubmit = async (formData: FormData) => {
    if (isSubmittingRef.current) return;
    isSubmittingRef.current = true;

    setLoading(true);
    setError("");

    const result = await createBannerAction(formData);

    setLoading(false);
    isSubmittingRef.current = false;

    if (!result.success) {
      setError(result.error ?? "Terjadi kesalahan");
      return;
    }

    formRef.current?.reset();
    setGambarPreview(null);
    setGambarName(null);
    setSuccessMessage("Banner berhasil ditambahkan");
    router.refresh();
  };

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    handleSubmit(formData);
  };

  return (
    <>
      {successMessage && (
        <Toast
          message={successMessage}
          onClose={() => setSuccessMessage(null)}
        />
      )}

      <form
        ref={formRef}
        onSubmit={handleFormSubmit}
        className="relative flex flex-col gap-4 overflow-hidden rounded-lg border border-gray-100 bg-white p-6 shadow-sm"
      >
        {loading && (
          <div className="loading-bar-track">
            <div className="loading-bar-fill" />
          </div>
        )}

        <h2 className="font-semibold text-[#1F2937]">Tambah Banner</h2>

        <div>
          <label className="mb-1 block text-sm font-medium text-[#1F2937]">
            Gambar Banner
          </label>

          <input
            ref={gambarInputRef}
            name="gambar"
            type="file"
            accept="image/*"
            required
            onChange={handleGambarChange}
            className="hidden"
          />

          {gambarPreview ? (
            <div className="flex items-center gap-3 rounded-lg border border-gray-200 bg-gray-50 p-3">
              <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-md bg-white">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={gambarPreview}
                  alt="Preview gambar banner"
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium text-gray-800">
                  {gambarName}
                </p>
                <button
                  type="button"
                  onClick={() => gambarInputRef.current?.click()}
                  disabled={loading}
                  className="text-xs font-medium text-brand hover:underline disabled:opacity-50"
                >
                  Ganti gambar
                </button>
              </div>
              <button
                type="button"
                onClick={handleRemoveGambar}
                disabled={loading}
                aria-label="Hapus gambar"
                className="shrink-0 rounded-full p-1.5 text-gray-400 transition-colors hover:bg-gray-200 hover:text-gray-600 disabled:opacity-50"
              >
                <X size={16} />
              </button>
            </div>
          ) : (
            <button
              type="button"
              onClick={() => gambarInputRef.current?.click()}
              disabled={loading}
              className="flex w-full flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed border-gray-200 bg-gray-50 px-4 py-6 text-center transition-colors hover:border-brand/40 hover:bg-brand-light/20 disabled:opacity-50"
            >
              <ImagePlus size={22} className="text-gray-400" />
              <span className="text-sm font-medium text-gray-600">
                Klik untuk pilih gambar
              </span>
              <span className="text-xs text-gray-400">PNG, JPG, atau WEBP</span>
            </button>
          )}
        </div>

        {error && <p className="text-sm text-red-600">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="flex items-center justify-center gap-2 rounded-md bg-brand py-2 font-medium text-white hover:bg-brand-dark disabled:opacity-50"
        >
          {loading && <Loader2 size={16} className="animate-spin" />}
          {loading ? "Menyimpan..." : "Tambah Banner"}
        </button>
      </form>
    </>
  );
}