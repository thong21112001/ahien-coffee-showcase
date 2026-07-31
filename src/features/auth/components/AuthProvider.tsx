"use client";

import React, { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useAuthStore } from "../hooks/useAuthStore";
import { AccessDenied } from "@/shared/components/feedback/AccessDenied";

const ROUTE_PERMISSIONS = [
  { prefix: "/users", resource: "users", action: "read" },
  { prefix: "/roles", resource: "roles", action: "read" },
  { prefix: "/customers", resource: "customers", action: "read" },
  { prefix: "/product-manager/categories", resource: "categories", action: "read" },
  { prefix: "/product-manager/products", resource: "products", action: "read" },
  { prefix: "/product-manager/pricing", resource: "pricing", action: "read" },
  { prefix: "/product-manager", resource: "products", action: "read" },
  { prefix: "/quotations", resource: "quotations", action: "read" },
  { prefix: "/system-config", resource: "system_config", action: "read" },
];

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const { isAuthenticated, user, getProfile, logout } = useAuthStore();
  const [isInitialized, setIsInitialized] = useState(false);
  const [isAuthorized, setIsAuthorized] = useState(true);

  useEffect(() => {
    const initAuth = async () => {
      const token =
        typeof window !== "undefined"
          ? localStorage.getItem("access_token")
          : null;

      if (token && !isAuthenticated) {
        try {
          await getProfile();
        } catch {
          logout();
        }
      }
      setIsInitialized(true);
    };

    initAuth();
  }, [isAuthenticated, getProfile, logout]);

  useEffect(() => {
    if (!isInitialized) return;

    const isLoginRoute = pathname === "/login";
    const isPublicRoute =
      pathname === "/" ||
      pathname === "/menu" ||
      pathname.startsWith("/menu/");

    if (!isAuthenticated && !isLoginRoute && !isPublicRoute) {
      router.push("/login");
    } else if (isAuthenticated && isLoginRoute) {
      router.push("/");
    }
  }, [isInitialized, isAuthenticated, pathname, router]);

  useEffect(() => {
    if (!isInitialized || !isAuthenticated || !user) {
      setIsAuthorized(true);
      return;
    }

    const match = ROUTE_PERMISSIONS.find((route) =>
      pathname.startsWith(route.prefix),
    );

    if (match) {
      let authorized = false;
      if (user.roleName === "super_admin" || user.role === "super_admin") {
        authorized = true;
      } else {
        authorized =
          user.permissions?.some(
            (p) => p.resource === match.resource && p.action === match.action,
          ) ?? false;
      }
      setIsAuthorized(authorized);
    } else {
      setIsAuthorized(true);
    }
  }, [pathname, isInitialized, isAuthenticated, user]);

  if (!isInitialized) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-stone-50 text-stone-600">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-[#D9A05B] mb-4"></div>
        <p className="text-sm font-semibold">Đang khởi tạo ứng dụng...</p>
      </div>
    );
  }

  const isPublic =
    pathname === "/" ||
    pathname === "/menu" ||
    pathname.startsWith("/menu/");

  if (!isAuthenticated && pathname !== "/login" && !isPublic) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-stone-50 text-stone-500 text-sm">
        Đang chuyển hướng đến trang đăng nhập...
      </div>
    );
  }

  if (isAuthenticated && !isAuthorized) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-stone-50">
        <AccessDenied />
      </div>
    );
  }

  return <>{children}</>;
}
