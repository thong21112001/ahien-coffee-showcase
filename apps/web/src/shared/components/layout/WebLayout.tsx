"use client";

import React from "react";
import Image from "next/image";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { Locale } from "@ahien/types";

interface WebLayoutProps {
  children: React.ReactNode;
  locale?: Locale;
}

export function WebLayout({ children, locale = "vi" }: WebLayoutProps) {
  return (
    <div className="min-h-screen flex flex-col bg-stone-950 text-stone-100 selection:bg-amber-500/30 selection:text-amber-300">
      {/* Header */}
      <Header locale={locale} />

      {/* Main Content Body */}
      <main className="flex-1">{children}</main>

      {/* Footer */}
      <Footer locale={locale} />

      {/* Zalo Floating Shortcut Widget */}
      <a
        href="https://zalo.me/0367262415"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-40 flex h-13 w-13 items-center justify-center rounded-full bg-stone-900/90 shadow-xl hover:shadow-amber-500/20 hover:scale-110 active:scale-95 transition-all duration-300 group cursor-pointer border border-amber-500/30 backdrop-blur-md"
        title="Chat liên hệ qua Zalo"
      >
        <span className="absolute inset-0 rounded-full bg-amber-500/10 opacity-80 group-hover:bg-amber-500/20"></span>
        <div className="relative w-8 h-8">
          <Image
            src="/zalo.png"
            alt="Zalo"
            fill
            className="object-contain"
          />
        </div>
      </a>
    </div>
  );
}
