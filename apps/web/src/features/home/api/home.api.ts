import axios from "axios";
import { SettingSection } from "../types/home.types";

export const homeApi = {
  getSettingSections: async (): Promise<SettingSection[]> => {
    const apiBaseUrl =
      process.env.NEXT_PUBLIC_SETTINGS_API_URL ||
      process.env.NEXT_PUBLIC_API_URL ||
      "https://bepthu-api.dev00.xyz";
    try {
      const response = await axios.get<SettingSection[]>(
        `${apiBaseUrl.replace(/\/$/, "")}/setting-sections?rootPage=home-ladding-page`,
      );
      return response.data || [];
    } catch {
      // Silent graceful fallback if settings server is offline/404
      return [];
    }
  },
};
