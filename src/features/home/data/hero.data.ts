import { SettingSection } from "../types/home.types";
import { IMAGES } from "@/shared/constants/images";

export const heroMockData: SettingSection = {
  _id: "mock-hero-001",
  key: "home_hero",
  rootPage: "home-landing-page",
  title: "A HIỀN COFFEE – Since 1986",
  subtitle:
    "Giữa nhịp sống hối hả của Đà Nẵng, luôn có một góc nhỏ dành cho những ai yêu cà phê, yêu sự bình yên và những cuộc trò chuyện giản dị.",
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
