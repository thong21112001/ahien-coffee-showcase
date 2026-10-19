import { SettingSection } from "../types/home.types";
import { IMAGES } from "@/shared/constants/images";

export const storyMockData: SettingSection = {
  _id: "mock-story-001",
  key: "home_story",
  rootPage: "home-landing-page",
  title: "Câu chuyện A Hiền Coffee",
  subtitle:
    "Từ năm 1986, A Hiền Coffee đã âm thầm hiện diện trong một con hẻm nhỏ giữa lòng Đà Nẵng. Chúng tôi tin rằng một ly cà phê ngon không chỉ đến từ hạt cà phê chất lượng, mà còn từ sự chân thành, sự tỉ mỉ và những khoảnh khắc bình yên được sẻ chia.",
  content: `Ý nghĩa A Hiền Coffee \n\n A Hiền Coffee không đơn thuần là một quán cà phê, mà là một góc nhỏ để những người yêu sự bình yên tìm về giữa nhịp sống hối hả. Nép mình trong con hẻm nhỏ của thành phố Đà Nẵng, quán gìn giữ nét mộc mạc của những quán cà phê xưa, nơi hương cà phê phin lan tỏa chậm rãi và mỗi vị khách đều được chào đón bằng sự chân thành. \n\n Từ năm 1986, chúng tôi luôn trân trọng những giá trị truyền thống của cà phê Việt. Mỗi ly cà phê được pha bằng phin theo cách quen thuộc, để từng giọt cà phê nhỏ xuống mang theo hương thơm đậm đà và sự kiên nhẫn – như chính tinh thần mà A Hiền Coffee muốn gửi gắm đến mọi người. Không gian của quán được tạo nên từ cây xanh và những góc nhỏ bình yên. \n\n Dù bạn ghé quán để bắt đầu một ngày mới, gặp gỡ bạn bè, làm việc hay đơn giản chỉ muốn tìm một khoảng lặng cho riêng mình, A Hiền Coffee luôn mong rằng nơi đây sẽ mang đến cảm giác gần gũi như trở về một góc quen thuộc. Với chúng tôi, mỗi ly cà phê không chỉ là một thức uống, mà còn là lời mời bạn sống chậm lại, tận hưởng hiện tại và lưu giữ những khoảnh khắc giản dị nhưng đáng nhớ.`,
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
  subtitle: "Những nguyên tắc tạo nên nét đặc trưng của A Hiền Coffee",
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
      title: "Cà phê là một hành trình",
      content:
        "Mỗi ly cà phê là sự hòa quyện giữa nhiều loại hạt được tuyển chọn kỹ lưỡng, tạo nên hương vị cân bằng, đậm đà và mang dấu ấn riêng của A Hiền Coffee.",
      position: 1,
    },
    {
      key: "value-2",
      icon: "clock",
      title: "Giữ trọn vị cà phê phin",
      content:
        "Chúng tôi vẫn gìn giữ phương pháp pha phin truyền thống, để từng giọt cà phê nhỏ xuống chậm rãi, lưu giữ trọn vẹn hương thơm và vị nguyên bản.",
      position: 2,
    },
    {
      key: "value-3",
      icon: "hand-point-up",
      title: "Pha bằng sự chân thành",
      content:
        "Không chỉ phục vụ một ly cà phê ngon, chúng tôi mong mang đến cảm giác gần gũi, bình yên và những khoảnh khắc đáng nhớ trong từng lần ghé quán.",
      position: 3,
    },
    {
      key: "value-4",
      icon: "leaf",
      title: "Blend tạo nên khác biệt",
      content:
        "Mỗi mẻ cà phê là sự phối trộn hài hòa giữa nhiều loại hạt với tỷ lệ riêng, tạo nên hương thơm đặc trưng, hậu vị êm và dấu ấn chỉ có tại A Hiền Coffee.",
      position: 4,
    },
  ],
  position: 3,
  status: "active",
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
};
