import { prisma } from "@/lib/prisma";
import type { UmkmInput } from "../schemas/umkm.schema";

export const umkmRepository = {
  findAll: () => prisma.umkm.findMany({ orderBy: { namaUmkm: "asc" } }),

  findActive: () =>
    prisma.umkm.findMany({
      where: { isActive: true },
      orderBy: { namaUmkm: "asc" },
    }),

  findById: (id: string) => prisma.umkm.findUnique({ where: { id } }),

  create: (data: UmkmInput) => prisma.umkm.create({ data }),

  update: (id: string, data: Partial<UmkmInput>) =>
    prisma.umkm.update({ where: { id }, data }),

  delete: (id: string) => prisma.umkm.delete({ where: { id } }),

  findByIdWithProduk: (id: string) =>
    prisma.umkm.findUnique({
      where: { id },
      include: {
        produk: {
          where: { isActive: true },
          include: { kategori: true, umkm: true },
        },
      },
    }),
};