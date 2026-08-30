import Image from "next/image";
import { umkmService } from "@/features/umkm/services/umkm.service";


export default async function UmkmListPage() {
  const umkms = await umkmService.getActive();

  return (
    <div className="mx-auto max-w-6xl px-4 py-12">

      {umkms.length === 0 ? (
        <p className="text-center text-gray-500">Belum ada UMKM terdaftar.</p>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {umkms.map((umkm) => (
            <div
              key={umkm.id}
              className="flex gap-4 rounded-lg border border-gray-100 bg-white p-4 shadow-sm"
            >
              <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-full bg-gray-100">
                {umkm.foto ? (
                  <Image src={umkm.foto} alt={umkm.namaUmkm} fill className="object-cover" />
                ) : (
                  <div className="flex h-full items-center justify-center text-2xl">🏪</div>
                )}
              </div>
              <div>
                <p className="font-semibold text-[#1F2937]">{umkm.namaUmkm}</p>
                <p className="text-sm text-gray-500">{umkm.namaPemilik}</p>
                <p className="mt-1 text-sm text-gray-600">{umkm.alamat}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}