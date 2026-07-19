import Link from "next/link";
import Image from "next/image";
import { produkService } from "@/features/produk/services/produk.service";
import { kategoriService } from "@/features/kategori/services/kategori.service";

export default async function ProdukListPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; kategori?: string }>;
}) {
  const { q, kategori } = await searchParams;
  const [produks, kategoris] = await Promise.all([
    produkService.getActive(),
    kategoriService.getAll(),
  ]);

  const filtered = produks.filter((produk) => {
    const matchQuery = q
      ? produk.namaProduk.toLowerCase().includes(q.toLowerCase())
      : true;
    const matchKategori = kategori ? produk.kategoriId === kategori : true;
    return matchQuery && matchKategori;
  });

  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <h1 className="mb-6 text-2xl font-bold text-[#1F2937]">Semua Produk</h1>

      {/* Search & Filter */}
      <form className="mb-8 flex flex-col gap-3 sm:flex-row">
        <input
          type="text"
          name="q"
          defaultValue={q}
          placeholder="Cari produk..."
          className="flex-1 rounded-md border border-gray-300 px-4 py-2 focus:border-[#2E7D32] focus:outline-none"
        />
        <select
          name="kategori"
          defaultValue={kategori ?? ""}
          className="rounded-md border border-gray-300 px-4 py-2 focus:border-[#2E7D32] focus:outline-none"
        >
          <option value="">Semua Kategori</option>
          {kategoris.map((kat) => (
            <option key={kat.id} value={kat.id}>
              {kat.nama}
            </option>
          ))}
        </select>
        <button
          type="submit"
          className="rounded-md bg-[#2E7D32] px-6 py-2 font-medium text-white hover:bg-[#256428]"
        >
          Cari
        </button>
      </form>

      {/* Grid Produk */}
      {filtered.length === 0 ? (
        <p className="text-center text-gray-500">Tidak ada produk ditemukan.</p>
      ) : (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {filtered.map((produk) => (
            <Link
              key={produk.id}
              href={`/produk/${produk.slug}`}
              className="group overflow-hidden rounded-lg border border-gray-100 bg-white shadow-sm transition hover:shadow-md"
            >
              <div className="relative aspect-square bg-gray-100">
                {produk.foto ? (
                  <Image
                    src={produk.foto}
                    alt={produk.namaProduk}
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
                  {produk.namaProduk}
                </p>
                <p className="text-xs text-gray-500">{produk.umkm.namaUmkm}</p>
                <p className="text-sm font-semibold text-[#2E7D32]">
                  Rp{produk.harga.toLocaleString("id-ID")}
                </p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}