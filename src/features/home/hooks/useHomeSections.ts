import { useQuery } from "@tanstack/react-query";
import { homeApi } from "../api/home.api";

export function useHomeSections() {
  return useQuery({
    queryKey: ["home-sections"],
    queryFn: () => homeApi.getSettingSections(),
    staleTime: 1000 * 60 * 10, // 10 minutes cache
  });
}
