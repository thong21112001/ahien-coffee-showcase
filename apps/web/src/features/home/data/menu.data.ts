import { SettingSection } from "../types/home.types";
import { ProductCategory, Product, FeaturedCombo } from "@/features/menu/types/menu.types";
import { IMAGES } from "@/shared/constants/images";

export const menuSectionMockData: SettingSection = {
  _id: "mock-menu-section-001",
  key: "menu_food",
  rootPage: "home-landing-page",
  title: "Cà phê phin tại A Hiền Coffee",
  subtitle:
    "Nơi hương cà phê phin lan tỏa trong ánh nắng dịu và những câu chuyện đời thường. Chỉ cần bước vào, bạn sẽ cảm nhận được sự bình yên rất riêng giữa nhịp sống thành phố.",
  config: {
    hasTitle: true,
    hasSubtitle: true,
    hasContent: false,
    hasImage: false,
    hasUrl: false,
    hasGridItems: false,
    hasGridIconItems: false,
    hasGridTitleItems: false,
    hasImageForGrid: false,
    hasContentForGrid: false,
  },
  gridItems: [],
  position: 4.5,
  status: "active",
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
};

export const categoriesMockData: ProductCategory[] = [
  {
    _id: "cat-ca-phe",
    id: "cat-ca-phe",
    name: "Cà phê",
    slug: "ca-phe",
    description: "Cà phê phin hương vị truyền thống để trọn vẹn một ngày làm việc.",
  },
  {
    _id: "cat-nuoc-giai-khat",
    id: "cat-nuoc-giai-khat",
    name: "Nước giải khát",
    slug: "nuoc-giai-khat",
    description: "Nước ngọt, khoáng lạt, nước suối để giải nhiệt cơ thể.",
  },
  {
    _id: "cat-siro",
    id: "cat-siro",
    name: "Siro",
    slug: "siro",
    description: "Một ly siro ngon, giá hợp lý thì sao nhỉ.",
  },
  {
    _id: "cat-sinh-to",
    id: "cat-sinh-to",
    name: "Sinh tố",
    slug: "sinh-to",
    description: "Ly sinh tố từ trái cây là sở thích của bạn.",
  },
];

export const productsMockData: (Product & { category?: string })[] = [
  {
    _id: "prod-ca-phe-sua",
    id: "prod-ca-phe-sua",
    name: "Cà phê sữa",
    nameLocalized: { en: "Coffee with milk" },
    slug: "ca-phe-sua",
    description: "Giá chỉ từ 12k -> 15k",
    price: 12000,
    thumbnail: IMAGES.common.placeholder,
    image: IMAGES.common.placeholder,
    category: "cat-ca-phe",
    status: "active",
  },
  {
    _id: "prod-ca-phe-den",
    id: "prod-ca-phe-den",
    name: "Cà phê đen",
    nameLocalized: { en: "Coffee with sugar" },
    slug: "ca-phe-den",
    description: "Giá chỉ từ 10k -> 15k",
    price: 10000,
    thumbnail: IMAGES.common.placeholder,
    image: IMAGES.common.placeholder,
    category: "cat-ca-phe",
    status: "active",
  },
];

// export const combosMockData: FeaturedCombo[] = [
//   {
//     _id: "set-1",
//     id: "set-1",
//     name: "Set Menu Phố Cổ",
//     type: "set-menu",
//     price: 189000,
//     products: [
//       {
//         _id: "prod-caolau",
//         id: "prod-caolau",
//         name: "Cao Lầu Hội An",
//         nameLocalized: { en: "Hoi An Cao Lau Noodles" },
//         image: IMAGES.featuredDish,
//         quantity: 1,
//       } as any,
//       {
//         _id: "prod-banh-dap",
//         id: "prod-banh-dap",
//         name: "Bánh Đập Hến Xào",
//         nameLocalized: { en: "Crushed Rice Paper with Sauteed Clams" },
//         image: IMAGES.about.image3,
//         quantity: 1,
//       } as any,
//       {
//         _id: "prod-che-hat-sen",
//         id: "prod-che-hat-sen",
//         name: "Chè Hạt Sen Long Nhãn",
//         nameLocalized: { en: "Lotus Seed Sweet Soup" },
//         image: IMAGES.experience.image2,
//         quantity: 1,
//       } as any,
//     ],
//   },
//   {
//     _id: "set-2",
//     id: "set-2",
//     name: "Set Menu Sum Vầy",
//     type: "set-menu",
//     price: 249000,
//     products: [
//       {
//         _id: "prod-com-ga",
//         id: "prod-com-ga",
//         name: "Cơm gà Hội An",
//         nameLocalized: { en: "Hoi An Chicken Rice" },
//         image: IMAGES.about.image1,
//         quantity: 1,
//       } as any,
//       {
//         _id: "prod-mi-quang",
//         id: "prod-mi-quang",
//         name: "Mì Quảng Tôm Thịt",
//         nameLocalized: { en: "Quang Noodle" },
//         image: IMAGES.about.image2,
//         quantity: 1,
//       } as any,
//       {
//         _id: "prod-che-hat-sen",
//         id: "prod-che-hat-sen",
//         name: "Chè Hạt Sen Long Nhãn",
//         nameLocalized: { en: "Lotus Seed Sweet Soup" },
//         image: IMAGES.experience.image2,
//         quantity: 1,
//       } as any,
//     ],
//   },
//   {
//     _id: "combo-1",
//     id: "combo-1",
//     name: "Combo Đặc Sản 1",
//     type: "combo",
//     price: 120000,
//     products: [
//       {
//         _id: "prod-caolau",
//         id: "prod-caolau",
//         name: "Cao Lầu Hội An",
//         nameLocalized: { en: "Hoi An Cao Lau Noodles" },
//         image: IMAGES.featuredDish,
//         quantity: 1,
//       } as any,
//       {
//         _id: "prod-che-hat-sen",
//         id: "prod-che-hat-sen",
//         name: "Chè Hạt Sen Long Nhãn",
//         nameLocalized: { en: "Lotus Seed Sweet Soup" },
//         image: IMAGES.experience.image2,
//         quantity: 1,
//       } as any,
//     ],
//   },
// ];
