import { z } from "zod";

export const bannerSchema = z.object({
  judul: z.string().min(2, "Judul minimal 2 karakter"),
  subjudul: z.string().optional(),
});

export type BannerInput = z.infer<typeof bannerSchema>;