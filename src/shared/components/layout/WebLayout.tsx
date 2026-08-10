"use client";

import React from "react";
import Image from "next/image";
import { Header } from "./Header";
import { Footer } from "./Footer";

interface WebLayoutProps {
  children: React.ReactNode;
}

export function WebLayout({ children }: WebLayoutProps) {
  return (
    <div className="min-h-screen flex flex-col bg-stone-50 text-stone-850 selection:bg-[#D9A05B]/30 selection:text-[#8D4F2A]">
      {/* Header */}
      <Header />

      {/* Main Content Body */}
      <main className="flex-1">{children}</main>

      {/* Footer */}
      <Footer />

      {/* Zalo Floating Shortcut Widget */}
      <a
        href="https://zalo.me/0367262415"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-white shadow-lg hover:shadow-xl hover:scale-110 active:scale-95 transition-all duration-300 group cursor-pointer border border-stone-200"
        title="Chat liên hệ qua Zalo"
      >
        <span className="absolute inset-0 rounded-full bg-white opacity-90"></span>
        <Image
          src="/zalo.png"
          alt="Zalo"
          fill
          className="object-cover rounded-full p-1"
        />
      </a>
    </div>
  );
}
