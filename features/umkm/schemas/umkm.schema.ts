import { z } from "zod";

export const umkmSchema = z.object({
  namaUmkm: z.string().min(2, "Nama UMKM minimal 2 karakter"),
  namaPemilik: z.string().min(2, "Nama pemilik minimal 2 karakter"),
  whatsapp: z
    .string()
    .min(10, "Nomor WhatsApp tidak valid")
    .regex(/^[0-9+]+$/, "Nomor WhatsApp hanya boleh angka"),
  alamat: z.string().min(5, "Alamat minimal 5 karakter"),
  deskripsi: z.string().optional(),
  foto: z.string().optional(),
});

export type UmkmInput = z.infer<typeof umkmSchema>;