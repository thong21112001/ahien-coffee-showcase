import { SettingSection } from "../types/home.types";
import { homeApi } from "../api/home.api";
import {
  heroMockData,
  storyMockData,
  valuesMockData,
  experienceMockData,
  featuredDishMockData,
  galleryMockData,
  contactMockData,
  menuSectionMockData,
} from "../data";

const USE_MOCK = process.env.NEXT_PUBLIC_USE_MOCK_DATA === "true";

const mockSections: SettingSection[] = [
  heroMockData,
  storyMockData,
  valuesMockData,
  experienceMockData,
  featuredDishMockData,
  galleryMockData,
  contactMockData,
  menuSectionMockData,
];

export const homeService = {
  getSections: async (): Promise<SettingSection[]> => {
    if (USE_MOCK) {
      // Simulate light async latency for realistic experience
      await new Promise((resolve) => setTimeout(resolve, 150));
      return mockSections;
    }
    return homeApi.getSettingSections();
  },

  getSectionByKey: async (key: string): Promise<SettingSection | undefined> => {
    const sections = await homeService.getSections();
    return sections.find((s) => s.key === key);
  },
};
