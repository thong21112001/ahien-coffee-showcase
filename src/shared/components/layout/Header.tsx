"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu, X, Globe } from "lucide-react";

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { label: "Trang chủ", href: "/" },
    { label: "Về chúng tôi", href: "#ve-chung-toi" },
    { label: "Thực đơn", href: "/menu" },
    { label: "Hình ảnh", href: "#hinh-anh" },
    { label: "Liên hệ", href: "#lien-he" },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-stone-200/60 shadow-xs py-3 text-stone-800 transition-all">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <Image
              src="/logo.png"
              alt="Bếp Nhà Thu Logo"
              width={90}
              height={55}
              className="object-contain transition-transform group-hover:scale-105"
              priority
            />
          </Link>

          {/* Desktop Nav Items & Actions */}
          <div className="hidden md:flex items-center gap-8">
            <nav className="flex items-center gap-7">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-sm font-semibold tracking-wide text-stone-700 hover:text-[#8D4F2A] transition-colors"
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            <div className="flex items-center gap-4">
              {/* Language Switcher */}
              <div className="flex items-center gap-1.5 text-xs font-semibold cursor-pointer text-stone-600 hover:text-[#8D4F2A] transition-colors">
                <Globe className="w-4 h-4 text-stone-500" />
                <span>Tiếng Việt</span>
              </div>

              {/* Order Button */}
              <Link
                href="/menu"
                className="rounded-full bg-[#8D4F2A] hover:bg-[#763f1f] active:scale-95 text-white px-5 py-2.5 text-sm font-bold shadow-md shadow-[#8D4F2A]/20 transition-all hover:scale-105"
              >
                Khám phá thực đơn
              </Link>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 rounded-lg text-stone-700 hover:text-[#8D4F2A] focus:outline-none transition-colors cursor-pointer"
            aria-label="Toggle Navigation Menu"
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-white text-stone-800 shadow-xl border-t border-stone-100 animate-in fade-in slide-in-from-top-5 duration-200">
          <div className="px-5 py-6 space-y-4">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="block text-base font-semibold text-stone-800 hover:text-[#8D4F2A] transition-colors py-2"
              >
                {item.label}
              </Link>
            ))}
            <div className="pt-4 border-t border-stone-100 flex flex-col gap-3">
              <Link
                href="/menu"
                onClick={() => setIsMobileMenuOpen(false)}
                className="w-full text-center rounded-full bg-[#8D4F2A] hover:bg-[#763f1f] text-white px-5 py-3 text-sm font-bold shadow-md"
              >
                Khám phá thực đơn
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
