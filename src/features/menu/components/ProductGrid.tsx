"use client";

import React from "react";
import { DisplayProduct } from "../types/menu.types";
import { ProductCard } from "./ProductCard";
import { MenuSkeleton } from "./MenuSkeleton";

interface ProductGridProps {
  products: DisplayProduct[];
  categoryName?: string;
  isLoading?: boolean;
  lang?: string;
}

export function ProductGrid({
  products,
  categoryName,
  isLoading = false,
  lang = "vi",
}: ProductGridProps) {
  if (isLoading) {
    return <MenuSkeleton />;
  }

  if (products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-stone-400">
        <div className="text-5xl mb-4">🍽️</div>
        <p className="font-medium text-stone-500">Chưa có món ăn nào trong danh mục này.</p>
        <p className="text-xs text-stone-400 mt-1">Vui lòng chọn danh mục khác từ thực đơn</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 lg:gap-5">
      {products.map((item) => (
        <ProductCard
          key={item.id}
          product={item}
          categoryName={categoryName}
          lang={lang}
        />
      ))}
    </div>
  );
}
