"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { SettingSection } from "../types/home.types";
import { getImageUrl } from "@/shared/utils/image";
import {
  useMenuCategories,
  useFeaturedCombos,
  useMenuProducts,
} from "../hooks/useMenu";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/shared/lib/gsap";
import { usePrefersReducedMotion } from "@/shared/hooks/usePrefersReducedMotion";
import { motion, AnimatePresence } from "motion/react";

interface CulinaryEssenceProps {
  data?: SettingSection;
}

export function CulinaryEssence({ data }: CulinaryEssenceProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  const title = data?.title || "Cà phê phin tại A Hiền Coffee";
  const subtitle =
    data?.subtitle ||
    "Nơi hương cà phê phin lan tỏa trong ánh nắng dịu và những câu chuyện đời thường. Chỉ cần bước vào, bạn sẽ cảm nhận được sự bình yên rất riêng giữa nhịp sống thành phố.";

  const { data: categoriesList = [] } = useMenuCategories();
  const [activeCategory, setActiveCategory] = useState<string>("");
  const [activeSetMenu, setActiveSetMenu] = useState("set-1");

  useEffect(() => {
    if (categoriesList.length > 0) {
      const coffeeCat = categoriesList.find(
        (c: any) =>
          c.slug?.toLowerCase().includes("ca-phe") ||
          c.slug?.toLowerCase().includes("coffee") ||
          c.name?.toLowerCase().includes("cà phê") ||
          c.name?.toLowerCase().includes("coffee")
      );
      const defaultId: string = coffeeCat
        ? coffeeCat._id || coffeeCat.id || ""
        : categoriesList[0]?._id || categoriesList[0]?.id || "";

      setActiveCategory((prev) => {
        if (!prev || prev === "set-menu" || !categoriesList.some((c: any) => (c._id || c.id) === prev)) {
          return defaultId;
        }
        return prev;
      });
    }
  }, [categoriesList]);

  const isComboOrSetMenu =
    activeCategory === "set-menu" || activeCategory === "combo";

  const { data: combosList = [], isLoading: combosLoading } = useFeaturedCombos(
    isComboOrSetMenu ? (activeCategory as "combo" | "set-menu") : undefined
  );

  const { data: productsList = [], isLoading: productsLoading } =
    useMenuProducts(!isComboOrSetMenu ? activeCategory : undefined, 100);

  const isLoading = isComboOrSetMenu ? combosLoading : productsLoading;

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
                : "☕",
    })),
  ];

  const displayGroupMenus = combosList;

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

  const displayProducts = productsList.map((prod: any) => ({
    id: prod._id || prod.id,
    name: prod.name,
    englishName: getEnglishName(prod.nameLocalized, ""),
    image: getDisplayImage(prod),
    price: getProductPrice(prod),
  }));

  const activeCategoryItems = !isComboOrSetMenu ? displayProducts : [];

  useGSAP(
    () => {
      if (prefersReducedMotion) {
        gsap.set(".culinary-header", { opacity: 1, y: 0, clearProps: "all" });
        return;
      }

      gsap.fromTo(
        ".culinary-header",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          scrollTrigger: {
            trigger: ".culinary-header",
            start: "top 85%",
          },
        }
      );
    },
    { scope: sectionRef, dependencies: [prefersReducedMotion] }
  );

  return (
    <section ref={sectionRef} id="thuc-don" className="py-24 bg-white text-stone-850">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="culinary-header text-center max-w-5xl mx-auto mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold font-serif text-[#9A5C32] mb-4">
            {title}
          </h2>
          <p className="text-stone-600 leading-relaxed">{subtitle}</p>
        </div>

        {/* Categories Tabs with Motion layoutId */}
        <div className="flex overflow-x-auto justify-start gap-3 mb-10 pb-4 no-scrollbar">
          {displayTabs.map((cat) => {
            const isActive = activeCategory === cat.id;
            return (
              <motion.button
                key={cat.id}
                whileTap={prefersReducedMotion ? {} : { scale: 0.95 }}
                onClick={() => setActiveCategory(cat.id)}
                className={`relative flex flex-col items-center justify-center py-3 px-4 rounded-xl min-w-[120px] lg:min-w-[160px] border border-stone-200 shrink-0 cursor-pointer transition-colors duration-200 ${
                  isActive
                    ? "text-white shadow-md border-[#9A5C32]"
                    : "bg-white text-stone-600 hover:bg-stone-50"
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeCategoryPill"
                    transition={{ type: "spring", stiffness: 350, damping: 30 }}
                    className="absolute inset-0 bg-[#9A5C32] rounded-xl -z-0"
                  />
                )}
                <span className="text-2xl mb-2 relative z-10">{cat.icon}</span>
                <span className="text-sm font-semibold relative z-10">{cat.label}</span>
              </motion.button>
            );
          })}
        </div>

        {/* Dynamic Content based on active category */}
        {isLoading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-[#9A5C32]"></div>
          </div>
        ) : isComboOrSetMenu && displayGroupMenus.length > 0 ? (
          <div className="bg-[url('/bannerExperience.webp')] bg-cover bg-center rounded-[2rem] p-6 lg:p-10 shadow-2xl relative overflow-hidden border border-[#d4a373]/30">
            {/* Dark overlay for better text readability */}
            <div className="absolute inset-0 bg-black/60 pointer-events-none"></div>

            <div className="relative z-10 flex flex-col lg:flex-row gap-8 lg:gap-12">
              {/* Left Sidebar - Set Menus / Combos */}
              <div className="flex flex-row lg:flex-col gap-3 w-full lg:w-48 shrink-0 overflow-x-auto lg:overflow-visible pb-4 lg:pb-0">
                {displayGroupMenus.map((set: any) => (
                  <button
                    key={set._id || set.id}
                    onClick={() => setActiveSetMenu(set._id || set.id)}
                    className={`py-3.5 px-4 text-center rounded-xl font-bold transition-all shrink-0 lg:shrink whitespace-nowrap lg:whitespace-normal cursor-pointer ${(activeSet._id || activeSet.id) === (set._id || set.id)
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
                    <motion.div
                      key={item.id}
                      whileHover={prefersReducedMotion ? {} : { y: -4 }}
                      transition={{ duration: 0.2 }}
                      className="bg-[#e8e8e8] rounded-xl overflow-hidden p-2.5 border-2 border-transparent hover:border-[#d4a373]/50 shadow-xs transition-colors duration-300"
                    >
                      <div className="relative w-full aspect-square rounded-lg overflow-hidden mb-3 bg-stone-200">
                        <Image
                          src={item.image || "/placeholder.webp"}
                          alt={item.name}
                          fill
                          className="object-cover hover:scale-105 transition-transform duration-500"
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
                    </motion.div>
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
          <div className="bg-[#1a1a1a] bg-[url('/bannerExperience.webp')] bg-cover bg-center rounded-4xl p-6 lg:p-10 shadow-2xl relative overflow-hidden border border-[#d4a373]/30">
            {/* Dark overlay */}
            <div className="absolute inset-0 bg-black/60 pointer-events-none"></div>

            <div className="relative z-10">
              <AnimatePresence mode="wait">
                {activeCategoryItems.length > 0 ? (
                  <motion.div
                    key={activeCategory}
                    initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 12 }}
                    animate={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
                    exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: -12 }}
                    transition={{ duration: 0.25 }}
                    className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 lg:gap-6"
                  >
                    {activeCategoryItems.map((item: any) => (
                      <motion.div
                        key={item.id}
                        whileHover={prefersReducedMotion ? {} : { y: -5 }}
                        transition={{ duration: 0.2 }}
                        className="bg-[#e8e8e8] rounded-xl overflow-hidden p-2.5 border-2 border-transparent hover:border-[#d4a373]/60 shadow-xs transition-colors duration-300 flex flex-col group cursor-default"
                      >
                        <div className="relative w-full aspect-square rounded-lg overflow-hidden mb-3 bg-stone-200 shrink-0">
                          <Image
                            src={item.image || "/placeholder.webp"}
                            alt={item.name}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                        </div>
                        <div className="px-1 pb-1 flex flex-col items-center justify-between flex-1">
                          <div className="flex flex-col items-center justify-center min-h-[48px] mb-2">
                            <h4 className="text-center font-bold text-stone-800 text-[13px] lg:text-sm mb-1 leading-tight group-hover:text-[#9A5C32] transition-colors">
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
                                {new Intl.NumberFormat("vi-VN").format(item.price)} VNĐ
                              </span>
                            </div>
                          )}
                        </div>
                      </motion.div>
                    ))}
                  </motion.div>
                ) : (
                  <div className="bg-white/10 backdrop-blur-md rounded-2xl p-12 text-center border border-white/20 shadow-xs">
                    <h4 className="text-lg font-bold text-white mb-2">
                      Đang được cập nhật mỗi ngày
                    </h4>
                    <p className="text-sm text-stone-300">
                      Sẽ được bổ sung nhanh thôi nhé.
                    </p>
                  </div>
                )}
              </AnimatePresence>
            </div>
          </div>
        )}

        {/* CTA Button with Motion feedback */}
        <div className="flex justify-center mt-12">
          <motion.a
            whileHover={prefersReducedMotion ? {} : { scale: 1.04 }}
            whileTap={prefersReducedMotion ? {} : { scale: 0.96 }}
            href="#lien-he"
            className="rounded-full bg-[#9A5C32] hover:bg-[#804a27] text-white px-10 py-3.5 shadow-md hover:shadow-lg transition-colors text-center font-bold border border-[#d4a373]/30 uppercase tracking-wide text-sm"
          >
            Liên hệ ngay!
          </motion.a>
        </div>
      </div>
    </section>
  );
}

