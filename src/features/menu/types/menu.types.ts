export interface LocalizedItem {
  localize?: string;
  locale?: string;
  content?: string;
  text?: string;
  en?: string;
}

export type NameLocalized = LocalizedItem[] | { en?: string; [key: string]: string | undefined } | undefined;

export interface ProductVariant {
  id?: string;
  _id?: string;
  price?: number;
  price_selling?: number;
  price_listed?: number;
}

export interface ProductImage {
  url: string;
}

export interface Product {
  _id?: string;
  id?: string;
  name: string;
  nameLocalized?: NameLocalized;
  slug?: string;
  description?: string;
  shortDescription?: string;
  price?: number;
  thumbnail?: string;
  image?: string;
  listImage?: ProductImage[];
  status?: string;
  stock?: number;
  variants?: ProductVariant[];
}

export interface ProductCategory {
  _id?: string;
  id?: string;
  name: string;
  slug?: string;
  description?: string;
  products?: Product[];
}

export interface FeaturedCombo {
  _id?: string;
  id?: string;
  name: string;
  type?: string;
  price?: number;
  products?: Product[];
}

export interface TvMenuCategory {
  _id?: string;
  id?: string;
  name: string;
  slug?: string;
  products: Product[];
}

export interface TvMenuCombo {
  _id?: string;
  id?: string;
  name: string;
  products: Product[];
}

export interface TvMenuResponse {
  categories: TvMenuCategory[];
  combos?: TvMenuCombo[];
}

export interface DisplayProduct {
  id: string;
  name: string;
  englishName: string;
  description: string;
  image: string;
  images?: string[];
  price: number;
  outOfStock: boolean;
}
