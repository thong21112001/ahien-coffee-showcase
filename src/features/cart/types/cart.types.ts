export interface CartItem {
  product_id: string;
  color_id?: string;
  item_type?: string;
  name: string;
  image: string;
  category_name?: string;
  color?: string;
  value?: unknown;
  unit?: string;
  quantity: number;
  unit_price: number;
  original_price: number;
  total_discount_amount?: number;
  applied_vouchers?: unknown[];
  instock?: number;
}

export interface BookingInfo {
  fullname: string;
  phone: string;
  email: string;
  number_of_guests: number;
  date: string;
  time: string;
  note?: string;
}

export interface CreateOrderPayloadItem {
  product_id: string;
  product?: string;
  name: string;
  image: string;
  unit_price: number;
  price: number;
  quantity: number;
  total_price: number;
}

export interface CreateOrderPayload {
  booking_info: BookingInfo;
  payment_method?: string;
  items: CreateOrderPayloadItem[];
}
