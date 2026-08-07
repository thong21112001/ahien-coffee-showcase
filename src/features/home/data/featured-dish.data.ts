import { SettingSection } from "../types/home.types";
import { IMAGES } from "@/shared/constants/images";

export const featuredDishMockData: SettingSection = {
  _id: "mock-featured-dish-001",
  key: "home_featured_dish",
  rootPage: "home-landing-page",
  title: "Cà phê phin A Hiền - Since 1986",
  subtitle: "Hương vị đặc trưng",
  description:
    "Được phối trộn từ nhiều loại hạt cà phê theo công thức riêng từ năm 1986, mỗi ly cà phê phin A Hiền mang hương thơm đậm đà, vị cân bằng và hậu ngọt nhẹ. Từng giọt cà phê nhỏ chậm qua phin, giữ trọn tinh túy của hạt rang, tạo nên một trải nghiệm mộc mạc nhưng khó quên.",
  content:
    "Không chạy theo xu hướng, A Hiền Coffee vẫn giữ cách pha phin truyền thống suốt nhiều thập kỷ. Mỗi ly cà phê là sự kết hợp giữa chất lượng hạt, kỹ thuật rang xay và thời gian chiết xuất vừa đủ, để khi thưởng thức, bạn cảm nhận được hương thơm lan tỏa, vị đậm vừa phải và dư vị kéo dài sau từng ngụm.",
  image: IMAGES.featuredDish,
  url: "#lien-he",
  config: {
    hasTitle: true,
    hasSubtitle: true,
    hasContent: true,
    hasImage: true,
    hasUrl: true,
    hasGridItems: false,
    hasGridIconItems: false,
    hasGridTitleItems: false,
    hasImageForGrid: false,
    hasContentForGrid: false,
  },
  gridItems: [],
  position: 5,
  status: "active",
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
};
