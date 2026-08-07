import { useQuery } from "@tanstack/react-query";
import { homeService } from "../services/home.service";

export function useHomeSections() {
  return useQuery({
    queryKey: ["home-sections"],
    queryFn: () => homeService.getSections(),
    staleTime: 1000 * 60 * 10, // 10 minutes cache
  });
}

