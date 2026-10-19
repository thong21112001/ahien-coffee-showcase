export interface FlavorProfile {
  aroma: number; // 1-10
  acidity: number; // 1-10
  sweetness: number; // 1-10
  body: number; // 1-10
  bitterness: number; // 1-10
}

export interface CoffeeQuizOption {
  id: string;
  labelVi: string;
  labelEn: string;
  descriptionVi: string;
  descriptionEn: string;
  icon?: string;
  scores: {
    intensity: number;
    sweetness: number;
    acidity: number;
    traditional: number;
  };
}

export interface CoffeeQuizQuestion {
  id: number;
  step: number;
  titleVi: string;
  titleEn: string;
  subtitleVi: string;
  subtitleEn: string;
  options: CoffeeQuizOption[];
}

export interface CoffeeRecommendation {
  id: string;
  nameVi: string;
  nameEn: string;
  taglineVi: string;
  taglineEn: string;
  descriptionVi: string;
  descriptionEn: string;
  image: string;
  priceVnd: number;
  priceUsd: number;
  origin: string;
  roastLevel: string;
  flavorProfile: FlavorProfile;
  badges: string[];
}
