import type { MetadataRoute } from "next";
import { produkService } from "@/features/produk/services/produk.service";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://www.umkm-kelurahan-taman.my.id";
  const produks = await produkService.getActive();

  const produkUrls = produks.map((produk) => ({
    url: `${baseUrl}/produk/${produk.slug}`,
    lastModified: produk.updatedAt,
  }));

  return [
    { url: baseUrl, lastModified: new Date() },
    { url: `${baseUrl}/produk`, lastModified: new Date() },
    { url: `${baseUrl}/umkm`, lastModified: new Date() },
    { url: `${baseUrl}/tentang`, lastModified: new Date() },
    { url: `${baseUrl}/kontak`, lastModified: new Date() },
    ...produkUrls,
  ];
}