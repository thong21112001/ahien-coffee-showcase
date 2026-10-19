"use client";

import React, { useState } from "react";
import { ShoppingBag } from "lucide-react";
import { useCart } from "../hooks/useCart";
import { CartModal } from "./CartModal";

export function FloatingCart() {
  const { totalQuantity, isHydrated } = useCart();
  const [isModalOpen, setIsModalOpen] = useState(false);

  if (!isHydrated || totalQuantity === 0) return null;

  return (
    <>
      <button
        onClick={() => setIsModalOpen(true)}
        className="fixed bottom-6 right-6 z-40 flex items-center justify-center p-4 bg-[#8D4F2A] text-white rounded-full shadow-2xl hover:bg-[#763f1f] hover:scale-110 active:scale-95 transition-all cursor-pointer group"
        title="Xem giỏ hàng & Đặt bàn"
      >
        <div className="relative">
          <ShoppingBag className="w-6 h-6 group-hover:rotate-6 transition-transform" />
          <span className="absolute -top-3 -right-3 bg-red-500 text-white text-[10px] font-extrabold w-5 h-5 flex items-center justify-center rounded-full border-2 border-[#8D4F2A] animate-pulse">
            {totalQuantity}
          </span>
        </div>
      </button>

      <CartModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
}
