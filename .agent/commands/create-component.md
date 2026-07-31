# Tạo Next.js Component

## Tổng Quan
Tạo component mới với cấu trúc đầy đủ, TypeScript types, và styling.

## Các Bước
1. **Xác định vị trí component**
   - **Module component**: `modules/{module}/components/ComponentName/`
   - **Shared component**: `shared/components/ComponentName/`
   - Base components vào shared, business components vào module

2. **Xác định loại component**
   - Server Component (mặc định) - không cần directive
   - Client Component - thêm `'use client'` nếu cần interactivity hoặc Redux hooks

3. **Tạo cấu trúc component**
   - Tạo folder: `ComponentName/`
   - Files: `ComponentName.tsx`, `ComponentName.types.ts`, `index.ts`
   - Tuân theo @nextjs-module-architecture rule

4. **Thêm TypeScript types**
   - Props interface trong `ComponentName.types.ts`
   - Export types từ types file

5. **Implement component**
   - Follow patterns từ @nextjs-components rule
   - Add styling với Tailwind và dark mode support
   - Sử dụng i18n nếu cần
   - Sử dụng Redux hooks nếu cần state management

6. **Tạo test file (nếu cần)**
   - `ComponentName.test.tsx` hoặc `ComponentName.spec.tsx`

## Ví Dụ Template

### Module Component Structure

```
modules/products/components/ProductCard/
├── ProductCard.tsx
├── ProductCard.types.ts
└── index.ts
```

### Module Component với Redux và i18n

```tsx
// modules/products/components/ProductCard/ProductCard.tsx
'use client';

import { useAppDispatch } from '@/shared/store';
import { addToCart } from '../../store/productThunks';
import { useI18n } from '@/shared/i18n/hooks';
import { Button } from '@/shared/components';
import { ProductCardProps } from './ProductCard.types';

export default function ProductCard({ product, onAddToCart }: ProductCardProps) {
  const dispatch = useAppDispatch();
  const { t } = useI18n();

  const handleAddToCart = () => {
    dispatch(addToCart(product.id));
    onAddToCart?.(product.id);
  };

  return (
    <div className="border rounded-lg p-4 shadow-md hover:shadow-lg transition-shadow dark:bg-gray-800 dark:border-gray-700">
      <img 
        src={product.image} 
        alt={product.name}
        className="w-full h-48 object-cover rounded mb-4"
      />
      <h3 className="text-xl font-semibold mb-2 dark:text-white">
        {product.name}
      </h3>
      {product.description && (
        <p className="text-gray-600 mb-4 dark:text-gray-400">
          {product.description}
        </p>
      )}
      <p className="text-2xl font-bold text-blue-600 dark:text-blue-400 mb-4">
        ${product.price.toFixed(2)}
      </p>
      <Button onClick={handleAddToCart}>
        {t('products.addToCart')}
      </Button>
    </div>
  );
}
```

```tsx
// modules/products/components/ProductCard/ProductCard.types.ts
export interface ProductCardProps {
  product: {
    id: string;
    name: string;
    price: number;
    image: string;
    description?: string;
  };
  onAddToCart?: (id: string) => void;
}
```

```tsx
// modules/products/components/ProductCard/index.ts
export { default } from './ProductCard';
export type { ProductCardProps } from './ProductCard.types';
```

### Shared Component

```tsx
// shared/components/Button/Button.tsx
'use client';

import { ButtonProps } from './Button.types';

export default function Button({ 
  children, 
  variant = 'primary', 
  onClick,
  className = '',
  ...props 
}: ButtonProps) {
  const baseClasses = "px-4 py-2 rounded font-medium transition-colors";
  const variantClasses = {
    primary: "bg-blue-500 text-white hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700",
    secondary: "bg-gray-200 text-gray-800 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600",
  };
  
  return (
    <button
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
}
```

### Client Component
```tsx
// components/Counter.tsx
'use client';

import { useState } from 'react';

interface CounterProps {
  initialValue?: number;
  onCountChange?: (count: number) => void;
}

export default function Counter({ initialValue = 0, onCountChange }: CounterProps) {
  const [count, setCount] = useState(initialValue);

  const increment = () => {
    const newCount = count + 1;
    setCount(newCount);
    onCountChange?.(newCount);
  };

  const decrement = () => {
    const newCount = count - 1;
    setCount(newCount);
    onCountChange?.(newCount);
  };

  return (
    <div className="flex items-center gap-4">
      <button
        onClick={decrement}
        className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
      >
        -
      </button>
      <span className="text-2xl font-bold">{count}</span>
      <button
        onClick={increment}
        className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
      >
        +
      </button>
    </div>
  );
}
```

### Component Với Children
```tsx
// components/Card.tsx
interface CardProps {
  title: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
}

export default function Card({ title, children, footer }: CardProps) {
  return (
    <div className="border rounded-lg p-6 shadow-md">
      <h2 className="text-2xl font-bold mb-4">{title}</h2>
      <div className="mb-4">{children}</div>
      {footer && <div className="mt-4 pt-4 border-t">{footer}</div>}
    </div>
  );
}
```

### Form Component
```tsx
// components/ContactForm.tsx
'use client';

import { useState, FormEvent } from 'react';

interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

export default function ContactForm() {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      
      if (response.ok) {
        alert('Message sent successfully!');
        setFormData({ name: '', email: '', message: '' });
      }
    } catch (error) {
      alert('Failed to send message');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="name" className="block mb-1">Name</label>
        <input
          type="text"
          id="name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="w-full px-4 py-2 border rounded"
          required
        />
      </div>
      <div>
        <label htmlFor="email" className="block mb-1">Email</label>
        <input
          type="email"
          id="email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          className="w-full px-4 py-2 border rounded"
          required
        />
      </div>
      <div>
        <label htmlFor="message" className="block mb-1">Message</label>
        <textarea
          id="message"
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          className="w-full px-4 py-2 border rounded"
          rows={4}
          required
        />
      </div>
      <button
        type="submit"
        disabled={isSubmitting}
        className="px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
      >
        {isSubmitting ? 'Sending...' : 'Send Message'}
      </button>
    </form>
  );
}
```

## Checklist
- [ ] Component file được tạo
- [ ] Props interface được định nghĩa
- [ ] TypeScript types đầy đủ
- [ ] Styling với Tailwind
- [ ] Server/Client component đúng
- [ ] Error handling (nếu cần)
- [ ] Loading states (nếu cần)
- [ ] Accessibility (aria labels, semantic HTML)
