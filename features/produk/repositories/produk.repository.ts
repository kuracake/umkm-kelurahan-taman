import { prisma } from "@/lib/prisma";
import type { ProdukInput } from "../schemas/produk.schema";

export const produkRepository = {
  findAll: () =>
    prisma.produk.findMany({
      include: { umkm: true, kategori: true },
      orderBy: { createdAt: "desc" },
    }),

  findActive: () =>
    prisma.produk.findMany({
      where: { isActive: true, umkm: { isActive: true } },
      include: { umkm: true, kategori: true },
      orderBy: { createdAt: "desc" },
    }),

  findBySlug: (slug: string) =>
    prisma.produk.findUnique({
      where: { slug },
      include: { umkm: true, kategori: true },
    }),

  findBySlugPrefix: (prefix: string) =>
    prisma.produk.findMany({
      where: { slug: { startsWith: prefix } },
      select: { slug: true },
    }),

  create: (data: ProdukInput & { slug: string; foto?: string; fotoTambahan?: string[] }) =>
    prisma.produk.create({ data }),

  update: (id: string, data: Partial<ProdukInput> & { foto?: string; fotoTambahan?: string[] }) =>
    prisma.produk.update({ where: { id }, data }),

  delete: (id: string) => prisma.produk.delete({ where: { id } }),
};