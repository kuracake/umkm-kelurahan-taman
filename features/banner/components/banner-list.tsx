"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { deleteBannerAction, toggleBannerActiveAction } from "../actions/banner.action";
import type { Banner } from "@prisma/client";
import { ConfirmDialog } from "@/components/shared/confirm-dialog";

export function BannerList({ banners }: { banners: Banner[] }) {
  const router = useRouter();
  const [deleteTarget, setDeleteTarget] = useState<Banner | null>(null);
  const [deleting, setDeleting] = useState(false);

  const handleConfirmDelete = async () => {
    if (!deleteTarget) return;
    setDeleting(true);
    await deleteBannerAction(deleteTarget.id);
    setDeleting(false);
    setDeleteTarget(null);
    router.refresh();
  };

  const handleToggle = async (id: string, current: boolean) => {
    await toggleBannerActiveAction(id, !current);
    router.refresh();
  };

  if (banners.length === 0) {
    return (
      <div className="rounded-lg border border-gray-100 bg-white p-6 text-center text-gray-500 shadow-sm">
        Belum ada banner
      </div>
    );
  }

  return (
    <>
      <div className="flex flex-col gap-3">
        {banners.map((banner) => (
          <div
            key={banner.id}
            className="flex items-center gap-4 rounded-lg border border-gray-100 bg-white p-4 shadow-sm"
          >
            <div className="relative h-16 w-28 shrink-0 overflow-hidden rounded-md bg-gray-100">
              <Image src={banner.gambar} alt={banner.judul || "Banner"} fill className="object-cover" />
            </div>

            <div className="flex-1">
              <p className="font-medium text-[#1F2937]">{banner.judul || "(Tanpa judul)"}</p>
              {banner.subjudul && (
                <p className="text-sm text-gray-500">{banner.subjudul}</p>
              )}
            </div>

            <div className="flex flex-col items-end gap-2">
              <button
                onClick={() => handleToggle(banner.id, banner.isActive)}
                className={`rounded-full px-3 py-1 text-xs font-medium ${
                  banner.isActive
                    ? "bg-brand-light text-brand"
                    : "bg-gray-100 text-gray-500"
                }`}
              >
                {banner.isActive ? "Aktif" : "Nonaktif"}
              </button>
              <button
                onClick={() => setDeleteTarget(banner)}
                className="text-sm text-red-600 hover:underline"
              >
                Hapus
              </button>
            </div>
          </div>
        ))}
      </div>

      <ConfirmDialog
        open={deleteTarget !== null}
        title="Hapus banner ini?"
        description={
          deleteTarget
            ? `Banner "${deleteTarget.judul || "(Tanpa judul)"}" akan dihapus permanen dan tidak bisa dikembalikan.`
            : ""
        }
        confirmLabel="Ya, Hapus"
        loading={deleting}
        onConfirm={handleConfirmDelete}
        onCancel={() => setDeleteTarget(null)}
      />
    </>
  );
}