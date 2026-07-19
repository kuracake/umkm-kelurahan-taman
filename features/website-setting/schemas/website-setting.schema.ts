import { z } from "zod";

export const websiteSettingSchema = z.object({
  namaWebsite: z.string().min(2, "Nama website minimal 2 karakter"),
  deskripsi: z.string().optional(),
  alamat: z.string().optional(),
  whatsapp: z.string().optional(),
  email: z.string().email("Format email tidak valid").optional().or(z.literal("")),
  maps: z.string().optional(),
});

export type WebsiteSettingInput = z.infer<typeof websiteSettingSchema>;