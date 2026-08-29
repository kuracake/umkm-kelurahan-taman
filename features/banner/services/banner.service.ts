import { bannerRepository } from "../repositories/banner.repository";
import { bannerSchema, type BannerInput } from "../schemas/banner.schema";
import { uploadImage, deleteImage } from "@/lib/cloudinary";

export const bannerService = {
  getAll: () => bannerRepository.findAll(),
  getActive: () => bannerRepository.findActive(),

  create: async (data: BannerInput, gambarFile: File) => {
    const validated = bannerSchema.parse(data);

    if (!gambarFile || gambarFile.size === 0) {
      throw new Error("Gambar banner wajib diisi");
    }

    const gambarUrl = await uploadImage(gambarFile, "banner");
    return bannerRepository.create({ ...validated, gambar: gambarUrl });
  },

  toggleActive: (id: string, isActive: boolean) =>
    bannerRepository.toggleActive(id, isActive),

  delete: async (id: string) => {
    const existing = await bannerRepository.findById(id);
    if (existing?.gambar) await deleteImage(existing.gambar);

    return bannerRepository.delete(id);
  },
};