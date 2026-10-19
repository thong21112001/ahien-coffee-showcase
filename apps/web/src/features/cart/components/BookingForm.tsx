"use client";

import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-hot-toast";
import { bookingSchema, BookingSchemaInput } from "../schemas/booking.schema";
import { useCart } from "../hooks/useCart";
import { orderApi } from "../api/order.api";
import { CheckCircle2 } from "lucide-react";

interface BookingFormProps {
  onSuccess?: () => void;
}

export function BookingForm({ onSuccess }: BookingFormProps) {
  const { items, clearCart } = useCart();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<BookingSchemaInput>({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      fullname: "",
      phone: "",
      email: "",
      number_of_guests: 1,
      date: "",
      time: "",
      note: "",
    },
  });

  const onSubmit: SubmitHandler<BookingSchemaInput> = async (data) => {
    if (items.length === 0) {
      toast.error("Giỏ hàng của bạn đang trống! Vui lòng chọn món trước.");
      return;
    }

    setIsSubmitting(true);
    try {
      const payload = {
        booking_info: {
          ...data,
          number_of_guests: Number(data.number_of_guests),
        },
        payment_method: "COD",
        items: items.map((item) => ({
          product_id: item.product_id,
          product: item.product_id,
          name: item.name,
          image: item.image,
          unit_price: item.unit_price,
          price: item.unit_price,
          quantity: item.quantity,
          total_price: item.unit_price * item.quantity,
        })),
      };

      await orderApi.createOnlineOrder(payload);

      setIsSuccess(true);
      clearCart();
      toast.success("Đặt hàng & Đặt bàn thành công!");
      reset();

      setTimeout(() => {
        setIsSuccess(false);
        onSuccess?.();
      }, 3000);
    } catch (err) {
      console.error("Order error:", err);
      toast.error("Đã xảy ra lỗi khi gửi đơn hàng. Vui lòng thử lại!");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center text-center p-6">
        <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mb-4 shadow-xs">
          <CheckCircle2 className="w-10 h-10" />
        </div>
        <h3 className="text-xl font-extrabold text-stone-800 mb-2">
          Đặt bàn thành công!
        </h3>
        <p className="text-stone-600 text-sm max-w-xs">
          Cảm ơn bạn đã lựa chọn Bếp Nhà Thu. Nhân viên nhà hàng sẽ liên hệ xác nhận trong thời gian sớm nhất.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex-1 flex flex-col justify-between">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-[380px] overflow-y-auto pr-1">
        {/* Fullname */}
        <div className="sm:col-span-1">
          <label className="block text-xs font-semibold text-stone-700 mb-1">
            Họ và tên <span className="text-red-500">*</span>
          </label>
          <input
            {...register("fullname")}
            type="text"
            placeholder="Nhập họ và tên"
            className={`w-full px-3 py-2 rounded-xl border text-sm text-stone-800 outline-none transition-all ${
              errors.fullname
                ? "border-red-400 focus:ring-2 focus:ring-red-300"
                : "border-stone-200 focus:ring-2 focus:ring-[#D9A05B]"
            }`}
          />
          {errors.fullname && (
            <p className="text-xs text-red-500 mt-1">{errors.fullname.message}</p>
          )}
        </div>

        {/* Phone */}
        <div className="sm:col-span-1">
          <label className="block text-xs font-semibold text-stone-700 mb-1">
            Số điện thoại <span className="text-red-500">*</span>
          </label>
          <input
            {...register("phone")}
            type="tel"
            placeholder="Nhập số điện thoại"
            className={`w-full px-3 py-2 rounded-xl border text-sm text-stone-800 outline-none transition-all ${
              errors.phone
                ? "border-red-400 focus:ring-2 focus:ring-red-300"
                : "border-stone-200 focus:ring-2 focus:ring-[#D9A05B]"
            }`}
          />
          {errors.phone && (
            <p className="text-xs text-red-500 mt-1">{errors.phone.message}</p>
          )}
        </div>

        {/* Email */}
        <div className="sm:col-span-1">
          <label className="block text-xs font-semibold text-stone-700 mb-1">
            Email <span className="text-red-500">*</span>
          </label>
          <input
            {...register("email")}
            type="email"
            placeholder="example@gmail.com"
            className={`w-full px-3 py-2 rounded-xl border text-sm text-stone-800 outline-none transition-all ${
              errors.email
                ? "border-red-400 focus:ring-2 focus:ring-red-300"
                : "border-stone-200 focus:ring-2 focus:ring-[#D9A05B]"
            }`}
          />
          {errors.email && (
            <p className="text-xs text-red-500 mt-1">{errors.email.message}</p>
          )}
        </div>

        {/* Guests Count */}
        <div className="sm:col-span-1">
          <label className="block text-xs font-semibold text-stone-700 mb-1">
            Số lượng người <span className="text-red-500">*</span>
          </label>
          <input
            {...register("number_of_guests", { valueAsNumber: true })}
            type="number"
            min="1"
            className={`w-full px-3 py-2 rounded-xl border text-sm text-stone-800 outline-none transition-all ${
              errors.number_of_guests
                ? "border-red-400 focus:ring-2 focus:ring-red-300"
                : "border-stone-200 focus:ring-2 focus:ring-[#D9A05B]"
            }`}
          />
          {errors.number_of_guests && (
            <p className="text-xs text-red-500 mt-1">
              {errors.number_of_guests.message}
            </p>
          )}
        </div>

        {/* Date */}
        <div className="sm:col-span-1">
          <label className="block text-xs font-semibold text-stone-700 mb-1">
            Ngày đến <span className="text-red-500">*</span>
          </label>
          <input
            {...register("date")}
            type="date"
            className={`w-full px-3 py-2 rounded-xl border text-sm text-stone-800 outline-none transition-all ${
              errors.date
                ? "border-red-400 focus:ring-2 focus:ring-red-300"
                : "border-stone-200 focus:ring-2 focus:ring-[#D9A05B]"
            }`}
          />
          {errors.date && (
            <p className="text-xs text-red-500 mt-1">{errors.date.message}</p>
          )}
        </div>

        {/* Time */}
        <div className="sm:col-span-1">
          <label className="block text-xs font-semibold text-stone-700 mb-1">
            Giờ đến <span className="text-red-500">*</span>
          </label>
          <input
            {...register("time")}
            type="time"
            className={`w-full px-3 py-2 rounded-xl border text-sm text-stone-800 outline-none transition-all ${
              errors.time
                ? "border-red-400 focus:ring-2 focus:ring-red-300"
                : "border-stone-200 focus:ring-2 focus:ring-[#D9A05B]"
            }`}
          />
          {errors.time && (
            <p className="text-xs text-red-500 mt-1">{errors.time.message}</p>
          )}
        </div>

        {/* Note */}
        <div className="sm:col-span-2">
          <label className="block text-xs font-semibold text-stone-700 mb-1">
            Ghi chú / Yêu cầu thêm
          </label>
          <textarea
            {...register("note")}
            rows={3}
            placeholder="Ví dụ: Vị trí bàn gần cửa sổ, dị ứng thực phẩm..."
            className="w-full px-3 py-2 rounded-xl border border-stone-200 focus:ring-2 focus:ring-[#D9A05B] text-sm text-stone-800 outline-none transition-all resize-none"
          ></textarea>
        </div>
      </div>

      <div className="mt-4 pt-3 border-t border-stone-100 flex justify-end">
        <button
          type="submit"
          disabled={isSubmitting || items.length === 0}
          className="w-full sm:w-auto min-w-[180px] px-6 py-3 bg-[#8D4F2A] hover:bg-[#763f1f] active:scale-98 text-white font-bold rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-md shadow-[#8D4F2A]/20 text-sm cursor-pointer"
        >
          {isSubmitting ? "Đang xử lý..." : "Xác nhận đặt bàn ngay"}
        </button>
      </div>
    </form>
  );
}
