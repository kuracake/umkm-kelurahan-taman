"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { deleteBannerAction, toggleBannerActiveAction } from "../actions/banner.action";
import type { Banner } from "@prisma/client";
import { ConfirmDialog } from "@/components/shared/confirm-dialog";
import { Trash2 } from "lucide-react";

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
              <button
                onClick={() => handleToggle(banner.id, banner.isActive)}
                className={`mb-1 flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium transition ${
                  banner.isActive
                    ? "bg-brand-light text-brand"
                    : "bg-gray-100 text-gray-500"
                }`}
              >
                <span
                  className={`h-1.5 w-1.5 rounded-full ${
                    banner.isActive ? "bg-brand" : "bg-gray-400"
                  }`}
                />
                {banner.isActive ? "Aktif" : "Nonaktif"}
              </button>

              {banner.judul ? (
                <p className="font-medium text-[#1F2937]">{banner.judul}</p>
              ) : (
                <p className="text-sm italic text-gray-400">Tanpa judul</p>
              )}
              {banner.subjudul && (
                <p className="text-sm text-gray-500">{banner.subjudul}</p>
              )}
            </div>

            <button
              onClick={() => setDeleteTarget(banner)}
              aria-label="Hapus banner"
              className="shrink-0 rounded-full p-1.5 text-gray-400 transition-colors hover:bg-red-50 hover:text-red-600"
            >
              <Trash2 size={16} />
            </button>
          </div>
        ))}
      </div>

      <ConfirmDialog
        open={deleteTarget !== null}
        title="Hapus banner ini?"
        description={
          deleteTarget
            ? `Banner "${deleteTarget.judul || "Tanpa judul"}" akan dihapus permanen dan tidak bisa dikembalikan.`
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