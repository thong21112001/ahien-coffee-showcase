import axios from "axios";
import { SettingSection } from "../types/home.types";

export const homeApi = {
  getSettingSections: async (): Promise<SettingSection[]> => {
    const apiBaseUrl =
      process.env.NEXT_PUBLIC_SETTINGS_API_URL || "http://103.9.211.99:3028";
    try {
      const response = await axios.get<SettingSection[]>(
        `${apiBaseUrl}/setting-sections?rootPage=home-ladding-page`,
      );
      return response.data || [];
    } catch (error) {
      console.error("Error fetching setting sections:", error);
      return [];
    }
  },
};
