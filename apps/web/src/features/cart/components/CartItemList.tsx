"use client";

import React from "react";
import Image from "next/image";
import { Plus, Minus, Trash2, ShoppingBag } from "lucide-react";
import { useCart } from "../hooks/useCart";

export function CartItemList() {
  const { items, updateQuantity, removeFromCart, totalAmount } = useCart();

  if (items.length === 0) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center text-stone-400 py-12">
        <div className="w-16 h-16 rounded-full bg-stone-100 flex items-center justify-center mb-4">
          <ShoppingBag className="w-8 h-8 text-stone-400" />
        </div>
        <p className="font-medium text-stone-500">Giỏ hàng của bạn đang trống</p>
        <p className="text-xs text-stone-400 mt-1">Vui lòng chọn món ăn từ thực đơn</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full justify-between">
      <div className="flex-1 overflow-y-auto pr-1 space-y-3 max-h-[400px]">
        {items.map((item) => (
          <div
            key={item.product_id}
            className="flex gap-3 bg-white p-3 rounded-2xl shadow-sm border border-stone-200/60 hover:border-[#D9A05B]/40 transition-colors"
          >
            <div className="relative w-16 h-16 rounded-xl overflow-hidden bg-stone-100 shrink-0">
              <Image
                src={item.image || "/placeholder.png"}
                alt={item.name}
                fill
                className="object-cover"
                sizes="64px"
              />
            </div>
            <div className="flex-1 flex flex-col justify-between">
              <div>
                <h4 className="font-bold text-stone-800 text-sm leading-tight line-clamp-1">
                  {item.name}
                </h4>
                <p className="text-[#D9A05B] font-extrabold text-sm mt-0.5">
                  {new Intl.NumberFormat("vi-VN").format(item.unit_price)} đ
                </p>
              </div>
              <div className="flex items-center justify-between mt-2">
                <div className="flex items-center gap-2 bg-stone-100 rounded-lg p-0.5">
                  <button
                    onClick={() =>
                      updateQuantity(item.product_id, item.quantity - 1)
                    }
                    type="button"
                    className="w-6 h-6 flex items-center justify-center bg-white rounded shadow-xs text-stone-600 hover:text-[#D9A05B] transition-colors cursor-pointer"
                    title="Giảm số lượng"
                  >
                    <Minus className="w-3 h-3" />
                  </button>
                  <span className="text-xs font-bold w-5 text-center text-stone-800">
                    {item.quantity}
                  </span>
                  <button
                    onClick={() =>
                      updateQuantity(item.product_id, item.quantity + 1)
                    }
                    type="button"
                    className="w-6 h-6 flex items-center justify-center bg-white rounded shadow-xs text-stone-600 hover:text-[#D9A05B] transition-colors cursor-pointer"
                    title="Tăng số lượng"
                  >
                    <Plus className="w-3 h-3" />
                  </button>
                </div>
                <button
                  onClick={() => removeFromCart(item.product_id)}
                  type="button"
                  className="text-red-400 hover:text-red-600 p-1.5 rounded-lg hover:bg-red-50 transition-colors cursor-pointer"
                  title="Xóa món"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 pt-4 border-t border-stone-200">
        <div className="flex justify-between items-center">
          <span className="text-stone-500 font-semibold text-sm">Tổng cộng</span>
          <span className="text-xl font-extrabold text-[#8D4F2A]">
            {new Intl.NumberFormat("vi-VN").format(totalAmount)} đ
          </span>
        </div>
      </div>
    </div>
  );
}
