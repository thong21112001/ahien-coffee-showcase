"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Locale } from "@ahien/types";
import { LanguageSwitcher } from "../feedback/LanguageSwitcher";
import { BaristaAudioButton } from "../feedback/BaristaAudioButton";
import { Sparkles, Menu, X } from "lucide-react";

interface HeaderProps {
  locale?: Locale;
}

export function Header({ locale = "vi" }: HeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    {
      label: locale === "vi" ? "Về chúng tôi" : "About Us",
      href: "#ve-chung-toi",
    },
    {
      label: locale === "vi" ? "Thực đơn" : "Menu",
      href: "#thuc-don",
    },
    {
      label: locale === "vi" ? "Tìm gu cà phê" : "Flavor Quiz",
      href: "#tim-gu-ca-phe",
      highlight: true,
    },
    {
      label: locale === "vi" ? "Không gian" : "Ambience",
      href: "#hinh-anh",
    },
    {
      label: locale === "vi" ? "Liên hệ" : "Contact",
      href: "#lien-he",
    },
  ];

  return (
    <header className="sticky top-0 z-50 bg-stone-950/90 backdrop-blur-xl border-b border-stone-800/80 py-3 text-stone-100 shadow-xl transition-all">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href={`/${locale}`} className="flex items-center gap-3 group">
            <div className="relative h-11 w-11 rounded-full overflow-hidden border border-amber-500/40 bg-stone-900 group-hover:border-amber-400 transition-colors">
              <Image
                src="/logo.webp"
                alt="A Hiền Coffee Logo"
                fill
                className="object-cover object-center"
                priority
              />
            </div>
            <div className="flex flex-col">
              <span className="font-serif font-bold text-base sm:text-lg tracking-wide text-white group-hover:text-amber-400 transition-colors">
                A HIỀN COFFEE
              </span>
              <span className="text-[10px] text-amber-500/80 font-medium tracking-widest uppercase">
                Artisanal Roastery
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-7">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`text-xs font-semibold tracking-wider uppercase transition-colors duration-200 ${
                  item.highlight
                    ? "text-amber-400 hover:text-amber-300 flex items-center gap-1.5"
                    : "text-stone-300 hover:text-amber-400"
                }`}
              >
                {item.highlight && <Sparkles size={13} className="text-amber-400 animate-pulse" />}
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Right Controls: ASMR + i18n + CTA */}
          <div className="hidden md:flex items-center gap-3">
            {/* ASMR Audio Toggle */}
            <BaristaAudioButton locale={locale} />

            {/* Language Switcher */}
            <LanguageSwitcher currentLocale={locale} />

            {/* Reservation CTA Button */}
            <Link
              href="#lien-he"
              className="rounded-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-stone-950 font-bold px-4 py-2 text-xs shadow-md shadow-amber-500/20 transition-all hover:scale-[1.03] active:scale-95"
            >
              {locale === "vi" ? "Đặt bàn ngay" : "Reserve Table"}
            </Link>
          </div>

          {/* Mobile Right Bar: Language + Toggle */}
          <div className="flex items-center gap-2 md:hidden">
            <LanguageSwitcher currentLocale={locale} />
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-lg bg-stone-900 border border-stone-800 text-stone-300 hover:text-white"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-stone-950 border-t border-stone-800/80 px-4 py-6 space-y-4 animate-in fade-in slide-in-from-top-4 duration-200">
          <div className="space-y-3">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="block text-sm font-semibold text-stone-200 hover:text-amber-400 transition-colors py-2 border-b border-stone-900"
              >
                {item.label}
              </Link>
            ))}
          </div>

          <div className="pt-3 flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <span className="text-xs text-stone-400">Không gian âm thanh:</span>
              <BaristaAudioButton locale={locale} />
            </div>

            <Link
              href="#lien-he"
              onClick={() => setIsMobileMenuOpen(false)}
              className="w-full text-center rounded-full bg-amber-500 text-stone-950 font-bold py-3 text-sm shadow-md"
            >
              {locale === "vi" ? "Đặt bàn ngay" : "Reserve Table"}
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
