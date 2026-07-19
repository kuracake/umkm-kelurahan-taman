"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { updateWebsiteSettingAction } from "../actions/website-setting.action";
import type { WebsiteSetting } from "@prisma/client";

export function WebsiteSettingForm({ setting }: { setting: WebsiteSetting | null }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (formData: FormData) => {
    setLoading(true);
    setError("");
    setSuccess(false);

    const result = await updateWebsiteSettingAction(formData);

    setLoading(false);

    if (!result.success) {
      setError(result.error ?? "Terjadi kesalahan");
      return;
    }

    setSuccess(true);
    router.refresh();
  };

  return (
    <form
      action={handleSubmit}
      className="flex flex-col gap-4 rounded-lg border border-gray-100 bg-white p-6 shadow-sm max-w-xl"
    >
      <div>
        <label className="mb-1 block text-sm font-medium text-[#1F2937]">
          Nama Website
        </label>
        <input
          name="namaWebsite"
          type="text"
          required
          defaultValue={setting?.namaWebsite ?? "Kampung Jajanan RW 06"}
          className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-[#2E7D32] focus:outline-none"
        />
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium text-[#1F2937]">
          Deskripsi
        </label>
        <textarea
          name="deskripsi"
          rows={3}
          defaultValue={setting?.deskripsi ?? ""}
          className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-[#2E7D32] focus:outline-none"
        />
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium text-[#1F2937]">
          Alamat
        </label>
        <textarea
          name="alamat"
          rows={2}
          defaultValue={setting?.alamat ?? ""}
          className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-[#2E7D32] focus:outline-none"
        />
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium text-[#1F2937]">
          Nomor WhatsApp
        </label>
        <input
          name="whatsapp"
          type="text"
          defaultValue={setting?.whatsapp ?? ""}
          placeholder="628123456789"
          className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-[#2E7D32] focus:outline-none"
        />
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium text-[#1F2937]">
          Email
        </label>
        <input
          name="email"
          type="email"
          defaultValue={setting?.email ?? ""}
          className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-[#2E7D32] focus:outline-none"
        />
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium text-[#1F2937]">
          Embed Google Maps (opsional)
        </label>
        <input
          name="maps"
          type="text"
          defaultValue={setting?.maps ?? ""}
          placeholder="Link embed dari Google Maps"
          className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-[#2E7D32] focus:outline-none"
        />
      </div>

      {error && <p className="text-sm text-red-600">{error}</p>}
      {success && <p className="text-sm text-[#2E7D32]">Pengaturan berhasil disimpan.</p>}

      <button
        type="submit"
        disabled={loading}
        className="rounded-md bg-[#2E7D32] py-2 font-medium text-white hover:bg-[#256428] disabled:opacity-50"
      >
        {loading ? "Menyimpan..." : "Simpan Pengaturan"}
      </button>
    </form>
  );
}