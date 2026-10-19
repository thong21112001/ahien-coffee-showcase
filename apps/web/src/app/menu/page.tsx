"use client";

import React, { useState, useEffect, Suspense } from "react";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import {
  useTvMenu,
  useMenuSSE,
  useProductHelpers,
  CategorySidebar,
  ProductGrid,
  DisplayProduct,
} from "@/features/menu";
import { FloatingCart } from "@/features/cart";

function MenuPageContent() {
  const searchParams = useSearchParams();
  const lang = searchParams.get("lang") || "vi";
  const targetCategory = searchParams.get("category");

  const { data: menuData, isLoading, refetch } = useTvMenu(lang);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const {
    getEnglishName,
    getDisplayImage,
    getProductPrice,
    getProductDesc,
  } = useProductHelpers();

  // SSE Realtime Sync Hook
  useMenuSSE(refetch);

  const categoriesList = menuData?.categories || [];

  useEffect(() => {
    if (categoriesList.length > 0 && !activeCategory) {
      if (targetCategory && categoriesList.some((c) => (c._id || c.id) === targetCategory)) {
        setActiveCategory(targetCategory);
      } else {
        const coffeeCategory = categoriesList.find(
          (c) =>
            c.slug?.toLowerCase().includes("ca-phe") ||
            c.slug?.toLowerCase().includes("coffee") ||
            c.name?.toLowerCase().includes("cà phê") ||
            c.name?.toLowerCase().includes("coffee")
        );
        const defaultCatId: string | null = coffeeCategory
          ? coffeeCategory._id || coffeeCategory.id || null
          : categoriesList[0]?._id || categoriesList[0]?.id || null;
        setActiveCategory(defaultCatId);
      }
    }
  }, [categoriesList, targetCategory, activeCategory]);

  const activeCategoryData = categoriesList.find(
    (cat) => (cat._id || cat.id) === activeCategory,
  );

  const displayProducts: DisplayProduct[] = (activeCategoryData?.products || []).map(
    (prod) => ({
      id: prod._id || prod.id || "",
      name: prod.name,
      englishName: getEnglishName(prod.nameLocalized, ""),
      description: getProductDesc(prod),
      image: getDisplayImage(prod),
      price: getProductPrice(prod),
      outOfStock:
        prod.status === "out_of_stock" || (prod.stock !== undefined && prod.stock <= 0),
    }),
  );

  return (
    <div className="min-h-screen bg-[url('/bannerExperience.png')] bg-repeat pb-12 pt-8 text-stone-800">
      <div className="max-w-[1400px] mx-auto px-4 lg:px-8">
        <div className="mb-8 hidden lg:block">
          <Image
            src="/logo.png"
            alt="A Hiền Coffee"
            width={60}
            height={100}
            className="h-16 w-auto object-contain"
            priority
          />
        </div>

        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
          {/* Sidebar Categories */}
          <CategorySidebar
            categories={categoriesList}
            activeCategoryId={activeCategory}
            onSelectCategory={(id) => setActiveCategory(id)}
            lang={lang}
          />

          {/* Product Grid Main Area */}
          <div className="flex-1">
            <ProductGrid
              products={displayProducts}
              categoryName={activeCategoryData?.name}
              isLoading={isLoading}
              lang={lang}
            />
          </div>
        </div>
      </div>

      <FloatingCart />
    </div>
  );
}

export default function MenuPage() {
  return (
    <Suspense
      fallback={
        <div className="flex justify-center items-center h-screen">
          <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-[#D9A05B]"></div>
        </div>
      }
    >
      <MenuPageContent />
    </Suspense>
  );
}
