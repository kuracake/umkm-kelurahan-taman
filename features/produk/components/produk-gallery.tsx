"use client";

import { useState } from "react";
import Image from "next/image";

export function ProdukGallery({
  namaProduk,
  foto,
  fotoTambahan,
}: {
  namaProduk: string;
  foto: string | null;
  fotoTambahan: string[];
}) {
  const semuaFoto = [foto, ...fotoTambahan].filter(Boolean) as string[];
  const [active, setActive] = useState(semuaFoto[0] ?? null);

  return (
    <div>
      <div className="relative aspect-square overflow-hidden rounded-lg bg-gray-100">
        {active ? (
          <Image
            src={active}
            alt={namaProduk}
            fill
            sizes="(max-width: 768px) 100vw, 500px"
            className="object-cover"
            priority
          />
        ) : (
          <div className="flex h-full items-center justify-center text-gray-400">
            No Foto
          </div>
        )}
      </div>

      {semuaFoto.length > 1 && (
        <div className="mt-3 grid grid-cols-4 gap-2">
          {semuaFoto.map((url, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setActive(url)}
              className={`relative aspect-square overflow-hidden rounded-md bg-gray-100 ring-2 transition ${
                active === url ? "ring-brand" : "ring-transparent hover:ring-brand/40"
              }`}
            >
              <Image
                src={url}
                alt={`${namaProduk} ${i + 1}`}
                fill
                className="object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}