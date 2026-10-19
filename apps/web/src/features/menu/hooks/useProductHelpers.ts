import { getImageUrl } from "@/shared/utils/image";
import { Product, NameLocalized, LocalizedItem } from "../types/menu.types";

export function useProductHelpers() {
  const getEnglishName = (nameLocalized: NameLocalized, fallback: string = ""): string => {
    if (!nameLocalized) return fallback;
    if (Array.isArray(nameLocalized)) {
      const enObj = nameLocalized.find(
        (item: LocalizedItem) => item.localize === "en" || item.locale === "en",
      );
      return enObj?.content || enObj?.text || fallback;
    }
    if (typeof nameLocalized === "object" && nameLocalized.en) {
      return nameLocalized.en;
    }
    return fallback;
  };

  const getDisplayImage = (item: Product): string => {
    if (item.thumbnail) return getImageUrl(item.thumbnail);
    if (item.image) return getImageUrl(item.image);
    if (Array.isArray(item.listImage) && item.listImage.length > 0) {
      return getImageUrl(item.listImage[0].url);
    }
    return "/placeholder.png";
  };

  const getProductImages = (prod: Product): string[] => {
    const list: string[] = [];
    if (prod.image) list.push(getImageUrl(prod.image));
    else if (prod.thumbnail) list.push(getImageUrl(prod.thumbnail));

    if (Array.isArray(prod.listImage) && prod.listImage.length > 0) {
      prod.listImage.forEach((img) => {
        const url = img?.url ? getImageUrl(img.url) : "";
        if (url && !list.includes(url)) {
          list.push(url);
        }
      });
    }

    if (list.length === 0) {
      list.push("/placeholder.png");
    }

    return list;
  };

  const getProductPrice = (product: Product): number => {
    if (product.price) return product.price;
    if (Array.isArray(product.variants) && product.variants.length > 0) {
      const v = product.variants[0];
      return v.price_selling || v.price || v.price_listed || 0;
    }
    return 0;
  };

  const getProductDesc = (product: Product): string => {
    if (product.description) return product.description;
    if (product.shortDescription) return product.shortDescription;
    return "";
  };

  return {
    getEnglishName,
    getDisplayImage,
    getProductImages,
    getProductPrice,
    getProductDesc,
  };
}
