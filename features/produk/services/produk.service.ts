import { produkRepository } from "../repositories/produk.repository";
import { produkSchema, type ProdukInput, type ProdukRawInput } from "../schemas/produk.schema";
import { generateSlug } from "@/lib/slug";
import { uploadImage } from "@/lib/cloudinary";

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

  create: async (data: ProdukRawInput, fotoFile?: File) => {
    const validated = produkSchema.parse(data);
    const slug = await generateUniqueSlug(validated.namaProduk);

    let fotoUrl: string | undefined;
    if (fotoFile && fotoFile.size > 0) {
      fotoUrl = await uploadImage(fotoFile, "produk");
    }

    return produkRepository.create({ ...validated, slug, foto: fotoUrl });
  },

  toggleActive: (id: string, isActive: boolean) =>
    produkRepository.update(id, { isActive } as Partial<ProdukInput> & { isActive: boolean }),

  delete: (id: string) => produkRepository.delete(id),
};