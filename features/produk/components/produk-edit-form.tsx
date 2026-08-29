"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { ImagePlus, X } from "lucide-react";
import { updateProdukAction } from "../actions/produk.action";
import type { Produk, Umkm, Kategori } from "@prisma/client";
import { CurrencyInput } from "@/components/shared/currency-input";

type ProdukWithRelations = Produk & { umkm: Umkm; kategori: Kategori };

export function ProdukEditForm({
  produk,
  umkms,
  kategoris,
}: {
  produk: ProdukWithRelations;
  umkms: Umkm[];
  kategoris: Kategori[];
}) {
  const router = useRouter();
  const fotoInputRef = useRef<HTMLInputElement>(null);
  const fotoTambahanInputRef = useRef<HTMLInputElement>(null);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [fotoPreview, setFotoPreview] = useState<string | null>(null);
  const [fotoName, setFotoName] = useState<string | null>(null);

  const [fotoTambahanList, setFotoTambahanList] = useState<
    { file: File; preview: string }[]
  >([]);

  const handleFotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) {
      setFotoPreview(null);
      setFotoName(null);
      return;
    }
    setFotoName(file.name);
    setFotoPreview(URL.createObjectURL(file));
  };

  const handleRemoveFoto = () => {
    if (fotoInputRef.current) fotoInputRef.current.value = "";
    setFotoPreview(null);
    setFotoName(null);
  };

  const handleFotoTambahanChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const files = Array.from(e.target.files ?? []);
    setFotoTambahanList(
      files.map((file) => ({ file, preview: URL.createObjectURL(file) }))
    );
  };

  const handleRemoveFotoTambahan = (index: number) => {
    const next = fotoTambahanList.filter((_, i) => i !== index);
    setFotoTambahanList(next);

    if (fotoTambahanInputRef.current) {
      const dt = new DataTransfer();
      next.forEach((item) => dt.items.add(item.file));
      fotoTambahanInputRef.current.files = dt.files;
    }
  };

  const handleSubmit = async (formData: FormData) => {
    setLoading(true);
    setError("");

    const result = await updateProdukAction(produk.id, formData);

    setLoading(false);

    if (!result.success) {
      setError(result.error ?? "Terjadi kesalahan");
      return;
    }

    router.push("/dashboard/produk");
    router.refresh();
  };

  return (
    <form
      action={handleSubmit}
      className="flex max-w-xl flex-col gap-4 rounded-lg border border-gray-100 bg-white p-6 shadow-sm"
    >
      <div>
        <label className="mb-1 block text-sm font-medium text-[#1F2937]">
          Nama Produk
        </label>
        <input
          name="namaProduk"
          type="text"
          required
          defaultValue={produk.namaProduk}
          className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-brand focus:outline-none"
        />
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium text-[#1F2937]">
          Harga (Rp)
        </label>
        <CurrencyInput name="harga" defaultValue={produk.harga} required />
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium text-[#1F2937]">
          UMKM
        </label>
        <select
          name="umkmId"
          required
          defaultValue={produk.umkmId}
          className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-brand focus:outline-none"
        >
          {umkms.map((umkm) => (
            <option key={umkm.id} value={umkm.id}>
              {umkm.namaUmkm}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium text-[#1F2937]">
          Kategori
        </label>
        <select
          name="kategoriId"
          required
          defaultValue={produk.kategoriId}
          className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-brand focus:outline-none"
        >
          {kategoris.map((kategori) => (
            <option key={kategori.id} value={kategori.id}>
              {kategori.nama}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium text-[#1F2937]">
          Deskripsi (opsional)
        </label>
        <textarea
          name="deskripsi"
          rows={2}
          defaultValue={produk.deskripsi ?? ""}
          className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-brand focus:outline-none"
        />
      </div>

      {/* Foto Utama */}
      <div>
        <label className="mb-1 block text-sm font-medium text-[#1F2937]">
          Foto Utama Saat Ini
        </label>
        {produk.foto ? (
          <div className="relative mb-2 h-24 w-24 overflow-hidden rounded-md bg-gray-100">
            <Image src={produk.foto} alt={produk.namaProduk} fill className="object-cover" />
          </div>
        ) : (
          <p className="mb-2 text-xs text-gray-400">Belum ada foto</p>
        )}

        <label className="mb-1 block text-sm font-medium text-[#1F2937]">
          Ganti Foto Utama (opsional, kosongkan jika tidak ingin ganti)
        </label>

        <input
          ref={fotoInputRef}
          name="foto"
          type="file"
          accept="image/*"
          onChange={handleFotoChange}
          className="hidden"
        />

        {fotoPreview ? (
          <div className="flex items-center gap-3 rounded-lg border border-gray-200 bg-gray-50 p-3">
            <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-md bg-white">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={fotoPreview}
                alt="Preview foto utama baru"
                className="h-full w-full object-cover"
              />
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium text-gray-800">
                {fotoName}
              </p>
              <button
                type="button"
                onClick={() => fotoInputRef.current?.click()}
                className="text-xs font-medium text-brand hover:underline"
              >
                Ganti foto
              </button>
            </div>
            <button
              type="button"
              onClick={handleRemoveFoto}
              aria-label="Hapus foto"
              className="shrink-0 rounded-full p-1.5 text-gray-400 transition-colors hover:bg-gray-200 hover:text-gray-600"
            >
              <X size={16} />
            </button>
          </div>
        ) : (
          <button
            type="button"
            onClick={() => fotoInputRef.current?.click()}
            className="flex w-full flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed border-gray-200 bg-gray-50 px-4 py-6 text-center transition-colors hover:border-brand/40 hover:bg-brand-light/20"
          >
            <ImagePlus size={22} className="text-gray-400" />
            <span className="text-sm font-medium text-gray-600">
              Klik untuk pilih foto baru
            </span>
            <span className="text-xs text-gray-400">PNG, JPG, atau WEBP</span>
          </button>
        )}
      </div>

      {/* Foto Tambahan */}
      <div>
        <label className="mb-1 block text-sm font-medium text-[#1F2937]">
          Foto Tambahan Saat Ini
        </label>
        {produk.fotoTambahan.length > 0 ? (
          <div className="mb-2 grid grid-cols-4 gap-2">
            {produk.fotoTambahan.map((url, i) => (
              <div key={i} className="relative h-16 w-16 overflow-hidden rounded-md bg-gray-100">
                <Image src={url} alt={`Foto tambahan ${i + 1}`} fill className="object-cover" />
              </div>
            ))}
          </div>
        ) : (
          <p className="mb-2 text-xs text-gray-400">Belum ada foto tambahan</p>
        )}

        <label className="mb-1 block text-sm font-medium text-[#1F2937]">
          Ganti Foto Tambahan (opsional, pilih beberapa sekaligus)
        </label>

        <input
          ref={fotoTambahanInputRef}
          name="fotoTambahan"
          type="file"
          accept="image/*"
          multiple
          onChange={handleFotoTambahanChange}
          className="hidden"
        />

        {fotoTambahanList.length > 0 ? (
          <div className="flex flex-col gap-2">
            <div className="grid grid-cols-3 gap-2 sm:grid-cols-4">
              {fotoTambahanList.map((item, index) => (
                <div
                  key={index}
                  className="group relative aspect-square overflow-hidden rounded-md border border-gray-200 bg-gray-50"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={item.preview}
                    alt={`Preview foto tambahan baru ${index + 1}`}
                    className="h-full w-full object-cover"
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveFotoTambahan(index)}
                    aria-label="Hapus foto"
                    className="absolute right-1 top-1 rounded-full bg-black/60 p-1 text-white transition-colors hover:bg-black/80"
                  >
                    <X size={12} />
                  </button>
                </div>
              ))}
            </div>
            <button
              type="button"
              onClick={() => fotoTambahanInputRef.current?.click()}
              className="self-start text-xs font-medium text-brand hover:underline"
            >
              Tambah/ganti foto
            </button>
          </div>
        ) : (
          <button
            type="button"
            onClick={() => fotoTambahanInputRef.current?.click()}
            className="flex w-full flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed border-gray-200 bg-gray-50 px-4 py-6 text-center transition-colors hover:border-brand/40 hover:bg-brand-light/20"
          >
            <ImagePlus size={22} className="text-gray-400" />
            <span className="text-sm font-medium text-gray-600">
              Klik untuk pilih beberapa foto baru
            </span>
            <span className="text-xs text-gray-400">PNG, JPG, atau WEBP</span>
          </button>
        )}
      </div>

      <label className="flex items-center gap-2 text-sm text-[#1F2937]">
        <input name="bestSeller" type="checkbox" defaultChecked={produk.bestSeller} />
        Tandai sebagai Best Seller
      </label>

      {error && <p className="text-sm text-red-600">{error}</p>}

      <div className="flex gap-3">
        <button
          type="submit"
          disabled={loading}
          className="rounded-md bg-brand px-6 py-2 font-medium text-white hover:bg-brand-dark disabled:opacity-50"
        >
          {loading ? "Menyimpan..." : "Simpan Perubahan"}
        </button>
        <button
          type="button"
          onClick={() => router.push("/dashboard/produk")}
          className="rounded-md border border-gray-300 px-6 py-2 font-medium text-gray-700 hover:bg-gray-50"
        >
          Batal
        </button>
      </div>
    </form>
  );
}