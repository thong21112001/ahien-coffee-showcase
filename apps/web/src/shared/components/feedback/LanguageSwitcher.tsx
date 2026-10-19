"use client";

import React from "react";
import { usePathname, useRouter } from "next/navigation";
import { Locale } from "@ahien/types";
import Image from "next/image";

interface LanguageSwitcherProps {
  currentLocale: Locale;
}

export function LanguageSwitcher({ currentLocale }: LanguageSwitcherProps) {
  const router = useRouter();
  const pathname = usePathname();

  const handleSwitch = (targetLocale: Locale) => {
    if (targetLocale === currentLocale) return;

    // Set cookie
    document.cookie = `NEXT_LOCALE=${targetLocale}; path=/; max-age=31536000`;

    // Calculate new path
    let newPath = pathname;
    if (pathname.startsWith(`/${currentLocale}`)) {
      newPath = pathname.replace(`/${currentLocale}`, `/${targetLocale}`);
    } else {
      newPath = `/${targetLocale}${pathname === "/" ? "" : pathname}`;
    }

    router.push(newPath);
  };

  return (
    <div className="inline-flex items-center p-1 rounded-full bg-stone-900 border border-stone-800 text-xs shadow-inner">
      {/* Tiếng Việt */}
      <button
        type="button"
        onClick={() => handleSwitch("vi")}
        className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full font-semibold transition-all duration-200 cursor-pointer select-none ${
          currentLocale === "vi"
            ? "bg-amber-500 text-stone-950 shadow-sm"
            : "text-stone-400 hover:text-white"
        }`}
        title="Tiếng Việt"
      >
        <span className="text-xs">🇻🇳</span>
        <span>VI</span>
      </button>

      {/* English */}
      <button
        type="button"
        onClick={() => handleSwitch("en")}
        className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full font-semibold transition-all duration-200 cursor-pointer select-none ${
          currentLocale === "en"
            ? "bg-amber-500 text-stone-950 shadow-sm"
            : "text-stone-400 hover:text-white"
        }`}
        title="English"
      >
        <span className="text-xs">🇬🇧</span>
        <span>EN</span>
      </button>
    </div>
  );
}
