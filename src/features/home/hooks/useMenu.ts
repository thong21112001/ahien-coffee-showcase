import { useQuery } from "@tanstack/react-query";
import { menuService } from "../services/menu.service";

export function useMenuCategories() {
  return useQuery({
    queryKey: ["menu-categories"],
    queryFn: () => menuService.getCategories(),
    staleTime: 1000 * 60 * 10,
  });
}

export function useMenuProducts(categoryId?: string, limit: number = 100) {
  return useQuery({
    queryKey: ["menu-products", categoryId, limit],
    queryFn: () => menuService.getProducts(categoryId, limit),
    enabled: categoryId !== undefined && categoryId !== "set-menu" && categoryId !== "combo",
    staleTime: 1000 * 60 * 10,
  });
}

export function useFeaturedCombos(type?: "combo" | "set-menu") {
  return useQuery({
    queryKey: ["featured-combos", type],
    queryFn: () => menuService.getFeaturedCombos(type),
    enabled: type === "combo" || type === "set-menu",
    staleTime: 1000 * 60 * 10,
  });
}
