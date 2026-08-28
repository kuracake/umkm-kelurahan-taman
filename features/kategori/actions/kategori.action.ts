"use server";

import { revalidatePath } from "next/cache";
import { kategoriService } from "../services/kategori.service";
import type { KategoriInput } from "../schemas/kategori.schema";

export async function createKategoriAction(data: KategoriInput) {
  try {
    await kategoriService.create(data);
    revalidatePath("/dashboard/kategori");
    revalidatePath("/");
    revalidatePath("/produk");
    return { success: true };
  } catch (error) {
    return { success: false, error: "Gagal menambah kategori" };
  }
}

export async function updateKategoriAction(id: string, data: KategoriInput) {
  try {
    await kategoriService.update(id, data);
    revalidatePath("/dashboard/kategori");
    revalidatePath("/");
    revalidatePath("/produk");
    return { success: true };
  } catch (error) {
    return { success: false, error: "Gagal mengubah kategori" };
  }
}

export async function deleteKategoriAction(id: string) {
  try {
    await kategoriService.delete(id);
    revalidatePath("/dashboard/kategori");
    revalidatePath("/");
    revalidatePath("/produk");
    return { success: true };
  } catch (error) {
    return { success: false, error: "Gagal menghapus kategori" };
  }
}