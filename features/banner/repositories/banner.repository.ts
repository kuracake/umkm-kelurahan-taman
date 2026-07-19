import { prisma } from "@/lib/prisma";
import type { BannerInput } from "../schemas/banner.schema";

export const bannerRepository = {
  findAll: () => prisma.banner.findMany({ orderBy: { createdAt: "desc" } }),

  findActive: () =>
    prisma.banner.findMany({
      where: { isActive: true },
      orderBy: { createdAt: "desc" },
    }),

  create: (data: BannerInput & { gambar: string }) =>
    prisma.banner.create({ data }),

  toggleActive: (id: string, isActive: boolean) =>
    prisma.banner.update({ where: { id }, data: { isActive } }),

  delete: (id: string) => prisma.banner.delete({ where: { id } }),
};