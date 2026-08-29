import { unstable_cache } from "next/cache";
import { produkRepository } from "../repositories/produk.repository";
import { produkSchema, type ProdukInput, type ProdukRawInput } from "../schemas/produk.schema";
import { generateSlug } from "@/lib/slug";
import { uploadImage, deleteImage, deleteImages } from "@/lib/cloudinary";
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

  getActive: unstable_cache(
    () => produkRepository.findActive(),
    ["produk-active"],
    { tags: ["produk"] }
  ),

  getBySlug: (slug: string) => produkRepository.findBySlug(slug),

  getById: (id: string) =>
    prisma.produk.findUnique({
      where: { id },
      include: { umkm: true, kategori: true },
    }),

  create: async (data: ProdukRawInput, fotoFile?: File, fotoTambahanFiles?: File[]) => {
    const validated = produkSchema.parse(data);
    const slug = await generateUniqueSlug(validated.namaProduk);

    const fotoPromise =
      fotoFile && fotoFile.size > 0 ? uploadImage(fotoFile, "produk") : Promise.resolve(undefined);

    const fotoTambahanPromise =
      fotoTambahanFiles && fotoTambahanFiles.length > 0
        ? Promise.all(
            fotoTambahanFiles.filter((f) => f.size > 0).map((f) => uploadImage(f, "produk"))
          )
        : Promise.resolve<string[]>([]);

    const [fotoUrl, fotoTambahanUrls] = await Promise.all([fotoPromise, fotoTambahanPromise]);

    return produkRepository.create({
      ...validated,
      slug,
      foto: fotoUrl,
      fotoTambahan: fotoTambahanUrls,
    });
  },

  update: async (id: string, data: ProdukRawInput, fotoFile?: File, fotoTambahanFiles?: File[]) => {
    const validated = produkSchema.parse(data);
    const existing = await produkService.getById(id);

    let fotoUrl: string | undefined;
    if (fotoFile && fotoFile.size > 0) {
      fotoUrl = await uploadImage(fotoFile, "produk");
      if (existing?.foto) await deleteImage(existing.foto);
    }

    let fotoTambahanUrls: string[] | undefined;
    if (fotoTambahanFiles && fotoTambahanFiles.length > 0) {
      const uploads = fotoTambahanFiles
        .filter((f) => f.size > 0)
        .map((f) => uploadImage(f, "produk"));
      fotoTambahanUrls = await Promise.all(uploads);
      if (existing?.fotoTambahan?.length) await deleteImages(existing.fotoTambahan);
    }

    return produkRepository.update(id, {
      ...validated,
      ...(fotoUrl && { foto: fotoUrl }),
      ...(fotoTambahanUrls && { fotoTambahan: fotoTambahanUrls }),
    });
  },

  toggleActive: (id: string, isActive: boolean) =>
    produkRepository.update(id, { isActive } as Partial<ProdukInput> & { isActive: boolean }),

  delete: async (id: string) => {
    const existing = await produkService.getById(id);

    if (existing) {
      const urls = [existing.foto, ...(existing.fotoTambahan ?? [])].filter(
        (url): url is string => Boolean(url)
      );
      if (urls.length > 0) await deleteImages(urls);
    }

    return produkRepository.delete(id);
  },
};