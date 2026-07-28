import Link from "next/link";
import Image from "next/image";
import type { Produk, Umkm, Kategori } from "@prisma/client";

type ProdukWithRelations = Produk & { umkm: Umkm; kategori: Kategori };

export function ProductCard({ produk }: { produk: ProdukWithRelations }) {
  return (
    <Link
      href={`/produk/${produk.slug}`}
      className="card-hover group flex h-full flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-[0_2px_8px_-2px_rgba(0,0,0,0.06)]"
    >
      {/* Gambar — rasio persegi, konsisten di semua card */}
      <div className="relative aspect-square w-full overflow-hidden bg-brand-light">
        {produk.foto ? (
          <Image
            src={produk.foto}
            alt={produk.namaProduk}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 220px"
            className="object-cover transition-transform duration-300 group-hover:scale-110"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-3xl">🍽️</div>
        )}
        {produk.bestSeller && (
          <span className="absolute left-2 top-2 rounded-full bg-brand px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-white shadow-sm">
            Favorit
          </span>
        )}
      </div>

      {/* Info — flex-1 biar tinggi konsisten walau nama produk panjang/pendek */}
      <div className="flex flex-1 flex-col gap-1 p-3">
        <p className="line-clamp-2 min-h-10 text-sm font-medium leading-tight text-gray-800">
          {produk.namaProduk}
        </p>
        <p className="truncate text-xs text-gray-500">{produk.umkm.namaUmkm}</p>

        {/* Harga selalu di bawah, walau tinggi konten di atas beda */}
        <p className="mt-auto pt-1 text-base font-bold text-brand">
          Rp{produk.harga.toLocaleString("id-ID")}
        </p>
      </div>
    </Link>
  );
}