import { SettingSection } from "../types/home.types";
import { IMAGES } from "@/shared/constants/images";

export const heroMockData: SettingSection = {
  _id: "mock-hero-001",
  key: "home_hero",
  rootPage: "home-landing-page",
  title: "BẾP NHÀ THU - Ẩm thực là cách dịu dàng nhất để chạm đến trái tim con người!",
  subtitle:
    "Thưởng thức hương vị truyền thống Hội An xưa trong không gian ấm áp, cổ kính, giàu cảm xúc. Mỗi bữa ăn không chỉ là thưởng thức, mà là một hành trình.",
  image: IMAGES.hero.background,
  url: "#thuc-don",
  config: {
    hasTitle: true,
    hasSubtitle: true,
    hasContent: false,
    hasImage: true,
    hasUrl: true,
    hasGridItems: false,
    hasGridIconItems: false,
    hasGridTitleItems: false,
    hasImageForGrid: false,
    hasContentForGrid: false,
  },
  gridItems: [],
  position: 1,
  status: "active",
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
};
