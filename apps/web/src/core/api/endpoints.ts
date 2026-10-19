export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: "/auth/login",
    PROFILE: "/auth/profile",
  },
  MENU: {
    CATEGORIES: "/product-ctgs/client/list",
    PRODUCTS: "/products",
    FEATURED_COMBOS: "/featured-combos",
    TV_MENU: "/tv-menu/data",
    TV_MENU_STREAM: "/tv-menu/stream",
  },
  ORDERS: {
    CREATE_ONLINE: "/orders/online",
  },
  SETTINGS: {
    SECTIONS: "/setting-sections",
  },
} as const;
