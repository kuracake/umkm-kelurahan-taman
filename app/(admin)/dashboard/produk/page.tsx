import { produkService } from "@/features/produk/services/produk.service";
import { umkmService } from "@/features/umkm/services/umkm.service";
import { kategoriService } from "@/features/kategori/services/kategori.service";
import { ProdukForm } from "@/features/produk/components/produk-form";
import { ProdukList } from "@/features/produk/components/produk-list";

export default async function ProdukPage() {
  const [produks, umkms, kategoris] = await Promise.all([
    produkService.getAll(),
    umkmService.getAll(),
    kategoriService.getAll(),
  ]);

  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold text-[#1F2937]">Kelola Produk</h1>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-1">
          <ProdukForm umkms={umkms} kategoris={kategoris} />
        </div>
        <div className="lg:col-span-2">
          <ProdukList produks={produks} />
        </div>
      </div>
    </div>
  );
}