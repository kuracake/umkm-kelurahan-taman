"use server";

import { revalidatePath } from "next/cache";
import { websiteSettingService } from "../services/website-setting.service";

export async function updateWebsiteSettingAction(formData: FormData) {
  try {
    const data = {
      namaWebsite: formData.get("namaWebsite") as string,
      deskripsi: (formData.get("deskripsi") as string) || undefined,
      alamat: (formData.get("alamat") as string) || undefined,
      whatsapp: (formData.get("whatsapp") as string) || undefined,
      email: (formData.get("email") as string) || "",
      maps: (formData.get("maps") as string) || undefined,
    };

    await websiteSettingService.update(data);
    revalidatePath("/dashboard/pengaturan");
    return { success: true };
  } catch (error) {
    console.error(error);
    return { success: false, error: "Gagal menyimpan pengaturan" };
  }
}