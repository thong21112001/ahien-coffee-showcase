# Khởi Tạo Dự Án Next.js

## Tổng Quan
Khởi tạo dự án Next.js mới với cấu trúc module hóa, Redux, i18n, theme system và các thành phần cơ bản.

## Các Bước Khởi Tạo

### 1. Tạo Cấu Trúc Thư Mục

Tạo các thư mục cơ bản cho dự án:

```
src/
├── modules/
├── shared/
│   ├── components/
│   ├── hooks/
│   ├── store/
│   ├── i18n/
│   ├── types/
│   └── utils/
└── locales/
    ├── en/
    └── vi/
```

### 2. Setup Redux Store

#### Store Configuration
```typescript
// src/shared/store/store.ts
import { configureStore } from '@reduxjs/toolkit';
import { useDispatch, useSelector, TypedUseSelectorHook } from 'react-redux';
import rootReducer from './rootReducer';

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST'],
      },
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Typed hooks
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
```

#### Root Reducer
```typescript
// src/shared/store/rootReducer.ts
import { combineReducers } from '@reduxjs/toolkit';
import themeReducer from './themeSlice';

const rootReducer = combineReducers({
  theme: themeReducer,
  // Add other reducers here
});

export default rootReducer;
```

#### Theme Slice
```typescript
// src/shared/store/themeSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type Theme = 'light' | 'dark';

interface ThemeState {
  theme: Theme;
}

const getInitialTheme = (): Theme => {
  if (typeof window !== 'undefined') {
    const savedTheme = localStorage.getItem('theme') as Theme;
    if (savedTheme) return savedTheme;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }
  return 'light';
};

const initialState: ThemeState = {
  theme: getInitialTheme(),
};

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    setTheme: (state, action: PayloadAction<Theme>) => {
      state.theme = action.payload;
      if (typeof window !== 'undefined') {
        localStorage.setItem('theme', action.payload);
        document.documentElement.classList.toggle('dark', action.payload === 'dark');
      }
    },
    toggleTheme: (state) => {
      const newTheme = state.theme === 'light' ? 'dark' : 'light';
      state.theme = newTheme;
      if (typeof window !== 'undefined') {
        localStorage.setItem('theme', newTheme);
        document.documentElement.classList.toggle('dark', newTheme === 'dark');
      }
    },
  },
});

export const { setTheme, toggleTheme } = themeSlice.actions;
export default themeSlice.reducer;
```

### 3. Setup i18n

#### i18n Configuration
```typescript
// src/shared/i18n/config.ts
import { initReactI18next } from 'react-i18next';
import i18n from 'i18next';
import enCommon from '@/locales/en/common.json';
import viCommon from '@/locales/vi/common.json';

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        common: enCommon,
      },
      vi: {
        common: viCommon,
      },
    },
    lng: 'vi', // Default language
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
```

#### i18n Hooks
```typescript
// src/shared/i18n/hooks.ts
import { useTranslation } from 'react-i18next';

export const useI18n = () => {
  const { t, i18n } = useTranslation();
  
  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };
  
  return {
    t,
    currentLanguage: i18n.language,
    changeLanguage,
    availableLanguages: ['en', 'vi'],
  };
};
```

#### Translation Files

```json
// src/locales/en/common.json
{
  "app": {
    "name": "My App",
    "description": "A Next.js application"
  },
  "buttons": {
    "save": "Save",
    "cancel": "Cancel",
    "delete": "Delete",
    "edit": "Edit",
    "add": "Add",
    "close": "Close"
  },
  "messages": {
    "success": "Operation completed successfully",
    "error": "An error occurred",
    "loading": "Loading...",
    "noData": "No data available"
  },
  "theme": {
    "light": "Light",
    "dark": "Dark",
    "toggle": "Toggle theme"
  },
  "language": {
    "en": "English",
    "vi": "Tiếng Việt",
    "switch": "Switch language"
  }
}
```

```json
// src/locales/vi/common.json
{
  "app": {
    "name": "Ứng dụng của tôi",
    "description": "Ứng dụng Next.js"
  },
  "buttons": {
    "save": "Lưu",
    "cancel": "Hủy",
    "delete": "Xóa",
    "edit": "Sửa",
    "add": "Thêm",
    "close": "Đóng"
  },
  "messages": {
    "success": "Thao tác thành công",
    "error": "Đã xảy ra lỗi",
    "loading": "Đang tải...",
    "noData": "Không có dữ liệu"
  },
  "theme": {
    "light": "Sáng",
    "dark": "Tối",
    "toggle": "Chuyển đổi theme"
  },
  "language": {
    "en": "English",
    "vi": "Tiếng Việt",
    "switch": "Chuyển đổi ngôn ngữ"
  }
}
```

### 4. Setup Tailwind với Dark Mode

#### Tailwind Config
```javascript
// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class', // Enable class-based dark mode
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/modules/**/*.{js,ts,jsx,tsx,mdx}',
    './src/shared/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Add custom colors if needed
      },
    },
  },
  plugins: [],
}
```

#### Global Styles
```css
/* src/app/globals.css */
@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  --foreground-rgb: 0, 0, 0;
  --background-start-rgb: 214, 219, 220;
  --background-end-rgb: 255, 255, 255;
}

@media (prefers-color-scheme: dark) {
  :root {
    --foreground-rgb: 255, 255, 255;
    --background-start-rgb: 0, 0, 0;
    --background-end-rgb: 0, 0, 0;
  }
}

body {
  color: rgb(var(--foreground-rgb));
  background: linear-gradient(
      to bottom,
      transparent,
      rgb(var(--background-end-rgb))
    )
    rgb(var(--background-start-rgb));
}
```

### 5. Tạo Base Components

#### Theme Provider
```tsx
// src/shared/components/ThemeProvider/ThemeProvider.tsx
'use client';

import { useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '@/shared/store';
import { setTheme } from '@/shared/store/themeSlice';

export default function ThemeProvider({ children }: { children: React.ReactNode }) {
  const dispatch = useAppDispatch();
  const theme = useAppSelector((state) => state.theme.theme);

  useEffect(() => {
    // Apply theme on mount
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }, [theme]);

  return <>{children}</>;
}
```

#### Theme Toggle
```tsx
// src/shared/components/ThemeToggle/ThemeToggle.tsx
'use client';

import { useAppDispatch, useAppSelector } from '@/shared/store';
import { toggleTheme } from '@/shared/store/themeSlice';
import { useI18n } from '@/shared/i18n/hooks';

export default function ThemeToggle() {
  const dispatch = useAppDispatch();
  const theme = useAppSelector((state) => state.theme.theme);
  const { t } = useI18n();

  return (
    <button
      onClick={() => dispatch(toggleTheme())}
      className="p-2 rounded-lg bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
      aria-label={t('theme.toggle')}
    >
      {theme === 'light' ? '🌙' : '☀️'}
    </button>
  );
}
```

#### Language Switcher
```tsx
// src/shared/components/LanguageSwitcher/LanguageSwitcher.tsx
'use client';

import { useI18n } from '@/shared/i18n/hooks';

export default function LanguageSwitcher() {
  const { currentLanguage, changeLanguage, availableLanguages, t } = useI18n();
  
  return (
    <select
      value={currentLanguage}
      onChange={(e) => changeLanguage(e.target.value)}
      className="px-3 py-2 border rounded dark:bg-gray-800 dark:text-white dark:border-gray-700"
      aria-label={t('language.switch')}
    >
      {availableLanguages.map((lang) => (
        <option key={lang} value={lang}>
          {t(`language.${lang}`)}
        </option>
      ))}
    </select>
  );
}
```

#### Button Component
```tsx
// src/shared/components/Button/Button.tsx
'use client';

import { ButtonProps } from './Button.types';

export default function Button({ 
  children, 
  variant = 'primary', 
  onClick,
  className = '',
  disabled = false,
  type = 'button',
  ...props 
}: ButtonProps) {
  const baseClasses = "px-4 py-2 rounded font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed";
  const variantClasses = {
    primary: "bg-blue-500 text-white hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700",
    secondary: "bg-gray-200 text-gray-800 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600",
    danger: "bg-red-500 text-white hover:bg-red-600 dark:bg-red-600 dark:hover:bg-red-700",
  };
  
  return (
    <button
      type={type}
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
      onClick={onClick}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
}
```

```tsx
// src/shared/components/Button/Button.types.ts
export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger';
  children: React.ReactNode;
}
```

```tsx
// src/shared/components/Button/index.ts
export { default } from './Button';
export type { ButtonProps } from './Button.types';
```

### 6. Setup Root Layout

```tsx
// src/app/layout.tsx
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Providers } from './providers';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'My Next.js App',
  description: 'A Next.js application with module architecture',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="vi" suppressHydrationWarning>
      <body className={inter.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
```

```tsx
// src/app/providers.tsx
'use client';

import { Provider } from 'react-redux';
import { store } from '@/shared/store';
import ThemeProvider from '@/shared/components/ThemeProvider';
import '@/shared/i18n/config';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <ThemeProvider>
        {children}
      </ThemeProvider>
    </Provider>
  );
}
```

### 7. Tạo Module Ví Dụ (Optional)

Tạo module "home" làm ví dụ:

```
src/modules/home/
├── components/
│   └── Welcome/
│       ├── Welcome.tsx
│       ├── Welcome.types.ts
│       └── index.ts
├── pages/
│   └── HomePage.tsx
└── index.ts
```

### 8. Package Dependencies

Đảm bảo các packages sau đã được cài đặt:

```json
{
  "dependencies": {
    "@reduxjs/toolkit": "^2.0.0",
    "react-redux": "^9.0.0",
    "i18next": "^23.0.0",
    "react-i18next": "^14.0.0",
    "zod": "^3.22.0"
  },
  "devDependencies": {
    "@types/react": "^18.0.0",
    "@types/react-dom": "^18.0.0",
    "tailwindcss": "^3.4.0",
    "autoprefixer": "^10.4.0",
    "postcss": "^8.4.0"
  }
}
```

## Checklist Khởi Tạo

- [ ] Cấu trúc thư mục được tạo
- [ ] Redux store được setup
- [ ] Theme slice được tạo
- [ ] i18n được cấu hình
- [ ] Translation files được tạo (en, vi)
- [ ] Tailwind config với dark mode
- [ ] Global styles được setup
- [ ] Theme Provider được tạo
- [ ] Theme Toggle component được tạo
- [ ] Language Switcher được tạo
- [ ] Button component được tạo
- [ ] Root Layout với Providers
- [ ] Providers component với Redux và Theme
- [ ] Package dependencies được cài đặt
- [ ] TypeScript paths được cấu hình (tsconfig.json)

## TypeScript Paths Configuration

```json
// tsconfig.json
{
  "compilerOptions": {
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```

## Next.js Config

```javascript
// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  // Add your config here
}

module.exports = nextConfig
```

## Sau Khi Khởi Tạo

1. **Test Redux**: Kiểm tra theme toggle hoạt động
2. **Test i18n**: Kiểm tra language switcher hoạt động
3. **Test Dark Mode**: Kiểm tra dark mode classes được áp dụng
4. **Tạo Module Đầu Tiên**: Sử dụng `/create-module` command
5. **Review Code**: Sử dụng `/review-nextjs-code` để kiểm tra

## Lưu Ý

- Đảm bảo Next.js project đã được tạo với `npx create-next-app@latest`
- Cài đặt các dependencies trước khi chạy command này
- Kiểm tra TypeScript paths trong tsconfig.json
- Đảm bảo Tailwind CSS đã được setup trong Next.js project
