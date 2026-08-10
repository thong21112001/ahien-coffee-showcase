import { menuApi } from "@/features/menu/api/menu.api";
import { ProductCategory, Product, FeaturedCombo } from "@/features/menu/types/menu.types";
import { categoriesMockData, productsMockData } from "../data";
// import { categoriesMockData, productsMockData, combosMockData } from "../data";

const USE_MOCK = process.env.NEXT_PUBLIC_USE_MOCK_DATA === "true";

export const menuService = {
  getCategories: async (): Promise<ProductCategory[]> => {
    if (USE_MOCK) {
      await new Promise((resolve) => setTimeout(resolve, 150));
      return categoriesMockData;
    }
    return menuApi.getCategories();
  },

  getProducts: async (
    categoryId?: string,
    limit: number = 20
  ): Promise<Product[]> => {
    if (USE_MOCK) {
      await new Promise((resolve) => setTimeout(resolve, 150));
      let items = [...productsMockData];
      if (categoryId) {
        items = items.filter((p) => {
          if (typeof p.category === "string") return p.category === categoryId;
          if (p.category && typeof p.category === "object") {
            return (p.category as any)._id === categoryId || (p.category as any).id === categoryId;
          }
          return false;
        });
      }
      return items.slice(0, limit);
    }
    return menuApi.getProducts(categoryId, limit);
  },

  // getFeaturedCombos: async (
  //   type?: "combo" | "set-menu"
  // ): Promise<FeaturedCombo[]> => {
  //   if (USE_MOCK) {
  //     await new Promise((resolve) => setTimeout(resolve, 150));
  //     let items = [...combosMockData];
  //     if (type) {
  //       items = items.filter((c) => c.type === type);
  //     }
  //     return items;
  //   }
  //   return menuApi.getFeaturedCombos(type);
  // },
};
