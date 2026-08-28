"use server";

import { revalidatePath } from "next/cache";
import { bannerService } from "../services/banner.service";

export async function createBannerAction(formData: FormData) {
  try {
    const data = {
      judul: formData.get("judul") as string,
      subjudul: (formData.get("subjudul") as string) || undefined,
    };

    const gambarFile = formData.get("gambar") as File;

    await bannerService.create(data, gambarFile);
    revalidatePath("/dashboard/banner");
    revalidatePath("/");
    return { success: true };
  } catch (error) {
    console.error(error);
    const message = error instanceof Error ? error.message : "Gagal menambah banner";
    return { success: false, error: message };
  }
}

export async function toggleBannerActiveAction(id: string, isActive: boolean) {
  try {
    await bannerService.toggleActive(id, isActive);
    revalidatePath("/dashboard/banner");
    revalidatePath("/");
    return { success: true };
  } catch (error) {
    return { success: false, error: "Gagal mengubah status" };
  }
}

export async function deleteBannerAction(id: string) {
  try {
    await bannerService.delete(id);
    revalidatePath("/dashboard/banner");
    revalidatePath("/");
    return { success: true };
  } catch (error) {
    return { success: false, error: "Gagal menghapus banner" };
  }
}