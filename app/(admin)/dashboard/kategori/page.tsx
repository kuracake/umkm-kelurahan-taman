import { kategoriService } from "@/features/kategori/services/kategori.service";
import { KategoriList } from "@/features/kategori/components/kategori-list";

export default async function KategoriPage() {
  const kategoris = await kategoriService.getAll();

  return (
    <div>
      <h1 className="mb-2 text-2xl font-bold text-[#1F2937]">Kelola Kategori</h1>
      <p className="mb-6 text-sm text-gray-500">
        Kategori sudah ditetapkan permanen dan tidak bisa ditambah atau dihapus dari sini.
      </p>

      <KategoriList kategoris={kategoris} />
    </div>
  );
}