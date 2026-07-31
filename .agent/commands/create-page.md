# Tạo Next.js Page

## Tổng Quan
Tạo một page mới trong Next.js App Router với module architecture. Page sẽ import từ module pages.

## Các Bước
1. **Tạo module page (nếu chưa có)**
   - Tạo page component trong `modules/{module}/pages/`
   - Component này sẽ được import bởi Next.js page
   - Tuân theo @nextjs-module-architecture rule

2. **Tạo Next.js route**
   - Tạo folder trong `src/app/` với tên route
   - Ví dụ: `app/products/[id]` cho dynamic route
   - Ví dụ: `app/products` cho static route

3. **Tạo file page.tsx trong app/**
   - Import page component từ module
   - Sử dụng Server Component mặc định
   - Export default function
   - Tuân theo @nextjs-components rule

3. **Tạo metadata (nếu cần)**
   - Export metadata object cho static metadata
   - Hoặc generateMetadata function cho dynamic metadata
   - Bao gồm title, description, Open Graph tags

4. **Tạo loading.tsx (nếu cần)**
   - Loading UI cho page
   - Sử dụng Suspense boundaries

5. **Tạo error.tsx (nếu cần)**
   - Error boundary cho page
   - Hiển thị error message thân thiện

## Ví Dụ Template

### Module Page Component
```tsx
// modules/products/pages/ProductsPage.tsx
'use client';

import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/shared/store';
import { fetchProducts } from '../store/productThunks';
import ProductList from '../components/ProductList';
import { useI18n } from '@/shared/i18n/hooks';

export default function ProductsPage() {
  const dispatch = useAppDispatch();
  const { items, loading } = useAppSelector((state) => state.products);
  const { t } = useI18n();

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  return (
    <div className="container mx-auto px-4 py-8 dark:bg-gray-900 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 dark:text-white">
        {t('products.title')}
      </h1>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <ProductList products={items} />
      )}
    </div>
  );
}
```

### Next.js Static Page
```tsx
// app/products/page.tsx
import { Metadata } from 'next';
import { ProductsPage } from '@/modules/products';

export const metadata: Metadata = {
  title: 'Products',
  description: 'Browse our product catalog',
};

export default function Page() {
  return <ProductsPage />;
}
```

### Module Dynamic Page Component
```tsx
// modules/products/pages/ProductDetailPage.tsx
'use client';

import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/shared/store';
import { fetchProductById } from '../store/productThunks';
import { useI18n } from '@/shared/i18n/hooks';

interface ProductDetailPageProps {
  productId: string;
}

export default function ProductDetailPage({ productId }: ProductDetailPageProps) {
  const dispatch = useAppDispatch();
  const { selectedProduct, loading } = useAppSelector((state) => state.products);
  const { t } = useI18n();

  useEffect(() => {
    dispatch(fetchProductById(productId));
  }, [dispatch, productId]);

  if (loading) return <div>Loading...</div>;
  if (!selectedProduct) return <div>Product not found</div>;

  return (
    <div className="container mx-auto px-4 py-8 dark:bg-gray-900 min-h-screen">
      <h1 className="text-3xl font-bold mb-4 dark:text-white">
        {selectedProduct.name}
      </h1>
      <p className="text-gray-600 dark:text-gray-400">
        {selectedProduct.description}
      </p>
    </div>
  );
}
```

### Next.js Dynamic Page
```tsx
// app/products/[id]/page.tsx
import { Metadata } from 'next';
import { ProductDetailPage } from '@/modules/products';

type Props = {
  params: { id: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  // Fetch product for metadata
  const product = await getProduct(params.id);
  return {
    title: product.name,
    description: product.description,
  };
}

export default function Page({ params }: Props) {
  return <ProductDetailPage productId={params.id} />;
}
```

### Loading State
```tsx
// app/products/loading.tsx
export default function Loading() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="animate-pulse">
        <div className="h-8 bg-gray-200 rounded w-1/4 mb-4"></div>
        <div className="space-y-4">
          <div className="h-32 bg-gray-200 rounded"></div>
          <div className="h-32 bg-gray-200 rounded"></div>
        </div>
      </div>
    </div>
  );
}
```

### Error Boundary
```tsx
// app/products/error.tsx
'use client';

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-4">Something went wrong!</h2>
      <button onClick={reset} className="px-4 py-2 bg-blue-500 text-white rounded">
        Try again
      </button>
    </div>
  );
}
```

## Checklist
- [ ] Page component được tạo
- [ ] Metadata được định nghĩa
- [ ] Data fetching được implement
- [ ] Loading state (nếu cần)
- [ ] Error handling (nếu cần)
- [ ] Styling với Tailwind
- [ ] TypeScript types đầy đủ
