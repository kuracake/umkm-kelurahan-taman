import { prisma } from "@/lib/prisma";
import type { WebsiteSettingInput } from "../schemas/website-setting.schema";

export const websiteSettingRepository = {
  find: () => prisma.websiteSetting.findFirst(),

  upsert: (data: WebsiteSettingInput) =>
    prisma.websiteSetting.upsert({
      where: { id: "singleton" },
      update: data,
      create: { id: "singleton", ...data },
    }),
};