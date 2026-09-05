import { prisma } from "@/lib/prisma";

export const kategoriRepository = {
  findAll: () => prisma.kategori.findMany({ orderBy: { nama: "asc" } }),
};