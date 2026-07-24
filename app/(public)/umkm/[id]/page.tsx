import Image from "next/image";
import { notFound } from "next/navigation";

import { ProductCard } from "@/components/shared/product-card";
import { umkmService } from "@/features/umkm/services/umkm.service";

export default async function UmkmDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const umkm = await umkmService.getByIdWithProduk(id);

  if (!umkm) {
    notFound();
  }

  return (
    <div className="bg-white">
      {/* Profil UMKM */}
      <section className="border-b border-gray-100 bg-brand-light/30 px-4 py-8">
        <div className="mx-auto flex max-w-3xl flex-col items-center gap-4 text-center sm:flex-row sm:text-left">
          <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-full ring-4 ring-white sm:h-24 sm:w-24">
            {umkm.foto ? (
              <Image
                src={umkm.foto}
                alt={umkm.namaUmkm}
                fill
                className="object-cover"
              />
            ) : (
              <div className="flex h-full items-center justify-center bg-brand-light text-3xl">
                🏪
              </div>
            )}
          </div>

          <div>
            <h1 className="text-xl font-bold text-gray-900 sm:text-2xl">
              {umkm.namaUmkm}
            </h1>

            <p className="mt-1 text-sm text-gray-600">
              Pemilik: {umkm.namaPemilik}
            </p>

            <p className="mt-1 text-sm text-gray-600">
              {umkm.alamat}
            </p>

            {umkm.deskripsi && (
              <p className="mt-2 text-sm text-gray-700">
                {umkm.deskripsi}
              </p>
            )}

            <a
              href={`https://wa.me/${umkm.whatsapp.replace(/\D/g, "")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 inline-flex items-center gap-2 rounded-full bg-brand px-5 py-2 text-sm font-bold text-white transition-transform duration-200 ease-out hover:scale-105 active:scale-95"
            >
              Hubungi via WhatsApp
            </a>
          </div>
        </div>
      </section>

      {/* Produk UMKM */}
      <section className="mx-auto max-w-6xl px-4 py-10">
        <h2 className="mb-5 text-lg font-bold text-gray-900 sm:text-xl">
          Produk dari {umkm.namaUmkm}
        </h2>

        {umkm.produk.length === 0 ? (
          <p className="text-sm text-gray-500">
            Belum ada produk dari UMKM ini.
          </p>
        ) : (
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4">
            {umkm.produk.map((produk) => (
              <ProductCard
                key={produk.id}
                produk={produk}
              />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}