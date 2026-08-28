import { z } from "zod";

export const bannerSchema = z.object({
  judul: z.string().min(2, "Judul minimal 2 karakter").optional().nullable(),
  subjudul: z.string().optional().nullable(),
});

export type BannerInput = z.infer<typeof bannerSchema>;