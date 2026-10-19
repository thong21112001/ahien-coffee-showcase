"use client";

import { useEffect, useState } from "react";
import { useCartStore } from "./useCartStore";

export function useCart() {
  const [isHydrated, setIsHydrated] = useState(false);
  const store = useCartStore();

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  return {
    ...store,
    items: isHydrated ? store.items : [],
    totalQuantity: isHydrated ? store.getTotalQuantity() : 0,
    totalAmount: isHydrated ? store.getTotalAmount() : 0,
    isHydrated,
  };
}
