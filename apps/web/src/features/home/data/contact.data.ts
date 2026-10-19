import { SettingSection } from "../types/home.types";
import { IMAGES } from "@/shared/constants/images";

export const contactMockData: SettingSection = {
  _id: "mock-contact-001",
  key: "home_contact",
  rootPage: "home-landing-page",
  title: "Một Góc Bình Yên Giữa Lòng Đà Nẵng - Since 1986",
  subtitle:
    "Từ năm 1986, A Hiền Coffee luôn gìn giữ hương vị cà phê truyền thống và sự chân thành trong từng ly cà phê. Chúng tôi hy vọng mỗi vị khách khi ghé quán đều tìm thấy một góc nhỏ để nghỉ ngơi, trò chuyện, làm việc hoặc đơn giản là tận hưởng một khoảng lặng cho riêng mình.",
  content:
    "Nép mình trong con hẻm nhỏ, A Hiền Coffee mang đến một không gian mộc mạc, nơi hương cà phê phin lan tỏa trong ánh nắng dịu và những câu chuyện đời thường. Chỉ cần bước vào, bạn sẽ cảm nhận được sự bình yên rất riêng giữa nhịp sống thành phố.",
  image: IMAGES.contact.image,
  config: {
    hasTitle: true,
    hasSubtitle: true,
    hasContent: true,
    hasImage: true,
    hasUrl: false,
    hasGridItems: true,
    hasGridIconItems: true,
    hasGridTitleItems: true,
    hasImageForGrid: false,
    hasContentForGrid: true,
  },
  gridItems: [
    {
      key: "contact-phone",
      title: "Hotline / Zalo",
      content: "0367262415",
      icon: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6.62 10.79a15.053 15.053 0 006.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" fill="#955127"/></svg>`,
      position: 1,
    },
    {
      key: "contact-email",
      title: "Email",
      content: "quangthong211101@gmail.com",
      icon: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" fill="#955127"/></svg>`,
      position: 2,
    },
    {
      key: "contact-address",
      title: "Địa chỉ",
      content: "K514/5 Hoàng Diệu, phường Hòa Cường, Thành phố Đà Nẵng",
      icon: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" fill="#955127"/></svg>`,
      position: 3,
    },
  ],
  position: 7,
  status: "active",
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
};
