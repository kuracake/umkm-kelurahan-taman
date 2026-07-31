import { produkRepository } from "../repositories/produk.repository";
import { produkSchema, type ProdukInput, type ProdukRawInput } from "../schemas/produk.schema";
import { generateSlug } from "@/lib/slug";
import { uploadImage } from "@/lib/cloudinary";
import { prisma } from "@/lib/prisma";

async function generateUniqueSlug(namaProduk: string): Promise<string> {
  const baseSlug = generateSlug(namaProduk);
  const existing = await produkRepository.findBySlugPrefix(baseSlug);

  if (existing.length === 0) return baseSlug;

  const existingSlugs = existing.map((p) => p.slug);
  let counter = 2;
  let newSlug = `${baseSlug}-${counter}`;

  while (existingSlugs.includes(newSlug)) {
    counter++;
    newSlug = `${baseSlug}-${counter}`;
  }

  return newSlug;
}

export const produkService = {
  getAll: () => produkRepository.findAll(),
  getActive: () => produkRepository.findActive(),
  getBySlug: (slug: string) => produkRepository.findBySlug(slug),

  create: async (data: ProdukRawInput, fotoFile?: File, fotoTambahanFiles?: File[]) => {
    const validated = produkSchema.parse(data);
    const slug = await generateUniqueSlug(validated.namaProduk);

    let fotoUrl: string | undefined;
    if (fotoFile && fotoFile.size > 0) {
      fotoUrl = await uploadImage(fotoFile, "produk");
    }

    let fotoTambahanUrls: string[] = [];
    if (fotoTambahanFiles && fotoTambahanFiles.length > 0) {
      const uploads = fotoTambahanFiles
        .filter((f) => f.size > 0)
        .map((f) => uploadImage(f, "produk"));
      fotoTambahanUrls = await Promise.all(uploads);
    }

    return produkRepository.create({
      ...validated,
      slug,
      foto: fotoUrl,
      fotoTambahan: fotoTambahanUrls,
    });
  },

  getById: (id: string) =>
  prisma.produk.findUnique({
    where: { id },
    include: { umkm: true, kategori: true },
  }),

  update: async (id: string, data: ProdukRawInput, fotoFile?: File, fotoTambahanFiles?: File[]) => {
    const validated = produkSchema.parse(data);

    let fotoUrl: string | undefined;
    if (fotoFile && fotoFile.size > 0) {
      fotoUrl = await uploadImage(fotoFile, "produk");
    }

    let fotoTambahanUrls: string[] | undefined;
    if (fotoTambahanFiles && fotoTambahanFiles.length > 0) {
      const uploads = fotoTambahanFiles
        .filter((f) => f.size > 0)
        .map((f) => uploadImage(f, "produk"));
      fotoTambahanUrls = await Promise.all(uploads);
    }

    return produkRepository.update(id, {
      ...validated,
      ...(fotoUrl && { foto: fotoUrl }),
      ...(fotoTambahanUrls && { fotoTambahan: fotoTambahanUrls }),
    });
  },

  toggleActive: (id: string, isActive: boolean) =>
    produkRepository.update(id, { isActive } as Partial<ProdukInput> & { isActive: boolean }),

  delete: (id: string) => produkRepository.delete(id),
};