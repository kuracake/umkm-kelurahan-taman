import { prisma } from "@/lib/prisma";
import type { KategoriInput } from "../schemas/kategori.schema";

export const kategoriRepository = {
  findAll: () => prisma.kategori.findMany({ orderBy: { nama: "asc" } }),

  findById: (id: string) => prisma.kategori.findUnique({ where: { id } }),

  create: (data: KategoriInput) => prisma.kategori.create({ data }),

  update: (id: string, data: KategoriInput) =>
    prisma.kategori.update({ where: { id }, data }),

  delete: (id: string) => prisma.kategori.delete({ where: { id } }),
};