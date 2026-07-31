import { create } from "zustand";
import { User, LoginDto } from "../types/auth.types";
import { authApi } from "../api/auth.api";

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  login: (data: LoginDto) => Promise<boolean>;
  getProfile: () => Promise<void>;
  logout: () => void;
  clearError: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,

  login: async (data: LoginDto) => {
    set({ isLoading: true, error: null });
    try {
      const response = await authApi.login(data);
      if (typeof window !== "undefined" && response?.accessToken) {
        localStorage.setItem("access_token", response.accessToken);
      }
      set({
        user: response.user,
        isAuthenticated: true,
        isLoading: false,
        error: null,
      });
      return true;
    } catch (err: unknown) {
      const errorMsg =
        (err as { response?: { data?: { message?: string } }; message?: string })
          ?.response?.data?.message ||
        (err as Error)?.message ||
        "Đăng nhập thất bại. Vui lòng kiểm tra lại thông tin!";
      set({ isLoading: false, error: errorMsg });
      return false;
    }
  },

  getProfile: async () => {
    try {
      const user = await authApi.getProfile();
      set({ user, isAuthenticated: true });
    } catch (err) {
      console.error("Failed to fetch profile:", err);
      set({ user: null, isAuthenticated: false });
      if (typeof window !== "undefined") {
        localStorage.removeItem("access_token");
      }
    }
  },

  logout: () => {
    set({ user: null, isAuthenticated: false, error: null });
    if (typeof window !== "undefined") {
      localStorage.removeItem("access_token");
    }
  },

  clearError: () => set({ error: null }),
}));
