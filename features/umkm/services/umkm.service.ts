import { umkmRepository } from "../repositories/umkm.repository";
import { umkmSchema, type UmkmInput } from "../schemas/umkm.schema";
import { uploadImage, deleteImage } from "@/lib/cloudinary";

export const umkmService = {
  getAll: () => umkmRepository.findAll(),
  getActive: () => umkmRepository.findActive(),
  getById: (id: string) => umkmRepository.findById(id),
  getByIdWithProduk: (id: string) => umkmRepository.findByIdWithProduk(id),

  create: async (data: UmkmInput, fotoFile?: File) => {
    const validated = umkmSchema.parse(data);

    let fotoUrl: string | undefined;
    if (fotoFile && fotoFile.size > 0) {
      fotoUrl = await uploadImage(fotoFile, "umkm");
    }

    return umkmRepository.create({ ...validated, foto: fotoUrl });
  },

  update: async (id: string, data: UmkmInput, fotoFile?: File) => {
    const validated = umkmSchema.parse(data);
    const existing = await umkmRepository.findById(id);

    let fotoUrl: string | undefined;
    if (fotoFile && fotoFile.size > 0) {
      fotoUrl = await uploadImage(fotoFile, "umkm");
      if (existing?.foto) await deleteImage(existing.foto);
    }

    return umkmRepository.update(id, { ...validated, ...(fotoUrl && { foto: fotoUrl }) });
  },

  toggleActive: async (id: string, isActive: boolean) => {
    return umkmRepository.update(id, { isActive } as Partial<UmkmInput>);
  },

  delete: async (id: string) => {
    const existing = await umkmRepository.findById(id);
    if (existing?.foto) await deleteImage(existing.foto);

    return umkmRepository.delete(id);
  },
};