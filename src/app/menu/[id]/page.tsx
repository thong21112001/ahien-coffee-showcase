"use client";

import React, { Suspense } from "react";
import { useParams, useSearchParams } from "next/navigation";
import {
  useTvMenu,
  useMenuSSE,
  useProductHelpers,
  MenuDetailView,
  DisplayProduct,
  TvMenuCategory,
} from "@/features/menu";

function MenuDetailPageContent() {
  const params = useParams();
  const searchParams = useSearchParams();

  const productId = params?.id as string;
  const lang = searchParams.get("lang") || "vi";

  const { data: menuData, isLoading, refetch } = useTvMenu(lang);
  useMenuSSE(refetch);

  const {
    getEnglishName,
    getDisplayImage,
    getProductImages,
    getProductPrice,
    getProductDesc,
  } = useProductHelpers();

  const categoriesList = menuData?.categories || [];

  let selectedProduct: DisplayProduct | null = null;
  let activeCategory: TvMenuCategory | null = null;

  if (categoriesList.length > 0 && productId) {
    for (const cat of categoriesList) {
      const prod = cat.products.find((p) => (p._id || p.id) === productId);
      if (prod) {
        selectedProduct = {
          id: prod._id || prod.id || "",
          name: prod.name,
          englishName: getEnglishName(prod.nameLocalized, ""),
          description: getProductDesc(prod),
          image: getDisplayImage(prod),
          images: getProductImages(prod),
          price: getProductPrice(prod),
          outOfStock:
            prod.status === "out_of_stock" ||
            (prod.stock !== undefined && prod.stock <= 0),
        };
        activeCategory = cat;
        break;
      }
    }
  }

  const otherProducts: DisplayProduct[] = activeCategory
    ? activeCategory.products.map((prod) => ({
        id: prod._id || prod.id || "",
        name: prod.name,
        englishName: getEnglishName(prod.nameLocalized, ""),
        description: getProductDesc(prod),
        image: getDisplayImage(prod),
        price: getProductPrice(prod),
        outOfStock:
          prod.status === "out_of_stock" ||
          (prod.stock !== undefined && prod.stock <= 0),
      }))
    : [];

  return (
    <MenuDetailView
      categoriesList={categoriesList}
      selectedProduct={selectedProduct}
      activeCategory={activeCategory}
      otherProducts={otherProducts}
      isLoading={isLoading}
      lang={lang}
    />
  );
}

export default function MenuDetailPage() {
  return (
    <Suspense
      fallback={
        <div className="flex justify-center items-center h-screen bg-[#12100e]">
          <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-[#D9A05B]"></div>
        </div>
      }
    >
      <MenuDetailPageContent />
    </Suspense>
  );
}
