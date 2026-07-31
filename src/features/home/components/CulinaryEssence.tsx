"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { SettingSection } from "../types/home.types";
import { menuApi } from "@/features/menu/api/menu.api";
import { ProductCategory, FeaturedCombo, Product } from "@/features/menu/types/menu.types";
import { getImageUrl } from "@/shared/utils/image";

interface CulinaryEssenceProps {
  data?: SettingSection;
}

export function CulinaryEssence({ data }: CulinaryEssenceProps) {
  const title = data?.title || "Tinh hoa ẩm thực Bếp Nhà Thu";
  const subtitle =
    data?.subtitle ||
    "Mỗi món ăn tại Bếp Nhà Thu là sự kết tinh của hương vị truyền thống Hội An, được chế biến tỉ mỉ để giữ trọn bản sắc và mang đến trải nghiệm ẩm thực đậm đà, khó quên.";

  const [categoriesList, setCategoriesList] = useState<ProductCategory[]>([]);
  const [featuredCombos, setFeaturedCombos] = useState<FeaturedCombo[]>([]);
  const [productsList, setProductsList] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const [activeCategory, setActiveCategory] = useState("set-menu");
  const [activeSetMenu, setActiveSetMenu] = useState("set-1");

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const cats = await menuApi.getCategories();
        setCategoriesList(cats);
      } catch (err) {
        console.error("Error fetching categories:", err);
      }
    };
    fetchInitialData();
  }, []);

  const getEnglishName = (nameLocalized: any, fallback: string): string => {
    if (!nameLocalized) return fallback;
    if (Array.isArray(nameLocalized)) {
      const enObj = nameLocalized.find(
        (item: any) => item.localize === "en" || item.locale === "en"
      );
      return enObj?.content || enObj?.text || fallback;
    }
    if (typeof nameLocalized === "object") {
      return nameLocalized.en || fallback;
    }
    return fallback;
  };

  const getDisplayImage = (item: any): string => {
    if (item.thumbnail) return getImageUrl(item.thumbnail);
    if (item.image) return getImageUrl(item.image);
    if (Array.isArray(item.listImage) && item.listImage.length > 0) {
      return getImageUrl(item.listImage[0].url);
    }
    if (Array.isArray(item.products) && item.products.length > 0) {
      const firstProd = item.products[0]?.product || item.products[0];
      if (firstProd) return getDisplayImage(firstProd);
    }
    return "/placeholder.png";
  };

  const getProductPrice = (product: any): number => {
    if (product.price) return product.price;
    if (Array.isArray(product.variants) && product.variants.length > 0) {
      const v = product.variants[0];
      return v.price_selling || v.price || v.price_listed || 0;
    }
    return 0;
  };

  const displayTabs = [
    { id: "set-menu", label: "Set Menu", icon: "🍱" },
    { id: "combo", label: "Combo đặc sản", icon: "🍾" },
    ...categoriesList.map((cat: any) => ({
      id: cat._id || cat.id,
      label: cat.name,
      icon:
        cat.slug === "trang-mieng"
          ? "🍰"
          : cat.slug === "mon-chinh"
          ? "🍛"
          : cat.slug === "dac-san-hoi-an"
          ? "🍜"
          : cat.slug === "khai-vi-salad"
          ? "🥗"
          : "🍽️",
    })),
  ];

  const isComboOrSetMenu =
    activeCategory === "set-menu" || activeCategory === "combo";

  const activeGroupData = featuredCombos.filter(
    (item: any) => item.type === activeCategory
  );

  useEffect(() => {
    const fetchCategoryData = async () => {
      if (!activeCategory) return;
      setIsLoading(true);
      try {
        if (isComboOrSetMenu) {
          const combos = await menuApi.getFeaturedCombos(
            activeCategory as "combo" | "set-menu"
          );
          setFeaturedCombos(combos);
        } else {
          const prods = await menuApi.getProducts(activeCategory, 100);
          setProductsList(prods);
        }
      } catch (error) {
        console.error("Error fetching category data:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchCategoryData();
  }, [activeCategory, isComboOrSetMenu]);

  const displayGroupMenus = activeGroupData;

  const activeSet: any =
    displayGroupMenus.find(
      (set: any) => set._id === activeSetMenu || set.id === activeSetMenu
    ) ||
    displayGroupMenus[0] ||
    {};

  const activeSetItems = Array.isArray(activeSet.products)
    ? activeSet.products.map((p: any) => {
        const prod = p.product || p;
        return {
          id: prod._id || prod.id,
          name: prod.name,
          englishName: getEnglishName(prod.nameLocalized, ""),
          image: getDisplayImage(prod),
          quantity: p.quantity,
        };
      })
    : [];

  const priceText = activeSet.price
    ? `${new Intl.NumberFormat("vi-VN").format(activeSet.price)} VNĐ net per person`
    : "";

  const categoryProducts = productsList.filter(
    (prod: any) =>
      prod.category === activeCategory ||
      (prod.category &&
        (prod.category._id === activeCategory ||
          prod.category.id === activeCategory))
  );

  const displayProducts = categoryProducts.map((prod: any) => ({
    id: prod._id || prod.id,
    name: prod.name,
    englishName: getEnglishName(prod.nameLocalized, ""),
    image: getDisplayImage(prod),
    price: getProductPrice(prod),
  }));

  let activeCategoryItems: any[] = [];
  if (!isComboOrSetMenu) {
    activeCategoryItems = displayProducts;
  }

  return (
    <section id="thuc-don" className="py-24 bg-white text-stone-850">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-5xl mx-auto mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold font-serif text-[#9A5C32] mb-4">
            {title}
          </h2>
          <p className="text-stone-600 leading-relaxed">{subtitle}</p>
        </div>

        {/* Categories Tabs */}
        <div className="flex overflow-x-auto justify-start gap-3 mb-10 pb-4 no-scrollbar">
          {displayTabs.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`flex flex-col items-center justify-center py-3 px-4 rounded-xl min-w-[120px] lg:min-w-[160px] transition-all border border-stone-200 shrink-0 cursor-pointer ${
                activeCategory === cat.id
                  ? "bg-[#9A5C32] text-white shadow-md border-[#9A5C32]"
                  : "bg-white text-stone-600 hover:bg-stone-50"
              }`}
            >
              <span className="text-2xl mb-2">{cat.icon}</span>
              <span className="text-sm font-semibold">{cat.label}</span>
            </button>
          ))}
        </div>

        {/* Dynamic Content based on active category */}
        {isLoading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-[#9A5C32]"></div>
          </div>
        ) : isComboOrSetMenu && displayGroupMenus.length > 0 ? (
          <div className="bg-[url('/bannerExperience.png')] bg-cover bg-center rounded-[2rem] p-6 lg:p-10 shadow-2xl relative overflow-hidden border border-[#d4a373]/30">
            {/* Dark overlay for better text readability */}
            <div className="absolute inset-0 bg-black/60 pointer-events-none"></div>

            <div className="relative z-10 flex flex-col lg:flex-row gap-8 lg:gap-12">
              {/* Left Sidebar - Set Menus / Combos */}
              <div className="flex flex-row lg:flex-col gap-3 w-full lg:w-48 shrink-0 overflow-x-auto lg:overflow-visible pb-4 lg:pb-0">
                {displayGroupMenus.map((set: any) => (
                  <button
                    key={set._id || set.id}
                    onClick={() => setActiveSetMenu(set._id || set.id)}
                    className={`py-3.5 px-4 text-center rounded-xl font-bold transition-all shrink-0 lg:shrink whitespace-nowrap lg:whitespace-normal cursor-pointer ${
                      (activeSet._id || activeSet.id) === (set._id || set.id)
                        ? "bg-[#9A5C32] text-white border border-[#d4a373] shadow-lg scale-[1.02]"
                        : "bg-[#e8e8e8] text-stone-700 hover:bg-stone-300 border border-transparent"
                    }`}
                  >
                    {set.name}
                  </button>
                ))}
              </div>

              {/* Right Content - Items Grid */}
              <div className="flex-1 flex flex-col">
                <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 lg:gap-6">
                  {activeSetItems.map((item: any) => (
                    <div
                      key={item.id}
                      className="bg-[#e8e8e8] rounded-xl overflow-hidden p-2.5 border-2 border-transparent hover:border-[#d4a373]/50 shadow-xs hover:-translate-y-1 transition-all duration-300"
                    >
                      <div className="relative w-full aspect-square rounded-lg overflow-hidden mb-3 bg-stone-200">
                        <Image
                          src={item.image || "/placeholder.png"}
                          alt={item.name}
                          fill
                          className="object-cover hover:scale-110 transition-transform duration-500"
                        />
                      </div>
                      <div className="px-1 pb-2 flex flex-col items-center justify-center min-h-[60px]">
                        <h4 className="text-center font-bold text-stone-800 text-[13px] lg:text-sm mb-1 leading-tight">
                          {item.name}
                        </h4>
                        {item.englishName && (
                          <p className="text-center text-[#c28e46] font-semibold text-[11px] lg:text-xs leading-tight">
                            {item.englishName}
                          </p>
                        )}
                        {item.quantity > 1 && (
                          <span className="text-[10px] mt-1 bg-stone-300/60 px-1.5 py-0.5 rounded text-stone-700 font-bold">
                            SL: {item.quantity}
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Price Info */}
                {priceText && (
                  <div className="mt-10 text-center text-white/90 font-bold text-lg lg:text-xl tracking-wide">
                    {priceText}
                  </div>
                )}
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-[#1a1a1a] bg-[url('/bannerExperience.png')] bg-cover bg-center rounded-4xl p-6 lg:p-10 shadow-2xl relative overflow-hidden border border-[#d4a373]/30">
            {/* Dark overlay */}
            <div className="absolute inset-0 bg-black/60 pointer-events-none"></div>

            <div className="relative z-10">
              {activeCategoryItems.length > 0 ? (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 lg:gap-6">
                  {activeCategoryItems.map((item: any) => (
                    <div
                      key={item.id}
                      className="bg-[#e8e8e8] rounded-xl overflow-hidden p-2.5 border-2 border-transparent hover:border-[#d4a373]/50 shadow-xs hover:-translate-y-1 transition-all duration-300 flex flex-col"
                    >
                      <div className="relative w-full aspect-square rounded-lg overflow-hidden mb-3 bg-stone-200 shrink-0">
                        <Image
                          src={item.image || "/placeholder.png"}
                          alt={item.name}
                          fill
                          className="object-cover hover:scale-110 transition-transform duration-500"
                        />
                      </div>
                      <div className="px-1 pb-1 flex flex-col items-center justify-between flex-1">
                        <div className="flex flex-col items-center justify-center min-h-[48px] mb-2">
                          <h4 className="text-center font-bold text-stone-800 text-[13px] lg:text-sm mb-1 leading-tight">
                            {item.name}
                          </h4>
                          {item.englishName && (
                            <p className="text-center text-[#c28e46] font-semibold text-[11px] lg:text-xs leading-tight">
                              {item.englishName}
                            </p>
                          )}
                        </div>
                        {item.price > 0 && (
                          <div className="mt-auto w-full border-t border-[#d4a373]/30 pt-2 text-center">
                            <span className="text-[#9A5C32] font-bold text-sm lg:text-base">
                              {new Intl.NumberFormat("vi-VN").format(
                                item.price
                              )}{" "}
                              VNĐ
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="bg-white/10 backdrop-blur-md rounded-2xl p-12 text-center border border-white/20 shadow-xs">
                  <h4 className="text-lg font-bold text-white mb-2">
                    Món ăn đang được cập nhật
                  </h4>
                  <p className="text-sm text-stone-300">
                    Thực đơn cho danh mục này sẽ sớm được bổ sung.
                  </p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* CTA Button */}
        <div className="flex justify-center mt-12">
          <a
            href="#lien-he"
            className="rounded-xl bg-[#9A5C32] hover:bg-[#804a27] text-white px-10 py-3.5 shadow-md hover:shadow-lg transition-all text-center font-bold border border-[#d4a373]/30 uppercase tracking-wide text-sm"
          >
            Đặt món ngay!
          </a>
        </div>
      </div>
    </section>
  );
}
