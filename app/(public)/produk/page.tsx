import { produkService } from "@/features/produk/services/produk.service";
import { kategoriService } from "@/features/kategori/services/kategori.service";
import { ProductCard } from "@/components/shared/product-card";

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
    const matchQuery = q ? produk.namaProduk.toLowerCase().includes(q.toLowerCase()) : true;
    const matchKategori = kategori ? produk.kategoriId === kategori : true;
    return matchQuery && matchKategori;
  });

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:py-14">
      <h1 className="mb-6 text-xl font-bold text-gray-800 sm:text-2xl">Semua Produk</h1>

      <form className="mb-8 flex flex-col gap-3 sm:flex-row">
        <input
          type="text"
          name="q"
          defaultValue={q}
          placeholder="Cari produk..."
          className="flex-1 rounded-full border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm focus:border-brand focus:bg-white focus:outline-none"
        />
        <select
          name="kategori"
          defaultValue={kategori ?? ""}
          className="rounded-full border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm focus:border-brand focus:bg-white focus:outline-none"
        >
          <option value="">Semua Kategori</option>
          {kategoris.map((kat) => (
            <option key={kat.id} value={kat.id}>{kat.nama}</option>
          ))}
        </select>
        <button
          type="submit"
          className="rounded-full bg-brand px-6 py-2.5 text-sm font-bold text-white transition hover:bg-brand-dark"
        >
          Cari
        </button>
      </form>

      {filtered.length === 0 ? (
        <p className="py-16 text-center text-gray-500">Tidak ada produk ditemukan.</p>
      ) : (
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4">
          {filtered.map((produk) => (
            <ProductCard key={produk.id} produk={produk} />
          ))}
        </div>
      )}
    </div>
  );
}