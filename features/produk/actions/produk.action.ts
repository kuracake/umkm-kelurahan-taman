"use server";

import { revalidatePath, revalidateTag } from "next/cache";
import { produkService } from "../services/produk.service";

export async function createProdukAction(formData: FormData) {
  try {
    const data = {
      namaProduk: formData.get("namaProduk") as string,
      deskripsi: (formData.get("deskripsi") as string) || undefined,
      harga: formData.get("harga") as string,
      bestSeller: formData.get("bestSeller") === "on",
      umkmId: formData.get("umkmId") as string,
      kategoriId: formData.get("kategoriId") as string,
    };

    const fotoFile = formData.get("foto") as File;
    const fotoTambahanFiles = formData.getAll("fotoTambahan") as File[];

    await produkService.create(data, fotoFile, fotoTambahanFiles);
    revalidatePath("/dashboard/produk");
    revalidatePath("/");
    revalidatePath("/produk");
    revalidateTag("produk", "max");
    return { success: true };
  } catch (error) {
    console.error(error);
    return { success: false, error: "Gagal menambah produk" };
  }
}

export async function toggleProdukActiveAction(id: string, isActive: boolean) {
  try {
    const updated = await produkService.toggleActive(id, isActive);
    revalidatePath("/dashboard/produk");
    revalidatePath("/");
    revalidatePath("/produk");
    revalidateTag("produk","max");
    if (updated?.slug) revalidatePath(`/produk/${updated.slug}`);
    return { success: true };
  } catch {
    return { success: false, error: "Gagal mengubah status" };
  }
}

export async function updateProdukAction(id: string, formData: FormData) {
  try {
    const data = {
      namaProduk: formData.get("namaProduk") as string,
      deskripsi: (formData.get("deskripsi") as string) || undefined,
      harga: formData.get("harga") as string,
      bestSeller: formData.get("bestSeller") === "on",
      umkmId: formData.get("umkmId") as string,
      kategoriId: formData.get("kategoriId") as string,
    };

    const fotoFile = formData.get("foto") as File;
    const fotoTambahanFiles = formData.getAll("fotoTambahan") as File[];

    const updated = await produkService.update(id, data, fotoFile, fotoTambahanFiles);
    revalidatePath("/dashboard/produk");
    revalidatePath("/");
    revalidatePath("/produk");
    revalidateTag("produk","max");
    if (updated?.slug) revalidatePath(`/produk/${updated.slug}`);
    return { success: true };
  } catch (error) {
    console.error(error);
    return { success: false, error: "Gagal mengubah produk" };
  }
}

export async function deleteProdukAction(id: string) {
  try {
    await produkService.delete(id);
    revalidatePath("/dashboard/produk");
    revalidatePath("/");
    revalidatePath("/produk");
    revalidateTag("produk", "max");
    return { success: true };
  } catch {
    return { success: false, error: "Gagal menghapus produk" };
  }
}