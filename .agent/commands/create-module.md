# Tạo Module Mới

## Tổng Quan
Tạo một module mới với cấu trúc đầy đủ theo kiến trúc module hóa.

## Cấu Trúc Module

```
modules/{module-name}/
├── components/          # Components riêng của module
├── pages/              # Pages của module (để Next.js import)
├── hooks/              # Custom hooks
├── services/           # API services
├── store/             # Redux store cho module
│   ├── {module}Slice.ts
│   ├── {module}Thunks.ts
│   └── {module}Types.ts
├── types/              # TypeScript types
├── utils/              # Utilities
├── locales/            # i18n translations
│   ├── en.json
│   └── vi.json
└── index.ts            # Export chính
```

## Các Bước

### 1. Tạo Cấu Trúc Thư Mục

```bash
mkdir -p modules/{module-name}/{components,pages,hooks,services,store,types,utils,locales}
```

### 2. Tạo Redux Store

#### Slice
```typescript
// modules/{module}/store/{module}Slice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchItems, createItem } from './{module}Thunks';

interface {Module}State {
  items: any[];
  loading: boolean;
  error: string | null;
}

const initialState: {Module}State = {
  items: [],
  loading: false,
  error: null,
};

const {module}Slice = createSlice({
  name: '{module}',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchItems.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchItems.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchItems.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch items';
      });
  },
});

export const { clearError } = {module}Slice.actions;
export default {module}Slice.reducer;
```

#### Thunks
```typescript
// modules/{module}/store/{module}Thunks.ts
import { createAsyncThunk } from '@reduxjs/toolkit';
import { {module}Service } from '../services/{module}Service';

export const fetchItems = createAsyncThunk(
  '{module}/fetchItems',
  async (_, { rejectWithValue }) => {
    try {
      const items = await {module}Service.getAll();
      return items;
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : 'Failed to fetch items'
      );
    }
  }
);

export const createItem = createAsyncThunk(
  '{module}/createItem',
  async (data: any, { rejectWithValue }) => {
    try {
      const item = await {module}Service.create(data);
      return item;
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : 'Failed to create item'
      );
    }
  }
);
```

#### Types
```typescript
// modules/{module}/store/{module}Types.ts
export interface {Module}Item {
  id: string;
  // Add other fields
}
```

### 3. Tạo Service

```typescript
// modules/{module}/services/{module}Service.ts
import { {Module}Item } from '../types/{module}.types';

class {Module}Service {
  async getAll(): Promise<{Module}Item[]> {
    const response = await fetch('/api/{module}');
    if (!response.ok) throw new Error('Failed to fetch');
    return response.json();
  }

  async getById(id: string): Promise<{Module}Item> {
    const response = await fetch(`/api/{module}/${id}`);
    if (!response.ok) throw new Error('Failed to fetch');
    return response.json();
  }

  async create(data: Partial<{Module}Item>): Promise<{Module}Item> {
    const response = await fetch('/api/{module}', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error('Failed to create');
    return response.json();
  }
}

export const {module}Service = new {Module}Service();
```

### 4. Tạo Types

```typescript
// modules/{module}/types/{module}.types.ts
export interface {Module}Item {
  id: string;
  // Add fields
}

export interface Create{Module}Dto {
  // Add fields
}
```

### 5. Tạo i18n Translations

```json
// modules/{module}/locales/en.json
{
  "title": "{Module}",
  "add": "Add {Module}",
  "edit": "Edit {Module}",
  "delete": "Delete {Module}"
}
```

```json
// modules/{module}/locales/vi.json
{
  "title": "{Module}",
  "add": "Thêm {Module}",
  "edit": "Sửa {Module}",
  "delete": "Xóa {Module}"
}
```

### 6. Tạo Page Component

```tsx
// modules/{module}/pages/{Module}Page.tsx
'use client';

import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/shared/store';
import { fetchItems } from '../store/{module}Thunks';
import { useI18n } from '@/shared/i18n/hooks';

export default function {Module}Page() {
  const dispatch = useAppDispatch();
  const { items, loading } = useAppSelector((state) => state.{module});
  const { t } = useI18n();

  useEffect(() => {
    dispatch(fetchItems());
  }, [dispatch]);

  return (
    <div className="container mx-auto px-4 py-8 dark:bg-gray-900 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 dark:text-white">
        {t('{module}.title')}
      </h1>
      {loading ? <div>Loading...</div> : <div>{/* Render items */}</div>}
    </div>
  );
}
```

### 7. Tạo Index Export

```typescript
// modules/{module}/index.ts
export { default as {Module}Page } from './pages/{Module}Page';
export * from './components';
export * from './hooks';
export * from './store';
export * from './types';
```

### 8. Thêm Reducer vào Root Reducer

```typescript
// shared/store/rootReducer.ts
import { combineReducers } from '@reduxjs/toolkit';
import {module}Reducer from '@/modules/{module}/store/{module}Slice';

const rootReducer = combineReducers({
  // ... other reducers
  {module}: {module}Reducer,
});

export default rootReducer;
```

### 9. Tạo Next.js Page (Optional)

```tsx
// app/{module}/page.tsx
import { {Module}Page } from '@/modules/{module}';

export default function Page() {
  return <{Module}Page />;
}
```

## Checklist

- [ ] Cấu trúc thư mục được tạo
- [ ] Redux slice, thunks, types được tạo
- [ ] Service được tạo
- [ ] Types được định nghĩa
- [ ] i18n translations được thêm
- [ ] Page component được tạo
- [ ] Index export được tạo
- [ ] Reducer được thêm vào rootReducer
- [ ] Next.js page được tạo (nếu cần)
- [ ] Components sử dụng theme (dark/light mode)
- [ ] Components sử dụng i18n
