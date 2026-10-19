"use client";

import React, { useEffect } from "react";
import { X, ShoppingBag } from "lucide-react";
import { CartItemList } from "./CartItemList";
import { BookingForm } from "./BookingForm";
import { useCart } from "../hooks/useCart";

interface CartModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CartModal({ isOpen, onClose }: CartModalProps) {
  const { items } = useCart();

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div
        className="bg-white rounded-3xl w-full max-w-5xl max-h-[90vh] overflow-hidden flex flex-col shadow-2xl relative border border-stone-100 animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-stone-500 hover:text-stone-800 bg-stone-100 hover:bg-stone-200 rounded-full transition-colors z-20 cursor-pointer"
          title="Đóng modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex flex-col md:flex-row h-full overflow-y-auto">
          {/* Left Column: Cart Items List */}
          <div className="w-full md:w-1/2 p-6 bg-stone-50/80 border-r border-stone-200/80 flex flex-col">
            <h2 className="text-xl font-bold text-stone-800 mb-4 flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-[#8D4F2A]" />
              Giỏ hàng của bạn
              <span className="bg-[#D9A05B] text-white text-xs font-bold py-0.5 px-2.5 rounded-full">
                {items.length}
              </span>
            </h2>
            <CartItemList />
          </div>

          {/* Right Column: Online Booking Form */}
          <div className="w-full md:w-1/2 p-6 bg-white flex flex-col">
            <h2 className="text-xl font-bold text-stone-800 mb-4">
              Thông tin đặt bàn & giao hàng
            </h2>
            <BookingForm onSuccess={onClose} />
          </div>
        </div>
      </div>
    </div>
  );
}
