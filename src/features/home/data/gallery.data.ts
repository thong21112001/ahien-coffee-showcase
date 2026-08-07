import { SettingSection } from "../types/home.types";
import { IMAGES } from "@/shared/constants/images";

export const galleryMockData: SettingSection = {
  _id: "mock-gallery-001",
  key: "home_gallery",
  rootPage: "home-landing-page",
  title: "A Hiền Coffee – Since 1986",
  subtitle:
    "Từ năm 1986, A Hiền Coffee luôn gìn giữ hương vị cà phê truyền thống và sự chân thành trong từng ly cà phê. Chúng tôi hy vọng mỗi vị khách khi ghé quán đều tìm thấy một góc nhỏ để nghỉ ngơi, trò chuyện, làm việc hoặc đơn giản là tận hưởng một khoảng lặng cho riêng mình.",
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
