export interface SectionConfig {
  hasTitle: boolean;
  hasSubtitle: boolean;
  hasContent: boolean;
  hasImage: boolean;
  hasUrl: boolean;
  hasGridItems: boolean;
  hasGridIconItems: boolean;
  hasGridTitleItems: boolean;
  hasImageForGrid: boolean;
  hasContentForGrid: boolean;
}

export interface GridItem {
  key?: string;
  icon?: string;
  title?: string;
  content?: string;
  image?: string;
  position: number;
}

export interface SettingSection {
  _id: string;
  key: string; // "home_hero", "home_story", "home_values", "home_experience", "home_featured_dish", "home_gallery", "home_contact"
  rootPage: string;
  title?: string;
  subtitle?: string;
  content?: string;
  description?: string;
  image?: string;
  url?: string;
  config: SectionConfig;
  gridItems: GridItem[];
  position: number;
  status: string;
  createdAt: string;
  updatedAt: string;
}
