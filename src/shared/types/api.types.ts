/**
 * NestJS Standard API Response Wrapper DTO
 */
export interface ApiResponse<T> {
  success?: boolean;
  ok?: boolean;
  statusCode?: number;
  message?: string;
  data: T;
}

export interface PaginatedMeta {
  itemCount: number;
  totalItems: number;
  itemsPerPage: number;
  totalPages: number;
  currentPage: number;
}

export interface PaginatedResponse<T> {
  items: T[];
  meta: PaginatedMeta;
}
