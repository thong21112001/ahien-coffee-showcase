"use client";

import React, { useState } from "react";
import Link from "next/link";
import { SettingSection } from "../types/home.types";
import { useTvMenu, ProductCard, DisplayProduct, useProductHelpers } from "@/features/menu";

interface CulinaryEssenceProps {
  data?: SettingSection;
}

export function CulinaryEssence({ data }: CulinaryEssenceProps) {
  const { data: menuData, isLoading } = useTvMenu();
  const { getEnglishName, getDisplayImage, getProductPrice, getProductDesc } = useProductHelpers();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const categories = menuData?.categories || [];
  const activeCatId = selectedCategory || categories[0]?._id || categories[0]?.id || null;
  const activeCategory = categories.find((c) => (c._id || c.id) === activeCatId);

  const products: DisplayProduct[] = (activeCategory?.products || []).slice(0, 8).map((prod) => ({
    id: prod._id || prod.id || "",
    name: prod.name,
    englishName: getEnglishName(prod.nameLocalized, ""),
    description: getProductDesc(prod),
    image: getDisplayImage(prod),
    price: getProductPrice(prod),
    outOfStock: prod.status === "out_of_stock" || (prod.stock !== undefined && prod.stock <= 0),
  }));

  return (
    <section id="thuc-don" className="py-20 bg-stone-100 text-stone-850">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-[#8D4F2A] font-extrabold text-xs md:text-sm tracking-widest uppercase">
            {data?.subtitle || "TINH HOA ẨM THỰC HỘI AN"}
          </span>
          <h2 className="text-2xl md:text-4xl font-extrabold text-stone-900 mt-2">
            {data?.title || "Thực Đơn Nổi Bật"}
          </h2>
          <p className="text-stone-500 text-sm mt-3">
            Những món ăn đậm đà bản sắc Quảng Nam được chế biến tỉ mỉ từ nguyên liệu tuyển chọn
          </p>
        </div>

        {/* Category Tabs */}
        {categories.length > 0 && (
          <div className="flex justify-center flex-wrap gap-2.5 mb-10">
            {categories.map((cat) => {
              const catId = cat._id || cat.id || "";
              const isActive = activeCatId === catId;
              return (
                <button
                  key={catId}
                  onClick={() => setSelectedCategory(catId)}
                  className={`px-5 py-2.5 rounded-full font-bold text-sm transition-all cursor-pointer shadow-xs ${
                    isActive
                      ? "bg-[#8D4F2A] text-white shadow-md"
                      : "bg-white text-stone-700 hover:bg-stone-200"
                  }`}
                >
                  {cat.name}
                </button>
              );
            })}
          </div>
        )}

        {/* Products Grid */}
        {isLoading ? (
          <div className="flex justify-center items-center py-16">
            <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-[#D9A05B]"></div>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 lg:gap-6">
            {products.map((item) => (
              <ProductCard key={item.id} product={item} categoryName={activeCategory?.name} />
            ))}
          </div>
        )}

        <div className="mt-12 text-center">
          <Link
            href="/menu"
            className="inline-block px-8 py-3.5 bg-[#D9A05B] hover:bg-[#c98e4b] active:scale-95 text-white font-bold rounded-2xl shadow-md transition-all hover:scale-105"
          >
            Xem toàn bộ thực đơn ({menuData?.categories.reduce((acc, c) => acc + c.products.length, 0) || 0} món)
          </Link>
        </div>
      </div>
    </section>
  );
}
