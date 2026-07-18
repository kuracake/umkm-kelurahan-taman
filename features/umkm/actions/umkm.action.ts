"use server";

import { revalidatePath } from "next/cache";
import { umkmService } from "../services/umkm.service";

export async function createUmkmAction(formData: FormData) {
  try {
    const data = {
      namaUmkm: formData.get("namaUmkm") as string,
      namaPemilik: formData.get("namaPemilik") as string,
      whatsapp: formData.get("whatsapp") as string,
      alamat: formData.get("alamat") as string,
      deskripsi: (formData.get("deskripsi") as string) || undefined,
    };

    const fotoFile = formData.get("foto") as File;

    await umkmService.create(data, fotoFile);
    revalidatePath("/dashboard/umkm");
    return { success: true };
  } catch (error) {
    console.error(error);
    return { success: false, error: "Gagal menambah UMKM" };
  }
}

export async function toggleUmkmActiveAction(id: string, isActive: boolean) {
  try {
    await umkmService.toggleActive(id, isActive);
    revalidatePath("/dashboard/umkm");
    return { success: true };
  } catch (error) {
    return { success: false, error: "Gagal mengubah status" };
  }
}

export async function deleteUmkmAction(id: string) {
  try {
    await umkmService.delete(id);
    revalidatePath("/dashboard/umkm");
    return { success: true };
  } catch (error) {
    return { success: false, error: "Gagal menghapus UMKM" };
  }
}