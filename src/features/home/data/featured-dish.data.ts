import { SettingSection } from "../types/home.types";
import { IMAGES } from "@/shared/constants/images";

export const featuredDishMockData: SettingSection = {
  _id: "mock-featured-dish-001",
  key: "home_featured_dish",
  rootPage: "home-landing-page",
  title: "Cao Lầu - Trọn vẹn hồn phố cổ",
  subtitle: "Món ăn đặc sản",
  description:
    "Sợi mì vàng óng quyện cùng nước dùng xíu đậm đà, thịt xá xíu mềm thơm và tóp mỡ giòn rụm. Thưởng thức một bát Cao Lầu tại Bếp Nhà Thu là chạm vào một câu chuyện thấm đượm tình đất, tình người và tinh hoa văn hóa truyền đời của phố cổ Hội An.",
  content:
    "Sợi mì vàng óng quyện cùng nước dùng xíu đậm đà, thịt xá xíu mềm thơm và tóp mỡ giòn rụm. Thưởng thức một bát Cao Lầu tại Bếp Nhà Thu là chạm vào một câu chuyện thấm đượm tình đất, tình người và tinh hoa văn hóa truyền đời của phố cổ Hội An.",
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
