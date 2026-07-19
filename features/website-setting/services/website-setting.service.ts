import { websiteSettingRepository } from "../repositories/website-setting.repository";
import { websiteSettingSchema, type WebsiteSettingInput } from "../schemas/website-setting.schema";

export const websiteSettingService = {
  get: () => websiteSettingRepository.find(),

  update: async (data: WebsiteSettingInput) => {
    const validated = websiteSettingSchema.parse(data);
    return websiteSettingRepository.upsert(validated);
  },
};