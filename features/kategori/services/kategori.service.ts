import { kategoriRepository } from "../repositories/kategori.repository";
import { kategoriSchema, type KategoriInput } from "../schemas/kategori.schema";

export const kategoriService = {
  getAll: () => kategoriRepository.findAll(),

  create: async (data: KategoriInput) => {
    const validated = kategoriSchema.parse(data);
    return kategoriRepository.create(validated);
  },

  update: async (id: string, data: KategoriInput) => {
    const validated = kategoriSchema.parse(data);
    return kategoriRepository.update(id, validated);
  },

  delete: (id: string) => kategoriRepository.delete(id),
};