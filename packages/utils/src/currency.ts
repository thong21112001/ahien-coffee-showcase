import { Locale } from "@ahien/types";

export const formatPrice = (priceVnd: number, priceUsd: number, locale: Locale): string => {
  if (locale === "vi") {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
      maximumFractionDigits: 0,
    }).format(priceVnd);
  }

  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(priceUsd);
};
