import apiClient from "@/core/api/client";
import { API_ENDPOINTS } from "@/core/api/endpoints";
import { LoginDto, AuthResponse, User } from "../types/auth.types";

export const authApi = {
  login: async (data: LoginDto): Promise<AuthResponse> => {
    const res = await apiClient.post<unknown, AuthResponse>(
      API_ENDPOINTS.AUTH.LOGIN,
      data,
    );
    return res;
  },

  getProfile: async (): Promise<User> => {
    const res = await apiClient.get<unknown, User>(
      API_ENDPOINTS.AUTH.PROFILE,
    );
    return res;
  },
};
