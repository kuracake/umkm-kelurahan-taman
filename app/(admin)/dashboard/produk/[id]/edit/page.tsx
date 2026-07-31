import { notFound } from "next/navigation";
import { produkService } from "@/features/produk/services/produk.service";
import { umkmService } from "@/features/umkm/services/umkm.service";
import { kategoriService } from "@/features/kategori/services/kategori.service";
import { ProdukEditForm } from "@/features/produk/components/produk-edit-form";

export default async function EditProdukPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const [produk, umkms, kategoris] = await Promise.all([
    produkService.getById(id),
    umkmService.getAll(),
    kategoriService.getAll(),
  ]);

  if (!produk) {
    notFound();
  }

  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold text-[#1F2937]">Edit Produk</h1>
      <ProdukEditForm produk={produk} umkms={umkms} kategoris={kategoris} />
    </div>
  );
}