import { SettingSection } from "../types/home.types";
import { IMAGES } from "@/shared/constants/images";

export const galleryMockData: SettingSection = {
  _id: "mock-gallery-001",
  key: "home_gallery",
  rootPage: "home-landing-page",
  title: "Góc nhỏ Bếp Nhà Thu",
  subtitle:
    "Khép lại những ồn ào, Bếp đón bạn vào một không gian an yên nơi góc phố Đào Duy Từ. Sự mộc mạc của cảnh vật hòa cùng cách chăm chút tỉ mỉ mang đến một chốn dừng chân đầm ấm, thân tình.",
  config: {
    hasTitle: true,
    hasSubtitle: true,
    hasContent: false,
    hasImage: false,
    hasUrl: false,
    hasGridItems: true,
    hasGridIconItems: false,
    hasGridTitleItems: false,
    hasImageForGrid: true,
    hasContentForGrid: false,
  },
  gridItems: IMAGES.gallery.map((img, idx) => ({
    key: `gallery-${idx + 1}`,
    image: img,
    position: idx,
  })),
  position: 6,
  status: "active",
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
};
