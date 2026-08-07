import { SettingSection } from "../types/home.types";
import { IMAGES } from "@/shared/constants/images";

export const experienceMockData: SettingSection = {
  _id: "mock-experience-001",
  key: "home_experience",
  rootPage: "home-landing-page",
  title: "Trải nghiệm tại Bếp Nhà Thu",
  subtitle:
    "Mỗi hành trình tại Bếp Nhà Thu bắt đầu từ không gian mộc mạc tinh tế, chạm đến vị giác bằng những hương vị Hội An nguyên bản và đọng lại thành những kỷ niệm vương vấn đến mai sau.",
  image: IMAGES.experience.background,
  config: {
    hasTitle: true,
    hasSubtitle: true,
    hasContent: false,
    hasImage: true,
    hasUrl: false,
    hasGridItems: true,
    hasGridIconItems: false,
    hasGridTitleItems: true,
    hasImageForGrid: true,
    hasContentForGrid: true,
  },
  gridItems: [
    {
      key: "exp-1",
      title: "Bước vào không gian",
      content: "Cảm nhận sự ấm áp từ ánh đèn lồng, gỗ cũ, và không khí dễ chịu",
      image: IMAGES.experience.image1,
      position: 1,
    },
    {
      key: "exp-2",
      title: "Thưởng thức món ăn",
      content: "Khám phá hương vị truyền thống được nấu nướng tỉ mỉ với tình yêu",
      image: IMAGES.experience.image2,
      position: 2,
    },
    {
      key: "exp-3",
      title: "Trọn vẹn cảm xúc",
      content: "Khép lại hành trình, gói kèm hơi ấm và nụ cười hiếu khách",
      image: IMAGES.experience.image3,
      position: 3,
    },
  ],
  position: 4,
  status: "active",
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
};
