import { SettingSection } from "../types/home.types";
import { IMAGES } from "@/shared/constants/images";

export const storyMockData: SettingSection = {
  _id: "mock-story-001",
  key: "home_story",
  rootPage: "home-landing-page",
  title: "Câu chuyện Bếp nhà Thu",
  subtitle:
    "Không chỉ là một căn bếp, Bếp Nhà Thu là nơi lưu giữ những ký ức Hội An xưa – nơi mỗi món ăn được nấu bằng sự chân thành, kể lại câu chuyện về con người, văn hoá và những điều giản dị nhưng đầy sâu sắc.",
  content: `Ý nghĩa Bếp Nhà Thu\n\nBếp Nhà Thu không chỉ là tên của một quán ăn, mà còn là lời hứa giữ gìn và phát huy những giá trị văn hóa ẩm thực đặc sắc của vùng đất Quảng Nam - Đà Nẵng. Chúng tôi mong muốn mang đến một không gian ấm cúng, gợi nhớ lại những kỷ niệm gia đình đầm ấm xung quanh bếp lửa quê.\n\nGiữa nhịp sống vội vã của hiện đại, Bếp Nhà Thu như một khoảng lặng bình yên, nơi thực khách có thể cảm nhận rõ nét từng nguyên liệu tươi ngon được chế biến theo công thức cổ truyền tỉ mỉ. Không chỉ đơn thuần là việc phục vụ bữa ăn, Bếp Nhà Thu còn truyền tải sự hiếu khách, chân chất của con người miền Trung đến từng thực khách ghé chân.\n\nTừ đĩa cơm gà thơm dẻo, sợi mì Cao Lầu vàng óng dai mềm cho đến những chiếc bánh lọc, nem lụi nướng thơm nức mũi, tất cả đều được chế biến bằng cả tấm lòng của đội ngũ đầu bếp giàu tâm huyết tại Bếp Nhà Thu.`,
  config: {
    hasTitle: true,
    hasSubtitle: true,
    hasContent: true,
    hasImage: false,
    hasUrl: false,
    hasGridItems: true,
    hasGridIconItems: false,
    hasGridTitleItems: false,
    hasImageForGrid: true,
    hasContentForGrid: false,
  },
  gridItems: [
    {
      key: "story-img-1",
      image: IMAGES.about.image1,
      position: 1,
    },
    {
      key: "story-img-2",
      image: IMAGES.about.image2,
      position: 2,
    },
    {
      key: "story-img-3",
      image: IMAGES.about.image3,
      position: 3,
    },
  ],
  position: 2,
  status: "active",
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
};

export const valuesMockData: SettingSection = {
  _id: "mock-values-001",
  key: "home_values",
  rootPage: "home-landing-page",
  title: "Giá trị cốt lõi",
  subtitle: "Những nguyên tắc tạo nên nét đặc trưng của Bếp Nhà Thu",
  config: {
    hasTitle: true,
    hasSubtitle: true,
    hasContent: false,
    hasImage: false,
    hasUrl: false,
    hasGridItems: true,
    hasGridIconItems: true,
    hasGridTitleItems: true,
    hasImageForGrid: false,
    hasContentForGrid: true,
  },
  gridItems: [
    {
      key: "value-1",
      icon: "book",
      title: "Ẩm thực là câu chuyện",
      content:
        "Mỗi món ăn đều mang trong mình một câu chuyện về con người, về đất đai và niềm vui sum vầy.",
      position: 1,
    },
    {
      key: "value-2",
      icon: "clock",
      title: "Giữ trọn hương vị xưa",
      content:
        "Chúng tôi tôn trọng và truyền tải hương vị truyền thống Hội An một cách trọn vẹn và tỉ mỉ nhất.",
      position: 2,
    },
    {
      key: "value-3",
      icon: "hand-point-up",
      title: "Trải nghiệm chạm cảm xúc",
      content:
        "Không chỉ mang lại món ăn ngon, chúng tôi hướng tới sự chân thành và hiếu khách chạm đến trái tim.",
      position: 3,
    },
    {
      key: "value-4",
      icon: "leaf",
      title: "Khởi nguồn tươi nguyên",
      content:
        "Toàn bộ nguyên liệu đều được tuyển chọn kỹ lưỡng, đảm bảo độ tươi ngon, sạch sẽ và an toàn mỗi ngày.",
      position: 4,
    },
  ],
  position: 3,
  status: "active",
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
};
