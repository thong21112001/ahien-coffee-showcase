"use client";

import { useEffect } from "react";
import { API_ENDPOINTS } from "@/core/api/endpoints";

export function useMenuSSE(onMenuUpdated: () => void) {
  useEffect(() => {
    const apiBaseUrl =
      process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3000";
    const cleanBaseUrl = apiBaseUrl.replace(/\/api$/, "");
    const streamUrl = `${cleanBaseUrl}${API_ENDPOINTS.MENU.TV_MENU_STREAM}`;

    const eventSource = new EventSource(streamUrl);

    const handleMenuUpdated = () => {
      onMenuUpdated();
    };

    eventSource.addEventListener("menu.updated", handleMenuUpdated);

    eventSource.onerror = (err) => {
      console.warn("SSE Connection event warning:", err);
    };

    return () => {
      eventSource.removeEventListener("menu.updated", handleMenuUpdated);
      eventSource.close();
    };
  }, [onMenuUpdated]);
}
