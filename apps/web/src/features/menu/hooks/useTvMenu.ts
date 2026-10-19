import { useQuery } from "@tanstack/react-query";
import { menuApi } from "../api/menu.api";

export function useTvMenu(lang: string = "vi") {
  return useQuery({
    queryKey: ["tv-menu", lang],
    queryFn: () => menuApi.getTvMenuData(lang),
    staleTime: 1000 * 60 * 5, // 5 minutes cache
  });
}
