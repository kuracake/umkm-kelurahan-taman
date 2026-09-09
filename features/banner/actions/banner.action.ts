"use server";

import { revalidatePath } from "next/cache";
import { bannerService } from "../services/banner.service";
import { requireAdmin } from "@/lib/require-admin";

export async function createBannerAction(formData: FormData) {
  try {
    await requireAdmin();

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
    if (error instanceof Error && error.name === "UnauthorizedError") {
      return { success: false, error: "Unauthorized" };
    }
    console.error(error);
    const message = error instanceof Error ? error.message : "Gagal menambah banner";
    return { success: false, error: message };
  }
}

export async function toggleBannerActiveAction(id: string, isActive: boolean) {
  try {
    await requireAdmin();

    await bannerService.toggleActive(id, isActive);
    revalidatePath("/dashboard/banner");
    revalidatePath("/");
    return { success: true };
  } catch (error) {
    if (error instanceof Error && error.name === "UnauthorizedError") {
      return { success: false, error: "Unauthorized" };
    }
    return { success: false, error: "Gagal mengubah status" };
  }
}

export async function deleteBannerAction(id: string) {
  try {
    await requireAdmin();

    await bannerService.delete(id);
    revalidatePath("/dashboard/banner");
    revalidatePath("/");
    return { success: true };
  } catch (error) {
    if (error instanceof Error && error.name === "UnauthorizedError") {
      return { success: false, error: "Unauthorized" };
    }
    return { success: false, error: "Gagal menghapus banner" };
  }
}