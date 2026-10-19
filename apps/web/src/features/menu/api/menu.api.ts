import apiClient from "@/core/api/client";
import { API_ENDPOINTS } from "@/core/api/endpoints";
import {
  ProductCategory,
  Product,
  FeaturedCombo,
  TvMenuResponse,
} from "../types/menu.types";

export const menuApi = {
  getCategories: async (): Promise<ProductCategory[]> => {
    try {
      const response = await apiClient.get<unknown, ProductCategory[]>(
        API_ENDPOINTS.MENU.CATEGORIES,
      );
      return Array.isArray(response) ? response : [];
    } catch (error) {
      console.error("Error fetching categories:", error);
      return [];
    }
  },

  getProducts: async (
    categoryId?: string,
    limit: number = 20,
  ): Promise<Product[]> => {
    try {
      const params = new URLSearchParams();
      params.append("limit", limit.toString());
      if (categoryId) {
        params.append("category", categoryId);
        params.append("include", "category");
      }
      const response = await apiClient.get<unknown, Product[]>(
        `${API_ENDPOINTS.MENU.PRODUCTS}?${params.toString()}`,
      );
      return Array.isArray(response) ? response : [];
    } catch (error) {
      console.error("Error fetching products:", error);
      return [];
    }
  },

  getFeaturedCombos: async (
    type?: "combo" | "set-menu",
  ): Promise<FeaturedCombo[]> => {
    try {
      const params = new URLSearchParams();
      if (type) {
        params.append("type", type);
      }
      const response = await apiClient.get<unknown, FeaturedCombo[]>(
        `${API_ENDPOINTS.MENU.FEATURED_COMBOS}?${params.toString()}`,
      );
      return Array.isArray(response) ? response : [];
    } catch (error) {
      console.error("Error fetching featured combos:", error);
      return [];
    }
  },

  getTvMenuData: async (lang?: string): Promise<TvMenuResponse> => {
    try {
      const params = new URLSearchParams();
      if (lang) {
        params.append("lang", lang);
      }
      const queryStr = params.toString() ? `?${params.toString()}` : "";
      const response = await apiClient.get<unknown, TvMenuResponse>(
        `${API_ENDPOINTS.MENU.TV_MENU}${queryStr}`,
      );
      if (response && typeof response === "object" && "categories" in response) {
        return response as TvMenuResponse;
      }
      return { categories: [], combos: [] };
    } catch (error) {
      console.error("Error fetching TV menu data:", error);
      return { categories: [], combos: [] };
    }
  },
};
