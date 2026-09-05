import { kategoriRepository } from "../repositories/kategori.repository";

export const kategoriService = {
  getAll: () => kategoriRepository.findAll(),
};