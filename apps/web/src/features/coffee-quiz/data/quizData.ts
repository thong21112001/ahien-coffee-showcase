import { CoffeeQuizQuestion, CoffeeRecommendation } from "@ahien/types";

export const QUIZ_QUESTIONS: CoffeeQuizQuestion[] = [
  {
    id: 1,
    step: 1,
    titleVi: "Khoảnh khắc & Tâm trạng thưởng thức của bạn?",
    titleEn: "What is your current moment & coffee mood?",
    subtitleVi: "Chọn cảm giác bạn đang tìm kiếm",
    subtitleEn: "Select the vibe you are looking for",
    options: [
      {
        id: "morning-kick",
        labelVi: "Cần sự tỉnh táo mãnh liệt để bứt phá",
        labelEn: "Intense energy kick to conquer the day",
        descriptionVi: "Đậm đà, bùng nổ năng lượng, đánh thức mọi giác quan",
        descriptionEn: "Bold, punchy caffeine boost to sharpen focus",
        scores: { intensity: 9, sweetness: 3, acidity: 2, traditional: 9 },
      },
      {
        id: "afternoon-chill",
        labelVi: "Thảnh thơi nhâm nhi, thư giãn tâm hồn",
        labelEn: "Relaxed afternoon pause & unwind",
        descriptionVi: "Dịu nhẹ, ngát hương hoa quả, tươi mát và cân bằng",
        descriptionEn: "Subtle, floral, refreshing with clean lingering notes",
        scores: { intensity: 4, sweetness: 6, acidity: 8, traditional: 3 },
      },
      {
        id: "sweet-treat",
        labelVi: "Thèm chút ngọt béo chiều chuộng bản thân",
        labelEn: "Craving a creamy, sweet indulgence",
        descriptionVi: "Béo ngậy, ngọt ngào hòa quyện cùng vị cà phê êm ái",
        descriptionEn: "Rich, silky, dessert-like harmony of cream & coffee",
        scores: { intensity: 6, sweetness: 9, acidity: 3, traditional: 6 },
      },
    ],
  },
  {
    id: 2,
    step: 2,
    titleVi: "Hương vị cà phê đánh gục vị giác của bạn?",
    titleEn: "Which sensory flavor profile appeals to you most?",
    subtitleVi: "Lắng nghe khẩu vị đặc trưng của bạn",
    subtitleEn: "Listen to your distinct taste buds",
    options: [
      {
        id: "bitter-choco",
        labelVi: "Đắng êm, socola đen & hạt dẻ nướng",
        labelEn: "Bittersweet dark chocolate & toasted hazelnut",
        descriptionVi: "Đặc trưng Robusta Tây Nguyên rang mộc cổ điển",
        descriptionEn: "Classic highland Robusta with deep woody notes",
        scores: { intensity: 9, sweetness: 4, acidity: 1, traditional: 9 },
      },
      {
        id: "fruity-floral",
        labelVi: "Hương hoa cỏ, chua thanh quả mọng & mật ong",
        labelEn: "Jasmine floral, citrus zest & wild honey sweetness",
        descriptionVi: "Nét thanh tao của Arabica Cầu Đất độ cao 1.600m",
        descriptionEn: "Elegant high-altitude Cầu Đất Arabica terroir",
        scores: { intensity: 5, sweetness: 7, acidity: 9, traditional: 2 },
      },
      {
        id: "creamy-salted",
        labelVi: "Mặn mà mộc mạc, ngọt béo đọng nơi đầu lưỡi",
        labelEn: "Salted savory froth & velvety condensed milk",
        descriptionVi: "Đột phá hương vị cà phê muối & bọt kem nghệ thuật",
        descriptionEn: "Artisanal salted foam accentuating the dark roast",
        scores: { intensity: 7, sweetness: 8, acidity: 3, traditional: 7 },
      },
    ],
  },
  {
    id: 3,
    step: 3,
    titleVi: "Cách thưởng thức cà phê bạn muốn trải nghiệm?",
    titleEn: "How do you prefer your coffee to be prepared?",
    subtitleVi: "Phương pháp chiết xuất tinh hoa",
    subtitleEn: "The extraction ritual you resonate with",
    options: [
      {
        id: "traditional-phin",
        labelVi: "Phin nhôm truyền thống chắt chiu từng giọt",
        labelEn: "Traditional slow Phin drip ritual",
        descriptionVi: "Đậm chất văn hóa cà phê vỉa hè giao thoa hiện đại",
        descriptionEn: "Quintessential Vietnamese slow-living coffee craft",
        scores: { intensity: 9, sweetness: 5, acidity: 2, traditional: 10 },
      },
      {
        id: "coldbrew-steep",
        labelVi: "Cold Brew ngâm ủ lạnh 18 tiếng thanh khiết",
        labelEn: "18-Hour slow cold steeped brew",
        descriptionVi: "Mát lạnh sảng khoái, êm mượt, không hề gắt cổ",
        descriptionEn: "Crisp, silky smooth, gentle on the stomach",
        scores: { intensity: 4, sweetness: 7, acidity: 7, traditional: 1 },
      },
      {
        id: "signature-creative",
        labelVi: "Biến tấu sáng tạo Signature phong cách A Hiền",
        labelEn: "Creative Signature handcrafted concoction",
        descriptionVi: "Trải nghiệm mới lạ kết hợp sữa hạt, muối biển hoặc trái cây",
        descriptionEn: "Modern fusion of coffee, artisan creams & native fruits",
        scores: { intensity: 7, sweetness: 8, acidity: 5, traditional: 5 },
      },
    ],
  },
];

export const RECOMMENDATIONS: CoffeeRecommendation[] = [
  {
    id: "phin-robusta",
    nameVi: "Phin Robusta Buôn Ma Thuột Di Sản",
    nameEn: "Heritage Highland Robusta Phin",
    taglineVi: "Bản lĩnh cà phê Việt đậm đà chuẩn vị",
    taglineEn: "The bold soul of authentic Vietnamese coffee",
    descriptionVi:
      "Tuyển chọn từ những hạt Robusta chất lượng cao vùng Núi Min, chiết xuất qua phin nhôm truyền thống. Từng giọt cà phê sánh đặc, hương socola đen nồng nàn và hậu vị ngọt sâu lắng kéo dài.",
    descriptionEn:
      "Handpicked high-grade Robusta from volcanic basalt highlands, brewed through a traditional aluminum Phin. Notes of smoky cocoa, roasted hazelnut with a profound lingering finish.",
    image: "/phin.webp",
    priceVnd: 35000,
    priceUsd: 1.8,
    origin: "Buôn Ma Thuột, Đắk Lắk (750m)",
    roastLevel: "Dark Roast (Rang Đậm)",
    flavorProfile: {
      aroma: 8,
      acidity: 2,
      sweetness: 6,
      body: 10,
      bitterness: 9,
    },
    badges: ["Best Seller", "Signature Heritage", "Đậm Đà"],
  },
  {
    id: "arabica-specialty",
    nameVi: "Arabica Cầu Đất Specialty Pour-Over",
    nameEn: "Cầu Đất Arabica Specialty Pour-Over",
    taglineVi: "Nốt hương hoa quả tinh tế nơi cao nguyên mù sương",
    taglineEn: "Delicate floral & citrus nectar from the misty plateau",
    descriptionVi:
      "Trồng tại độ cao trên 1.600m thuộc Cầu Đất - Đà Lạt, hạt Arabica được sơ chế ướt tỉ mỉ. Mang đến tách cà phê thanh khiết, thơm ngát hương hoa nhài, chua thanh dễ chịu của cam vàng và mật ong rừng.",
    descriptionEn:
      "Cultivated at 1,600m above sea level in Dalat misty mountains. Fully washed to preserve radiant jasmine floral aromas, vibrant mandarin acidity, and a crisp wild honey aftertaste.",
    image: "/imageAbout2.webp",
    priceVnd: 48000,
    priceUsd: 2.3,
    origin: "Cầu Đất, Lâm Đồng (1.650m)",
    roastLevel: "Medium Light (Rang Vừa Sáng)",
    flavorProfile: {
      aroma: 10,
      acidity: 8,
      sweetness: 8,
      body: 5,
      bitterness: 3,
    },
    badges: ["Specialty Grade", "Single Origin", "Hương Hoa Trái"],
  },
  {
    id: "coldbrew-orange",
    nameVi: "Cold Brew Cam Vàng & Quế Rừng",
    nameEn: "Citrus & Cinnamon Artisan Cold Brew",
    taglineVi: "Giải khát thanh mát, êm dịu từng ngụm",
    taglineEn: "Crisp, silky refreshment steeped for 18 hours",
    descriptionVi:
      "Ngâm ủ lạnh chậm suốt 18 giờ trong nhiệt độ 4°C với hạt Arabica mộc, kết hợp cùng lát cam vàng sấy lạnh và thanh quế rừng Tây Bắc. Hương thơm cay ấm hòa quyện vị ngọt tự nhiên sảng khoái.",
    descriptionEn:
      "Slow-steeped at 4°C for 18 hours using 100% Arabica, infused with dried Valencia orange slices and highland cinnamon bark. Naturally sweet, thirst-quenching, and exceptionally smooth.",
    image: "/imageExperience2.webp",
    priceVnd: 45000,
    priceUsd: 2.1,
    origin: "Blend Cầu Đất & Buôn Ma Thuột",
    roastLevel: "Medium Roast (Rang Vừa)",
    flavorProfile: {
      aroma: 9,
      acidity: 7,
      sweetness: 9,
      body: 6,
      bitterness: 3,
    },
    badges: ["Trending", "Thanh Mát", "Low Acid"],
  },
  {
    id: "salt-cream-coffee",
    nameVi: "Cà Phê Muối Kem Béo Hoàng Gia",
    nameEn: "Royal Salted Cream Signature Coffee",
    taglineVi: "Vũ điệu mê hoặc giữa vị đắng và lớp kem béo mặn",
    taglineEn: "An enchanting interplay of bold brew & savory velvet cream",
    descriptionVi:
      "Món uống gây thương nhớ bậc nhất tại A Hiền. Cốt cà phê phin sánh đậm bên dưới được phủ lớp kem sữa đánh mịn cùng muối hồng Himalaya, tạo nên sự bùng nổ vị giác hài hòa đến say đắm.",
    descriptionEn:
      "The most beloved specialty at A Hiền. Rich slow-dripped Robusta crowned with a velvety layer of whipping cream and pink Himalayan mineral salt for an unforgettable savory-sweet ecstasy.",
    image: "/imageAbout1.webp",
    priceVnd: 42000,
    priceUsd: 2.0,
    origin: "Buôn Ma Thuột Traditional Blend",
    roastLevel: "Medium Dark",
    flavorProfile: {
      aroma: 8,
      acidity: 3,
      sweetness: 9,
      body: 9,
      bitterness: 7,
    },
    badges: ["Quán Đề Xuất", "Must Try", "Béo Mịn"],
  },
];

export function calculateRecommendation(selectedOptionIds: string[]): CoffeeRecommendation {
  if (selectedOptionIds.includes("fruity-floral") || selectedOptionIds.includes("afternoon-chill")) {
    return RECOMMENDATIONS[1]; // Arabica specialty
  }
  if (selectedOptionIds.includes("coldbrew-steep")) {
    return RECOMMENDATIONS[2]; // Cold Brew
  }
  if (selectedOptionIds.includes("sweet-treat") || selectedOptionIds.includes("creamy-salted")) {
    return RECOMMENDATIONS[3]; // Salted Cream
  }
  return RECOMMENDATIONS[0]; // Phin Robusta default
}
