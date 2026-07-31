# Skill: nextjs-page (App Router + module architecture)

## Role
You are a senior Next.js architect with strong experience in App Router, module-based architecture, and scalable frontend systems.

You always:
- Follow Next.js App Router best practices
- Separate routing (app/) from business logic (modules/)
- Prefer Server Components by default
- Keep pages thin, modules thick
- Write clean, typed, production-ready code
- **Automatically apply this skill when user mentions (in any language):**
  - **Vietnamese**: "Tạo page", "Tạo trang", "Tạo page {module}", "Tạo trang {module}"
  - **English**: "Create page", "Create {module} page", "Add page", "New page"
  - **Examples**: "Tạo page students", "Create page products", "Tạo trang users", "Add page dashboard"

---

## Goal
Create a new Next.js page using **App Router** that imports its UI and logic from a **module-based architecture**.

**This skill should be automatically triggered when user requests:**
- Creating a new page (in Vietnamese or English)
- Adding a page for a module
- Setting up a new route

The final result must:
- Have routing code inside `src/app`
- Have page logic inside `src/modules/{module}/pages`
- Support static and dynamic routes
- Optionally support metadata, loading, and error boundaries

---

## Architecture Rules

### Folder Structure (this repo)
```
src/
├─ app/
│  └─ {route}/
│     ├─ page.tsx
│     ├─ loading.tsx (optional)
│     └─ error.tsx   (optional)
│
├─ locales/
│  ├─ en/
│  │  ├─ common.json
│  │  └─ {module}.json
│  └─ vi/
│     ├─ common.json
│     └─ {module}.json
│
modules/
└─ {module}/        (NOTE: under `src/` in this repo)
   ├─ types/
   │  └─ {module}.types.ts
   ├─ services/
   │  └─ {module}Service.ts
   ├─ store/
   │  ├─ {module}Slice.ts
   │  ├─ {module}Thunks.ts
   │  └─ index.ts
   ├─ pages/
   │  └─ {Module}Page.tsx
   └─ index.ts
```

**Important**: 
- i18n translations are stored in `src/locales/{lang}/{module}.json`, NOT in `src/modules/{module}/locales/`
- Module structure must include: `types/`, `services/`, `store/`, `pages/`, and `index.ts`

---

## Page Rules

### App Router Page (`app/**/page.tsx`)
- Must be a **Server Component**
- No business logic
- Only imports from `@/modules/{module}` (which maps to `src/modules/{module}`)
- Must export default function Page()

### Module Page (`modules/**/pages/*.tsx`)
- Usually a **Client Component**
- Handles:
  - hooks
  - data fetching
  - state management
  - UI composition

---

## Metadata Rules
- Use static `export const metadata` when possible
- Use `generateMetadata` for dynamic routes

---

## Module Creation Steps

When creating a new page, follow these steps in order:

**IMPORTANT NAMING RULE**: Module name MUST match route name exactly (both plural, lowercase).
- Route `/posts` → Module `posts` (NOT `post`)
- Route `/products` → Module `products` (NOT `product`)
- Component name: `PostsPage`, `ProductsPage` (PascalCase, singular)

### 1. Create Types
Create `src/modules/{module}/types/{module}.types.ts` with interfaces:
- `{Module}` - Main entity interface
- `Create{Module}Dto` - DTO for creating
- `Update{Module}Dto` - DTO for updating

### 2. Create Service
Create `src/modules/{module}/services/{module}Service.ts` with:
- Dummy data array
- Service class with CRUD methods
- Simulated API delays

### 3. Create Redux Store
Create Redux store files:
- `src/modules/{module}/store/{module}Thunks.ts` - Async thunks
- `src/modules/{module}/store/{module}Slice.ts` - Redux slice
- `src/modules/{module}/store/index.ts` - Store exports

### 4. Create Page Component
Create `src/modules/{module}/pages/{Module}Page.tsx`:
- Client Component with Redux hooks
- i18n support
- UI with loading/error states

### 5. Create Module Index
Create `src/modules/{module}/index.ts` with exports:
- Page component
- Store exports
- Types exports
- Service export

### 6. Create Next.js Route
Create `src/app/{route}/page.tsx`:
- Server Component
- Import page from module
- Add metadata

### 7. Create Translations
Create translation files:
- `src/locales/en/{module}.json`
- `src/locales/vi/{module}.json`

### 8. Update Configurations

**CRITICAL**: You MUST update `src/store/rootReducer.ts` and `src/shared/i18n/config.ts` for the module to work properly.

#### Update Root Reducer (REQUIRED)
**MUST update** `src/store/rootReducer.ts`:

```typescript
// src/store/rootReducer.ts
import { combineReducers } from '@reduxjs/toolkit';
import themeReducer from '@/shared/store/themeSlice';
import { postsReducer } from '@/modules/posts/store';
import { {module}Reducer } from '@/modules/{module}/store'; // ADD THIS IMPORT

const rootReducer = combineReducers({
  theme: themeReducer,
  posts: postsReducer,
  {module}: {module}Reducer, // ADD THIS LINE
  // Add other reducers here
});

export default rootReducer;
```

**Important**: 
- Always import the reducer from `@/modules/{module}/store`
- Add it to the `combineReducers` object with the module name as key
- This step is **REQUIRED** for Redux to work properly
- `src/store/rootReducer.ts` is NOT in `shared/`, so it CAN import from modules

#### Update i18n Config
Add translations to `src/shared/i18n/config.ts`:

```typescript
// src/shared/i18n/config.ts
import en{Module} from '@/locales/en/{module}.json';
import vi{Module} from '@/locales/vi/{module}.json';

i18n.init({
  resources: {
    en: {
      common: {
        ...enCommon,
        {module}: en{Module},
      },
      // ... other namespaces remain available as separate namespaces if you keep them
    },
    vi: {
      common: {
        ...viCommon,
        {module}: vi{Module},
      },
      // ... other namespaces remain available as separate namespaces if you keep them
    },
  },
  // Add {module} to ns array only if you plan to use `t('key', { ns: '{module}' })`
  ns: ['common', 'posts', 'about', 'tasks', '{module}'],
  // ...
});
```

#### Add Navigation Link (Optional)
Add link to `src/shared/components/Header/Header.tsx` if needed.

---

## Dummy Data Rules

When creating pages for development/testing, use dummy data in services:

### Service with Dummy Data
```typescript
// src/modules/{module}/services/{module}Service.ts
import { Item, CreateItemDto, UpdateItemDto } from '../types/{module}.types';

// Dummy data
const dummyItems: Item[] = [
  {
    id: '1',
    title: 'Example Item 1',
    content: 'Content here',
    createdAt: '2024-01-15T10:00:00Z',
  },
  // ... more items
];

// Simulate API delay
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

class {Module}Service {
  private items: Item[] = [...dummyItems];

  async getAll(): Promise<Item[]> {
    await delay(500); // Simulate network delay
    return [...this.items];
  }

  async getById(id: string): Promise<Item> {
    await delay(300);
    const item = this.items.find((i) => i.id === id);
    if (!item) throw new Error('Item not found');
    return { ...item };
  }

  async create(data: CreateItemDto): Promise<Item> {
    await delay(400);
    const newItem: Item = {
      id: Date.now().toString(),
      ...data,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    this.items.push(newItem);
    return { ...newItem };
  }

  async update(id: string, data: UpdateItemDto): Promise<Item> {
    await delay(400);
    const index = this.items.findIndex((i) => i.id === id);
    if (index === -1) throw new Error('Item not found');
    const updatedItem: Item = {
      ...this.items[index],
      ...data,
      updatedAt: new Date().toISOString(),
    };
    this.items[index] = updatedItem;
    return { ...updatedItem };
  }

  async delete(id: string): Promise<void> {
    await delay(300);
    const index = this.items.findIndex((i) => i.id === id);
    if (index === -1) throw new Error('Item not found');
    this.items.splice(index, 1);
  }
}

export const {module}Service = new {Module}Service();
```

### Best Practices
- Store dummy data as a constant array at the top of the service file
- Use in-memory storage (`private items: Item[]`) to persist changes during session
- Add `delay()` function to simulate network latency (300-500ms)
- Support full CRUD operations (create, read, update, delete)
- Data resets on page refresh (in-memory only)
- Replace with actual API calls when backend is ready

---

## i18n Translation Rules

### Translation File Location
- **Store translations in**: `src/locales/{lang}/{module}.json`
- **NOT in**: `src/modules/{module}/locales/{lang}.json`
- Create files for both `en` and `vi` languages

### Translation File Structure
```json
// src/locales/en/{module}.json
{
  "title": "{Module}",
  "welcome": "Welcome to {Module} Page",
  "description": "Browse and manage all {module}",
  "add": "Add {Module}",
  "edit": "Edit {Module}",
  "delete": "Delete {Module}",
  "loading": "Loading...",
  "error": "An error occurred",
  "noItems": "No {module} available"
}
```

```json
// src/locales/vi/{module}.json
{
  "title": "{Module}",
  "welcome": "Chào mừng đến Trang {Module}",
  "description": "Duyệt và quản lý tất cả {module}",
  "add": "Thêm {Module}",
  "edit": "Sửa {Module}",
  "delete": "Xóa {Module}",
  "loading": "Đang tải...",
  "error": "Đã xảy ra lỗi",
  "noItems": "Không có {module} nào"
}
```

### Update i18n Config
After creating translation files, update `src/shared/i18n/config.ts`:

```typescript
import en{Module} from '@/locales/en/{module}.json';
import vi{Module} from '@/locales/vi/{module}.json';

i18n.init({
  resources: {
    en: {
      common: {
        ...enCommon,
        {module}: en{Module},
      },
      // ... other namespaces
    },
    vi: {
      common: {
        ...viCommon,
        {module}: vi{Module},
      },
      // ... other namespaces
    },
  },
  ns: ['common', 'posts', 'about', 'tasks', '{module}'],
  // ...
});
```

### Using Translations in Components
```tsx
'use client';

import { useI18n } from '@/shared/i18n/hooks';

export default function {Module}Page() {
  const { t } = useI18n();
  
  // This repo uses `useTranslation('common')`, so dot-keys must exist under `common`
  return <h1>{t('{module}.title')}</h1>;
}
```

---

## Module File Templates

Refer to the templates in the following directory for the base code of each file. Always copy these files and replace `{module}` and `{Module}` with the actual names.

**Template Path**: `.agent/skills/nextjs-page/templates/`

### Template Mapping:
| File to Create | Template Source File |
| :--- | :--- |
| `src/modules/{module}/types/{module}.types.ts` | `module/types/module.types.ts` |
| `src/modules/{module}/services/{module}Service.ts` | `module/services/moduleService.ts` |
| `src/modules/{module}/store/{module}Thunks.ts` | `module/store/moduleThunks.ts` |
| `src/modules/{module}/store/{module}Slice.ts` | `module/store/moduleSlice.ts` |
| `src/modules/{module}/store/index.ts` | `module/store/index.ts` |
| `src/modules/{module}/pages/{Module}Page.tsx` | `module/pages/ModulePage.tsx` |
| `src/modules/{module}/index.ts` | `module/index.ts` |
| `src/app/{route}/page.tsx` | `app/route/page.tsx` |
| `src/locales/en/{module}.json` | `locales/en/module.json` |
| `src/locales/vi/{module}.json` | `locales/vi/module.json` |

---

---

## Prompt Recognition

This skill automatically recognizes requests in multiple languages:

### Vietnamese Prompts
- "Tạo page {module}"
- "Tạo trang {module}"
- "Tạo landing page {module}"
- "Tạo trang landing {module}"
- "Hãy tạo page {module} kiểu landing"

### English Prompts
- "Create page {module}"
- "Create {module} page"
- "Create landing page {module}"
- "Add landing page {module}"
- "New landing page {module}"

### Landing Page vs CRUD Page Logic
**CRITICAL**: Intelligently detect the page type based on the prompt context and keywords.

#### Detection Logic:
Analyze the full prompt to determine user intent:

1. **CRUD/List Manager Page** - Create when:
   - **Explicit CRUD keywords**: "crud", "list", "manager", "quản lý", "danh sách", "manage", "dashboard"
   - **Context implies data management**: "users list", "product manager", "task board", etc.
   - **Template**: Use `module/pages/ModulePage.tsx`
   - **Service/Store**: Required
   - **UI**: Includes "Add", "Edit", "Delete" buttons

2. **Landing Page** - Create when:
   - **Explicit landing keywords**: "landing", "about", "giới thiệu", "introduce", "showcase", "portfolio"
   - **Context implies static/marketing**: "home page", "company profile", "team page", etc.
   - **Template**: Use `module/pages/LandingPage.tsx`
   - **Service/Store**: Optional (skip for purely static)
   - **UI**: No "Edit" or "Delete" buttons

3. **Smart Decision** - If unclear:
   - Consider the module name context (e.g., "profile", "about" → likely landing)
   - Consider common patterns (e.g., "posts", "products", "tasks" → likely CRUD)
   - When in doubt, ask yourself: "Does this page need to manage/edit data?" → CRUD, otherwise → Landing

### Module Name Detection and Naming Convention

**CRITICAL**: Module name MUST match the route/page name exactly.

#### Naming Rules:
1. **Module folder name** = **Route name** = **Page name** (all lowercase, plural)
   - Route: `/posts` → Module: `posts` (NOT `post`)
   - Route: `/products` → Module: `products` (NOT `product`)
   - Route: `/students` → Module: `students` (NOT `student`)
   - Route: `/users` → Module: `users` (NOT `user`)

2. **File and folder naming**:
   - Module folder: `src/modules/{module}/` (lowercase, plural)
   - Types file: `{module}.types.ts` (lowercase, plural)
   - Service file: `{module}Service.ts` (lowercase, plural)
   - Slice file: `{module}Slice.ts` (lowercase, plural)
   - Thunks file: `{module}Thunks.ts` (lowercase, plural)
   - Page component: `{Module}Page.tsx` (PascalCase, singular for component name)
   - Translation file: `{module}.json` (lowercase, plural)

3. **Examples**:
   ```
   User says: "Tạo page posts"
   → Route: /posts
   → Module folder: src/modules/posts/
   → Page component: PostsPage.tsx
   → Types: posts.types.ts
   → Service: postsService.ts
   → Translation: posts.json
   ```

   ```
   User says: "Create page products"
   → Route: /products
   → Module folder: src/modules/products/
   → Page component: ProductsPage.tsx
   → Types: products.types.ts
   → Service: productsService.ts
   → Translation: products.json
   ```

4. **Extract module name from prompt**:
   - "Tạo page posts" → module: `posts`
   - "Create page products" → module: `products`
   - "Tạo trang users" → module: `users`
   - "Add page students" → module: `students`
   - Keep the exact form from the prompt (usually plural)

5. **Component naming**:
   - Component name: `{Module}Page` (PascalCase, singular form)
   - Example: `PostsPage`, `ProductsPage`, `UsersPage`
   - This is for React component naming convention (PascalCase, singular)

#### Summary:
- **Module/Route/Service names**: lowercase, plural (e.g., `posts`, `products`)
- **Component names**: PascalCase, singular (e.g., `PostsPage`, `ProductsPage`)
- **Always match**: Module name = Route name = Translation namespace
