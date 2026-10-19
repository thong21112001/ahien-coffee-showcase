import { FlavorProfile } from "./quiz";

export interface MenuItem {
  id: string;
  nameVi: string;
  nameEn: string;
  category: "signature" | "traditional" | "coldbrew" | "specialty" | "tea";
  priceVnd: number;
  priceUsd: number;
  image: string;
  descriptionVi: string;
  descriptionEn: string;
  isPopular?: boolean;
  flavorProfile?: FlavorProfile;
}
