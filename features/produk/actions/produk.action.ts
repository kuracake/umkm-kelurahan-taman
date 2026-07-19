"use server";

import { revalidatePath } from "next/cache";
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

    await produkService.create(data, fotoFile);
    revalidatePath("/dashboard/produk");
    return { success: true };
  } catch (error) {
    console.error(error);
    return { success: false, error: "Gagal menambah produk" };
  }
}

export async function toggleProdukActiveAction(id: string, isActive: boolean) {
  try {
    await produkService.toggleActive(id, isActive);
    revalidatePath("/dashboard/produk");
    return { success: true };
  } catch (error) {
    return { success: false, error: "Gagal mengubah status" };
  }
}

export async function deleteProdukAction(id: string) {
  try {
    await produkService.delete(id);
    revalidatePath("/dashboard/produk");
    return { success: true };
  } catch (error) {
    return { success: false, error: "Gagal menghapus produk" };
  }
}