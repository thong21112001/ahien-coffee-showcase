"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ShoppingBag, ArrowLeft } from "lucide-react";
import { TvMenuCategory, DisplayProduct } from "../types/menu.types";
import { CategorySidebar } from "./CategorySidebar";
import { useCart, FloatingCart } from "@/features/cart";

interface MenuDetailViewProps {
  categoriesList: TvMenuCategory[];
  selectedProduct: DisplayProduct | null;
  activeCategory: TvMenuCategory | null;
  otherProducts: DisplayProduct[];
  isLoading: boolean;
  lang?: string;
}

export function MenuDetailView({
  categoriesList,
  selectedProduct,
  activeCategory,
  otherProducts,
  isLoading,
  lang = "vi",
}: MenuDetailViewProps) {
  const router = useRouter();
  const { addToCart } = useCart();
  const [isDescExpanded, setIsDescExpanded] = useState(false);

  const getGridColsClass = (count: number) => {
    if (count === 1) return "grid-cols-1";
    if (count === 2) return "grid-cols-2";
    if (count === 3) return "grid-cols-3";
    return "grid-cols-4";
  };

  const activeCatId = activeCategory?._id || activeCategory?.id || null;

  return (
    <div className="min-h-screen bg-[#12100e] bg-[url('/bannerExperience.png')] bg-repeat pb-12 pt-8 text-white relative">
      <div className="max-w-[1200px] mx-auto px-4 lg:px-8 relative z-10">
        {/* Header Area with Back Button & Centered Logo */}
        <div className="mb-6 flex items-center justify-between relative">
          <button
            onClick={() =>
              router.push(
                `/menu?lang=${lang}${activeCatId ? `&category=${activeCatId}` : ""}`,
              )
            }
            className="flex items-center gap-2 text-stone-300 hover:text-white transition-colors cursor-pointer bg-[#1c1916]/80 px-4 py-2 rounded-xl border border-stone-800 shadow-xs"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm font-semibold hidden sm:inline">
              Quay lại
            </span>
          </button>
          <div className="absolute left-1/2 -translate-x-1/2">
            <Image
              src="/logo.png"
              alt="Thu Kitchen"
              width={140}
              height={90}
              className="object-contain"
              priority
            />
          </div>
          <div className="w-[80px] sm:w-[120px]"></div>
        </div>

        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 mt-6">
          {/* Category Sidebar */}
          <CategorySidebar
            categories={categoriesList}
            activeCategoryId={activeCatId}
            lang={lang}
            isDetailMode
          />

          {/* Main Content Area */}
          <div className="flex-1">
            {isLoading ? (
              <div className="flex justify-center items-center py-20 text-white">
                <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-[#D9A05B]"></div>
              </div>
            ) : selectedProduct ? (
              <>
                <div className="w-full max-w-[800px] mx-auto">
                  {/* Images Collage */}
                  <div
                    className={`grid ${getGridColsClass(
                      selectedProduct.images?.length || 1,
                    )} mt-5 gap-1.5 md:gap-2 rounded-2xl overflow-hidden mb-6 shadow-lg border border-stone-800 ${
                      (selectedProduct.images?.length || 1) === 1
                        ? "max-w-sm mx-auto"
                        : "w-full"
                    }`}
                  >
                    {(selectedProduct.images || [selectedProduct.image]).map(
                      (imgSrc, idx) => (
                        <div
                          key={idx}
                          className={`relative w-full bg-stone-900 overflow-hidden transition-transform duration-300 hover:scale-105 ${
                            (selectedProduct.images?.length || 1) === 1
                              ? "aspect-square"
                              : "aspect-[4/3]"
                          }`}
                        >
                          <Image
                            src={imgSrc}
                            alt={`${selectedProduct.name} image ${idx + 1}`}
                            fill
                            className="object-cover"
                            sizes="400px"
                          />
                        </div>
                      ),
                    )}
                  </div>

                  {/* Product Title, Subtitle & Price/AddToCart */}
                  <div className="flex justify-between items-start gap-4 mb-5 px-1">
                    <div className="text-left">
                      <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-white leading-tight">
                        {selectedProduct.name}
                      </h2>
                      {selectedProduct.englishName && (
                        <p className="text-[#D9A05B] font-bold text-xs md:text-sm lg:text-base mt-1">
                          {selectedProduct.englishName}
                        </p>
                      )}
                    </div>
                    <div className="text-right whitespace-nowrap flex flex-col items-end gap-2">
                      <span className="text-xl md:text-2xl lg:text-3xl font-extrabold text-white">
                        {new Intl.NumberFormat("vi-VN").format(
                          selectedProduct.price,
                        )}
                        đ
                      </span>
                      <button
                        onClick={() => {
                          addToCart({
                            product_id: selectedProduct.id,
                            item_type: "single",
                            name: selectedProduct.name,
                            image: selectedProduct.image,
                            category_name: activeCategory?.name,
                            color: "Tiêu chuẩn",
                            unit: "sản phẩm",
                            quantity: 1,
                            unit_price: selectedProduct.price,
                            original_price: selectedProduct.price,
                            total_discount_amount: 0,
                            applied_vouchers: [],
                            instock: 99,
                          });
                        }}
                        className="px-4 py-2 bg-[#D9A05B] hover:bg-[#c98e4b] text-white font-bold rounded-xl transition-colors text-sm md:text-base flex items-center gap-2 cursor-pointer shadow-md"
                      >
                        <ShoppingBag className="w-4 h-4" />
                        Thêm vào giỏ
                      </button>
                    </div>
                  </div>

                  {/* Description Card */}
                  <div className="bg-[#F4F1EA] rounded-2xl p-5 mb-5 border border-stone-200/60 shadow-md text-left">
                    <h3 className="font-bold text-[#8D4F2A] text-[14px] md:text-[15px] mb-2 uppercase tracking-wider">
                      Mô tả sản phẩm
                    </h3>
                    <div className="text-stone-700 text-xs md:text-sm leading-relaxed">
                      <span
                        className={isDescExpanded ? "" : "line-clamp-2 block"}
                        dangerouslySetInnerHTML={{
                          __html:
                            selectedProduct.description ||
                            "Món ăn thơm ngon, chuẩn vị được chế biến từ nguyên liệu tươi ngon chọn lọc mỗi ngày bởi các đầu bếp của Bếp Nhà Thu.",
                        }}
                      />
                      {selectedProduct.description &&
                        selectedProduct.description.length > 100 && (
                          <button
                            onClick={() => setIsDescExpanded(!isDescExpanded)}
                            className="text-[#8D4F2A] hover:text-[#763f1f] font-bold text-xs mt-2 inline-flex items-center gap-0.5 cursor-pointer italic"
                          >
                            {isDescExpanded ? "Rút gọn" : "Xem thêm"}
                          </button>
                        )}
                    </div>
                  </div>
                </div>

                {/* Section Separator */}
                <div className="flex items-center my-8 md:my-10 max-w-[800px] mx-auto">
                  <div className="flex-1 border-t border-dashed border-stone-600"></div>
                  <span className="px-4 text-[#D9A05B] font-extrabold text-sm md:text-base tracking-wider uppercase">
                    {activeCategory?.name || "Món ăn cùng danh mục"}
                  </span>
                  <div className="flex-1 border-t border-dashed border-stone-600"></div>
                </div>

                {/* Related Products Grid */}
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 lg:gap-5 max-w-[800px] mx-auto">
                  {otherProducts.map((item) => (
                    <Link
                      key={item.id}
                      href={`/menu/${item.id}?lang=${lang}`}
                      className={`bg-[#F4F1EA] rounded-[1.25rem] overflow-hidden p-3.5 relative flex flex-col border-2 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-lg cursor-pointer ${
                        selectedProduct?.id === item.id
                          ? "border-[#D9A05B] shadow-md ring-2 ring-[#D9A05B]/25"
                          : "border-transparent hover:border-[#D9A05B]/50"
                      } ${item.outOfStock ? "opacity-80" : ""}`}
                    >
                      {item.outOfStock && (
                        <div className="absolute top-4 right-4 z-10 bg-white/95 text-[#E46B5C] text-[10px] font-bold px-2 py-0.5 rounded-full border border-[#E46B5C]/30 shadow-xs">
                          Hết món
                        </div>
                      )}

                      <div className="relative w-full aspect-[4/3] rounded-xl overflow-hidden mb-3 bg-stone-200 shrink-0">
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 50vw, 30vw"
                        />
                      </div>

                      <div className="flex flex-col flex-1 items-center justify-between text-center mt-1 px-1 pb-1">
                        <div className="w-full">
                          <h4 className="font-bold text-stone-800 text-xs md:text-[14px] lg:text-[15px] leading-tight mb-1">
                            {item.name}
                          </h4>
                          {item.englishName && (
                            <p className="text-[#D9A05B] font-bold text-[10px] md:text-[11px] lg:text-[12px] leading-snug mb-2">
                              {item.englishName}
                            </p>
                          )}

                          {item.description && (
                            <div
                              className="text-stone-500 text-[10px] md:text-[11px] leading-snug mb-3 line-clamp-2 px-1"
                              dangerouslySetInnerHTML={{
                                __html: item.description,
                              }}
                            />
                          )}
                        </div>

                        <div className="mt-auto w-full pt-1">
                          <span className="text-[#6D4231] font-extrabold text-xs md:text-[14px] lg:text-[15px]">
                            {new Intl.NumberFormat("vi-VN").format(item.price)}{" "}
                            VNĐ
                          </span>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </>
            ) : (
              <div className="flex flex-col items-center justify-center py-20 text-stone-400">
                <div className="text-5xl mb-4">🍽️</div>
                <p className="text-stone-300">Không tìm thấy món ăn này.</p>
                <button
                  onClick={() => router.push(`/menu?lang=${lang}`)}
                  className="mt-4 px-5 py-2.5 bg-[#D9A05B] hover:bg-[#c98e4b] text-white font-bold rounded-xl transition-colors cursor-pointer"
                >
                  Quay lại Thực đơn
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
      <FloatingCart />
    </div>
  );
}
