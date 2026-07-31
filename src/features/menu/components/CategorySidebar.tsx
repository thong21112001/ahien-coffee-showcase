"use client";

import React from "react";
import Link from "next/link";
import { TvMenuCategory } from "../types/menu.types";

interface CategorySidebarProps {
  categories: TvMenuCategory[];
  activeCategoryId: string | null;
  onSelectCategory?: (id: string) => void;
  lang?: string;
  isDetailMode?: boolean;
}

export function CategorySidebar({
  categories,
  activeCategoryId,
  onSelectCategory,
  lang = "vi",
  isDetailMode = false,
}: CategorySidebarProps) {
  const getCategoryIcon = (slug?: string) => {
    switch (slug) {
      case "trang-mieng":
        return "🍰";
      case "mon-chinh":
        return "🍛";
      case "khai-vi-salad":
        return "🥗";
      case "do-uong":
        return "🍹";
      default:
        return "🍽️";
    }
  };

  return (
    <div className="w-full lg:w-[260px] shrink-0">
      <div className="flex flex-row lg:flex-col gap-3 overflow-x-auto lg:overflow-visible pb-4 lg:pb-0 no-scrollbar">
        {categories.map((cat) => {
          const catId = cat._id || cat.id || "";
          const isActive = activeCategoryId === catId;
          const icon = getCategoryIcon(cat.slug);

          if (isDetailMode) {
            return (
              <Link
                key={catId}
                href={`/menu?lang=${lang}&category=${catId}`}
                className={`flex flex-col lg:flex-row items-center justify-center lg:justify-start gap-3 py-3 lg:py-4 px-4 rounded-xl lg:rounded-2xl min-w-[120px] transition-all shrink-0 border-2 font-bold shadow-xs cursor-pointer ${
                  isActive
                    ? "bg-[#D9A05B] text-white border-[#D9A05B]"
                    : "bg-[#1c1916]/90 text-stone-300 hover:bg-[#1c1916] border-[#3a3530]/50 hover:text-white"
                }`}
              >
                <div className="text-2xl">{icon}</div>
                <span className="text-[13px] lg:text-[15px] whitespace-nowrap lg:whitespace-normal text-center lg:text-left leading-tight">
                  {cat.name}
                </span>
              </Link>
            );
          }

          return (
            <button
              key={catId}
              onClick={() => onSelectCategory?.(catId)}
              className={`flex flex-col lg:flex-row items-center justify-center lg:justify-start gap-3 py-3 lg:py-4 px-4 rounded-xl lg:rounded-2xl min-w-[120px] transition-all shrink-0 border-2 font-bold shadow-xs cursor-pointer ${
                isActive
                  ? "bg-[#D9A05B] text-white border-[#D9A05B]"
                  : "bg-white text-stone-700 hover:bg-stone-50 border-white"
              }`}
            >
              <div className="text-2xl">{icon}</div>
              <span className="text-[13px] lg:text-[15px] whitespace-nowrap lg:whitespace-normal text-center lg:text-left leading-tight">
                {cat.name}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
