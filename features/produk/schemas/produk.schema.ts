import { z } from "zod";

export const produkSchema = z.object({
  namaProduk: z.string().min(2, "Nama produk minimal 2 karakter"),
  deskripsi: z.string().optional(),
  harga: z.coerce.number().positive("Harga harus lebih dari 0"),
  bestSeller: z.coerce.boolean().default(false),
  umkmId: z.string().min(1, "Pilih UMKM"),
  kategoriId: z.string().min(1, "Pilih kategori"),
});

export type ProdukInput = z.infer<typeof produkSchema>;
export type ProdukRawInput = z.input<typeof produkSchema>;