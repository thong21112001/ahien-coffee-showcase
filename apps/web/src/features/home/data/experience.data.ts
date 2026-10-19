import { SettingSection } from "../types/home.types";
import { IMAGES } from "@/shared/constants/images";

export const experienceMockData: SettingSection = {
  _id: "mock-experience-001",
  key: "home_experience",
  rootPage: "home-landing-page",
  title: "Trải nghiệm tại A Hiền Coffee",
  subtitle:
    "Từ năm 1986, mỗi ly cà phê tại A Hiền Coffee được tạo nên từ sự hòa quyện của nhiều hạt cà phê tuyển chọn, rang xay theo công thức riêng và pha phin chậm rãi. Không chỉ là một thức uống, đó là hương vị gắn liền với ký ức và những cuộc gặp gỡ qua nhiều thế hệ.",
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
      title: "Chọn lọc hương vị",
      content: "Những hạt cà phê được phối trộn theo công thức truyền thống để tạo nên hương thơm cân bằng và đậm đà.",
      image: IMAGES.experience.image1,
      position: 1,
    },
    {
      key: "exp-2",
      title: "Pha phin chậm rãi",
      content: "Từng giọt cà phê nhỏ xuống từ chiếc phin, giữ trọn hương thơm và vị nguyên bản trong từng tách.",
      image: IMAGES.experience.image2,
      position: 2,
    },
    {
      key: "exp-3",
      title: "Thưởng thức & lưu giữ",
      content: "Thưởng thức một ly cà phê mang dấu ấn từ năm 1986, nơi mỗi cuộc trò chuyện đều trở nên gần gũi và đáng nhớ.",
      image: IMAGES.experience.image3,
      position: 3,
    },
  ],
  position: 4,
  status: "active",
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
};
