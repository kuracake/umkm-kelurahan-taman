import { notFound } from "next/navigation";
import { umkmService } from "@/features/umkm/services/umkm.service";
import { UmkmEditForm } from "@/features/umkm/components/umkm-edit-form";

export default async function EditUmkmPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const umkm = await umkmService.getById(id);

  if (!umkm) {
    notFound();
  }

  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold text-[#1F2937]">Edit UMKM</h1>
      <UmkmEditForm umkm={umkm} />
    </div>
  );
}