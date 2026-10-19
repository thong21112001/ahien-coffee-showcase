import apiClient from "@/core/api/client";
import { API_ENDPOINTS } from "@/core/api/endpoints";
import { CreateOrderPayload } from "../types/cart.types";

export const orderApi = {
  createOnlineOrder: async (payload: CreateOrderPayload): Promise<unknown> => {
    return await apiClient.post(API_ENDPOINTS.ORDERS.CREATE_ONLINE, payload);
  },
};
