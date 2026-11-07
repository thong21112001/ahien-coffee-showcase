"use client";

import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import { loginSchema, LoginSchemaInput } from "../schemas/auth.schema";
import { useAuthStore } from "../hooks/useAuthStore";
import { Lock, Mail, LogIn } from "lucide-react";
import { BrandLogo } from "@/shared/components/brand/BrandLogo";

export function LoginForm() {
  const router = useRouter();
  const { login, isLoading, error, isAuthenticated, clearError } =
    useAuthStore();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginSchemaInput>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  useEffect(() => {
    if (isAuthenticated) {
      router.push("/admin/contacts");
    }
  }, [isAuthenticated, router]);

  const onSubmit = async (data: LoginSchemaInput) => {
    const success = await login(data);
    if (success) {
      toast.success("Đăng nhập thành công!");
      router.push("/admin/contacts");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-stone-950 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-stone-900 p-8 md:p-10 rounded-3xl shadow-2xl border border-stone-800">
        <div className="text-center">
          <div className="flex justify-center mb-4">
            <BrandLogo size="lg" showTagline={false} />
          </div>
          <h2 className="text-center text-xl md:text-2xl font-bold font-serif text-white">
            Đăng Nhập Quản Trị Viên
          </h2>
          <p className="mt-2 text-center text-xs md:text-sm text-amber-500 font-medium">
            Góc nhỏ A Hiền Coffee — Since 1986
          </p>
        </div>

        <form className="mt-8 space-y-5" onSubmit={handleSubmit(onSubmit)}>
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-xl text-xs font-medium">
              {error}
            </div>
          )}

          <div className="space-y-4">
            {/* Email Field */}
            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1.5">
                Địa chỉ Email <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-stone-400">
                  <Mail className="w-4 h-4" />
                </div>
                <input
                  {...register("email")}
                  type="email"
                  placeholder="admin@ahiencoffee.vn"
                  onChange={(e) => {
                    register("email").onChange(e);
                    if (error) clearError();
                  }}
                  className={`w-full pl-10 pr-4 py-2.5 rounded-xl border text-sm text-stone-200 bg-stone-950 outline-none transition-all ${
                    errors.email
                      ? "border-red-400 focus:ring-2 focus:ring-red-500/20"
                      : "border-stone-800 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20"
                  }`}
                />
              </div>
              {errors.email && (
                <p className="text-xs text-red-400 mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-xs font-semibold text-stone-300 mb-1.5">
                Mật khẩu <span className="text-red-400">*</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-stone-500">
                  <Lock className="w-4 h-4" />
                </div>
                <input
                  {...register("password")}
                  type="password"
                  placeholder="••••••••"
                  onChange={(e) => {
                    register("password").onChange(e);
                    if (error) clearError();
                  }}
                  className={`w-full pl-10 pr-4 py-2.5 rounded-xl border text-sm text-stone-200 bg-stone-950 outline-none transition-all ${
                    errors.password
                      ? "border-red-400 focus:ring-2 focus:ring-red-500/20"
                      : "border-stone-800 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20"
                  }`}
                />
              </div>
              {errors.password && (
                <p className="text-xs text-red-400 mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex justify-center py-3 px-4 rounded-xl text-sm font-bold text-stone-950 bg-amber-500 hover:bg-amber-400 active:scale-98 focus:outline-none transition-all shadow-md shadow-amber-500/20 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
            >
              {isLoading ? "Đang xác thực..." : "Đăng Nhập Quản Trị"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
