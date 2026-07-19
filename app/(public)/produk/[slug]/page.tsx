import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { produkService } from "@/features/produk/services/produk.service";
import { OrderSection } from "@/features/produk/components/order-section";

export default async function ProdukDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const produk = await produkService.getBySlug(slug);

  if (!produk || !produk.isActive) {
    notFound();
  }

  const semuaProduk = await produkService.getActive();
  const related = semuaProduk
    .filter((p) => p.id !== produk.id && p.kategoriId === produk.kategoriId)
    .slice(0, 4);

  return (
    <div className="mx-auto max-w-4xl px-4 py-12">
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        {/* Foto */}
        <div className="relative aspect-square overflow-hidden rounded-lg bg-gray-100">
          {produk.foto ? (
            <Image
              src={produk.foto}
              alt={produk.namaProduk}
              fill
              className="object-cover"
              priority
            />
          ) : (
            <div className="flex h-full items-center justify-center text-gray-400">
              No Foto
            </div>
          )}
        </div>

        {/* Info */}
        <div>
          {produk.bestSeller && (
            <span className="mb-2 inline-block rounded-full bg-yellow-100 px-3 py-1 text-xs font-medium text-yellow-700">
              Best Seller
            </span>
          )}
          <h1 className="text-2xl font-bold text-[#1F2937]">{produk.namaProduk}</h1>
          <p className="mt-1 text-sm text-gray-500">
            Dijual oleh{" "}
            <Link href={`/umkm`} className="text-[#2E7D32] hover:underline">
              {produk.umkm.namaUmkm}
            </Link>
            {" · "}
            {produk.kategori.nama}
          </p>

          <p className="mt-4 text-3xl font-bold text-[#2E7D32]">
            Rp{produk.harga.toLocaleString("id-ID")}
          </p>

          {produk.deskripsi && (
            <p className="mt-4 text-[#1F2937]">{produk.deskripsi}</p>
          )}

          <OrderSection produk={produk} />
        </div>
      </div>

      {/* Related Products */}
      {related.length > 0 && (
        <section className="mt-16">
          <h2 className="mb-6 text-xl font-bold text-[#1F2937]">
            Produk Terkait
          </h2>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            {related.map((p) => (
              <Link
                key={p.id}
                href={`/produk/${p.slug}`}
                className="group overflow-hidden rounded-lg border border-gray-100 bg-white shadow-sm transition hover:shadow-md"
              >
                <div className="relative aspect-square bg-gray-100">
                  {p.foto ? (
                    <Image
                      src={p.foto}
                      alt={p.namaProduk}
                      fill
                      className="object-cover transition group-hover:scale-105"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center text-xs text-gray-400">
                      No Foto
                    </div>
                  )}
                </div>
                <div className="p-3">
                  <p className="truncate text-sm font-medium text-[#1F2937]">
                    {p.namaProduk}
                  </p>
                  <p className="text-sm font-semibold text-[#2E7D32]">
                    Rp{p.harga.toLocaleString("id-ID")}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}