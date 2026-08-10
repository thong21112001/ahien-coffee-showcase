"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { label: "Về chúng tôi", href: "#ve-chung-toi" },
    { label: "Danh mục", href: "#thuc-don" },
    { label: "Hình ảnh", href: "#hinh-anh" },
    { label: "Liên hệ", href: "#lien-he" },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-stone-100 shadow-xs py-3.5 text-stone-800">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <Image
              src="/logo.png"
              alt="A Hiền Coffee Logo"
              width={80}
              height={50}
            />
          </Link>

          {/* Action Buttons & Desktop Nav */}
          <div className="hidden md:flex items-center gap-4">
            <nav className="hidden md:flex items-center gap-8">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-sm font-semibold tracking-wide text-stone-600 hover:text-brand-brown transition-colors"
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            {/* Language Selector */}
            <div className="flex items-center gap-1.5 text-xs font-semibold cursor-pointer text-stone-600 hover:text-brand-brown transition-colors">
              <span className="w-5 h-5 rounded-full overflow-hidden relative inline-block align-middle border border-stone-300/20">
                <Image
                  src="/englishLg.png"
                  alt="VN Flag"
                  fill
                  className="object-cover"
                />
              </span>
              <span>English</span>
            </div>

            <Link
              href="#lien-he"
              className="rounded-full bg-brand-brown hover:bg-brand-brown-dark text-white px-5 py-2.5 text-sm shadow-md transition-all hover:scale-[1.02] active:scale-95"
            >
              Liên hệ ngay!
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-1.5 rounded-lg focus:outline-none text-stone-600 hover:text-brand-brown transition-colors"
            aria-label="Toggle menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isMobileMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-white text-stone-800 shadow-xl border-t border-stone-100 animate-in fade-in slide-in-from-top-5 duration-200">
          <div className="px-4 py-6 space-y-4">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="block text-base font-semibold text-stone-700 hover:text-brand-brown transition-colors py-2"
              >
                {item.label}
              </Link>
            ))}
            <div className="pt-4 border-t border-stone-100 flex items-center justify-between">
              <div className="flex items-center gap-2 text-sm font-semibold">
                <span className="w-5 h-5 rounded-full overflow-hidden relative inline-block">
                  <Image
                    src="/englishLg.png"
                    alt="VN Flag"
                    fill
                    className="object-cover"
                  />
                </span>
                <span>English</span>
              </div>
              <Link
                href="#lien-he"
                onClick={() => setIsMobileMenuOpen(false)}
                className="rounded-full bg-brand-brown hover:bg-brand-brown-dark text-white px-5 py-2.5 text-sm shadow-md inline-block"
              >
                Liên hệ ngay!
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
