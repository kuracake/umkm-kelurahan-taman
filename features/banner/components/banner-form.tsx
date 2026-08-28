"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { createBannerAction } from "../actions/banner.action";

export function BannerForm() {
  const router = useRouter();
  const formRef = useRef<HTMLFormElement>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (formData: FormData) => {
    setLoading(true);
    setError("");

    const result = await createBannerAction(formData);

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
      <h2 className="font-semibold text-[#1F2937]">Tambah Banner</h2>

      <div>
        <label className="mb-1 block text-sm font-medium text-[#1F2937]">
          Gambar Banner
        </label>
        <input name="gambar" type="file" accept="image/*" required className="w-full text-sm" />
      </div>

      {error && <p className="text-sm text-red-600">{error}</p>}

      <button
        type="submit"
        disabled={loading}
        className="rounded-md bg-brand py-2 font-medium text-white hover:bg-brand-dark disabled:opacity-50"
      >
        {loading ? "Menyimpan..." : "Tambah Banner"}
      </button>
    </form>
  );
}