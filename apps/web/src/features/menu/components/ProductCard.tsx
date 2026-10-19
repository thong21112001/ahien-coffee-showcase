"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { DisplayProduct } from "../types/menu.types";
import { useCart } from "@/features/cart";

interface ProductCardProps {
  product: DisplayProduct;
  categoryName?: string;
  lang?: string;
}

export function ProductCard({
  product,
  categoryName,
  lang = "vi",
}: ProductCardProps) {
  const { addToCart } = useCart();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart({
      product_id: product.id,
      item_type: "single",
      name: product.name,
      image: product.image,
      category_name: categoryName,
      color: "Tiêu chuẩn",
      unit: "sản phẩm",
      quantity: 1,
      unit_price: product.price,
      original_price: product.price,
      total_discount_amount: 0,
      applied_vouchers: [],
      instock: 99,
    });
  };

  return (
    <div
      className={`group bg-[#F9F7F5] rounded-[1.25rem] overflow-hidden p-3 relative flex flex-col border border-stone-200/50 shadow-xs transition-all duration-300 hover:-translate-y-1.5 hover:border-[#D9A05B] hover:shadow-md ${
        product.outOfStock ? "opacity-80" : ""
      }`}
    >
      {product.outOfStock && (
        <div className="absolute top-4 right-4 z-10 bg-white/95 text-[#E46B5C] text-[11px] font-bold px-3 py-1 rounded-full border border-[#E46B5C]/30 shadow-xs">
          Hết món
        </div>
      )}

      {/* Clickable Card Link to Detail Page */}
      <Link href={`/menu/${product.id}?lang=${lang}`} className="flex flex-col flex-1">
        <div className="relative w-full aspect-[4/3] rounded-xl overflow-hidden mb-3 bg-stone-200 shrink-0">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
          />
        </div>

        <div className="flex flex-col flex-1 items-center justify-between text-center mt-1 px-1 pb-1">
          <div className="w-full">
            <h4 className="font-bold text-stone-800 text-[14px] lg:text-[15px] leading-tight mb-1 group-hover:text-[#8D4F2A] transition-colors">
              {product.name}
            </h4>

            {product.englishName && (
              <p className="text-[#D9A05B] font-bold text-[11px] lg:text-[12px] leading-snug mb-2">
                {product.englishName}
              </p>
            )}

            {product.description && (
              <div
                className="text-stone-500 text-[11px] leading-snug mb-3 line-clamp-2 px-1"
                dangerouslySetInnerHTML={{
                  __html: product.description,
                }}
              />
            )}
          </div>

          <div className="mt-auto w-full pt-2">
            <span className="text-[#6D4231] font-extrabold text-[15px] lg:text-[16px]">
              {new Intl.NumberFormat("vi-VN").format(product.price)} VNĐ
            </span>
          </div>
        </div>
      </Link>

      {/* Add to Cart Hover Button */}
      <button
        onClick={handleAddToCart}
        className="
          mt-4
          w-full
          py-2.5
          rounded-2xl
          bg-[#8D4F2A]
          text-white
          font-semibold
          text-sm
          opacity-0
          translate-y-2
          pointer-events-none
          transition-all
          duration-300
          group-hover:opacity-100
          group-hover:translate-y-0
          group-hover:pointer-events-auto
          hover:bg-[#763f1f]
          shadow-md
          cursor-pointer
        "
      >
        Thêm vào giỏ
      </button>
    </div>
  );
}
