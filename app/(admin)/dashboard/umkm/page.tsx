import { umkmService } from "@/features/umkm/services/umkm.service";
import { UmkmForm } from "@/features/umkm/components/umkm-form";
import { UmkmList } from "@/features/umkm/components/umkm-list";

export default async function UmkmPage() {
  const umkms = await umkmService.getAll();

  return (
    <div>
      <h1 className="mb-6 text-center text-2xl font-bold text-[#1F2937]">Kelola UMKM</h1>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-1">
          <UmkmForm />
        </div>
        <div className="lg:col-span-2">
          <UmkmList umkms={umkms} />
        </div>
      </div>
    </div>
  );
}