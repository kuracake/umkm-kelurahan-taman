"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { updateWebsiteSettingAction } from "../actions/website-setting.action";
import type { WebsiteSetting } from "@prisma/client";
import { Toast } from "@/components/shared/toast";

export function WebsiteSettingForm({ setting }: { setting: WebsiteSetting | null }) {
  const router = useRouter();
  const isSubmittingRef = useRef(false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const handleSubmit = async (formData: FormData) => {
    if (isSubmittingRef.current) return;
    isSubmittingRef.current = true;

    setLoading(true);
    setError("");

    const result = await updateWebsiteSettingAction(formData);

    setLoading(false);
    isSubmittingRef.current = false;

    if (!result.success) {
      setError(result.error ?? "Terjadi kesalahan");
      return;
    }

    setSuccessMessage("Pengaturan berhasil disimpan");
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
        onSubmit={handleFormSubmit}
        className="relative flex max-w-xl flex-col gap-4 overflow-hidden rounded-lg border border-gray-100 bg-white p-6 shadow-sm"
      >
        {loading && (
          <div className="loading-bar-track">
            <div className="loading-bar-fill" />
          </div>
        )}

        <div>
          <label className="mb-1 block text-sm font-medium text-[#1F2937]">
            Nama Website
          </label>
          <input
            name="namaWebsite"
            type="text"
            required
            disabled={loading}
            defaultValue={setting?.namaWebsite ?? "UMKM Kelurahan Taman"}
            className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-brand focus:outline-none disabled:bg-gray-50"
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-[#1F2937]">
            Deskripsi
          </label>
          <textarea
            name="deskripsi"
            rows={3}
            disabled={loading}
            defaultValue={setting?.deskripsi ?? ""}
            className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-brand focus:outline-none disabled:bg-gray-50"
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-[#1F2937]">
            Alamat
          </label>
          <textarea
            name="alamat"
            rows={2}
            disabled={loading}
            defaultValue={setting?.alamat ?? ""}
            className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-brand focus:outline-none disabled:bg-gray-50"
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-[#1F2937]">
            Nomor WhatsApp
          </label>
          <input
            name="whatsapp"
            type="text"
            disabled={loading}
            defaultValue={setting?.whatsapp ?? ""}
            placeholder="628123456789"
            className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-brand focus:outline-none disabled:bg-gray-50"
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-[#1F2937]">
            Email
          </label>
          <input
            name="email"
            type="email"
            disabled={loading}
            defaultValue={setting?.email ?? ""}
            className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-brand focus:outline-none disabled:bg-gray-50"
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-[#1F2937]">
            Embed Google Maps (opsional)
          </label>
          <input
            name="maps"
            type="text"
            disabled={loading}
            defaultValue={setting?.maps ?? ""}
            placeholder="Link embed dari Google Maps"
            className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-brand focus:outline-none disabled:bg-gray-50"
          />
        </div>

        {error && <p className="text-sm text-red-600">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="flex items-center justify-center gap-2 rounded-md bg-brand py-2 font-medium text-white hover:bg-brand-dark disabled:opacity-50"
        >
          {loading && <Loader2 size={16} className="animate-spin" />}
          {loading ? "Menyimpan..." : "Simpan Pengaturan"}
        </button>
      </form>
    </>
  );
}