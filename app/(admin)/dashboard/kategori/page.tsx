import { kategoriService } from "@/features/kategori/services/kategori.service";
import { KategoriForm } from "@/features/kategori/components/kategori-form";
import { KategoriList } from "@/features/kategori/components/kategori-list";

export default async function KategoriPage() {
  const kategoris = await kategoriService.getAll();

  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold text-[#1F2937]">
        Kelola Kategori
      </h1>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-1">
          <KategoriForm />
        </div>
        <div className="lg:col-span-2">
          <KategoriList kategoris={kategoris} />
        </div>
      </div>
    </div>
  );
}