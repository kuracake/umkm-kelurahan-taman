"use server";

import { revalidatePath } from "next/cache";
import { umkmService } from "../services/umkm.service";
import { requireAdmin } from "@/lib/require-admin";

export async function createUmkmAction(formData: FormData) {
  try {
    await requireAdmin();

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
    revalidatePath("/");
    revalidatePath("/umkm");
    return { success: true };
  } catch (error) {
    if (error instanceof Error && error.name === "UnauthorizedError") {
      return { success: false, error: "Unauthorized" };
    }
    console.error(error);
    return { success: false, error: "Gagal menambah UMKM" };
  }
}

export async function toggleUmkmActiveAction(id: string, isActive: boolean) {
  try {
    await requireAdmin();

    await umkmService.toggleActive(id, isActive);
    revalidatePath("/dashboard/umkm");
    revalidatePath("/");
    revalidatePath("/umkm");
    return { success: true };
  } catch (error) {
    if (error instanceof Error && error.name === "UnauthorizedError") {
      return { success: false, error: "Unauthorized" };
    }
    return { success: false, error: "Gagal mengubah status" };
  }
}

export async function updateUmkmAction(id: string, formData: FormData) {
  try {
    await requireAdmin();

    const data = {
      namaUmkm: formData.get("namaUmkm") as string,
      namaPemilik: formData.get("namaPemilik") as string,
      whatsapp: formData.get("whatsapp") as string,
      alamat: formData.get("alamat") as string,
      deskripsi: (formData.get("deskripsi") as string) || undefined,
    };

    const fotoFile = formData.get("foto") as File;

    await umkmService.update(id, data, fotoFile);
    revalidatePath("/dashboard/umkm");
    revalidatePath("/");
    revalidatePath("/umkm");
    revalidatePath(`/umkm/${id}`);
    return { success: true };
  } catch (error) {
    if (error instanceof Error && error.name === "UnauthorizedError") {
      return { success: false, error: "Unauthorized" };
    }
    console.error(error);
    return { success: false, error: "Gagal mengubah UMKM" };
  }
}

export async function deleteUmkmAction(id: string) {
  try {
    await requireAdmin();

    await umkmService.delete(id);
    revalidatePath("/dashboard/umkm");
    revalidatePath("/");
    revalidatePath("/umkm");
    return { success: true };
  } catch (error) {
    if (error instanceof Error && error.name === "UnauthorizedError") {
      return { success: false, error: "Unauthorized" };
    }
    return { success: false, error: "Gagal menghapus UMKM" };
  }
}