# Review Next.js Code

## Tổng Quan
Review code Next.js toàn diện theo best practices và các quy tắc đã định nghĩa.

## Các Bước Review

### 1. Kiểm Tra Server/Client Components
- [ ] Server Components không có `'use client'` directive
- [ ] Client Components có `'use client'` ở đầu file
- [ ] Không import Server Components vào Client Components
- [ ] Data fetching chỉ trong Server Components (trừ client-side fetching)

### 2. Kiểm Tra Data Fetching
- [ ] Sử dụng async/await đúng cách
- [ ] Cache strategies phù hợp
- [ ] Error handling đầy đủ
- [ ] Loading states được implement
- [ ] Không fetch trong render (Client Components)

### 3. Kiểm Tra API Routes
- [ ] Sử dụng NextRequest và NextResponse
- [ ] Validation với zod hoặc yup
- [ ] Error handling với try-catch
- [ ] Status codes phù hợp
- [ ] TypeScript types đầy đủ

### 4. Kiểm Tra Performance
- [ ] Images sử dụng `next/image`
- [ ] Code splitting với dynamic imports
- [ ] Lazy loading cho components lớn
- [ ] Memoization khi cần (React.memo, useMemo)
- [ ] Không có unnecessary re-renders

### 5. Kiểm Tra SEO
- [ ] Metadata đầy đủ (title, description)
- [ ] Open Graph tags
- [ ] Semantic HTML
- [ ] Alt text cho images
- [ ] Structured data (nếu cần)

### 6. Kiểm Tra TypeScript
- [ ] Types đầy đủ, không có `any`
- [ ] Props interfaces được định nghĩa
- [ ] Return types rõ ràng
- [ ] Type safety cho API responses

### 7. Kiểm Tra Styling
- [ ] Sử dụng Tailwind utility classes
- [ ] Responsive design (mobile-first)
- [ ] Dark mode support (nếu cần)
- [ ] Consistent spacing và colors
- [ ] CSS Modules nếu cần scoped styles

### 8. Kiểm Tra Accessibility
- [ ] Semantic HTML elements
- [ ] ARIA labels khi cần
- [ ] Keyboard navigation
- [ ] Focus management
- [ ] Color contrast

### 9. Kiểm Tra Error Handling
- [ ] Error boundaries (error.tsx)
- [ ] Try-catch blocks
- [ ] User-friendly error messages
- [ ] Error logging

### 10. Kiểm Tra Code Quality
- [ ] Code organization và structure
- [ ] Naming conventions
- [ ] Comments khi cần
- [ ] DRY principle
- [ ] Single responsibility

## Checklist Tổng Quan

### Components
- [ ] Server/Client Components đúng
- [ ] Props interfaces đầy đủ
- [ ] TypeScript types
- [ ] Styling với Tailwind
- [ ] Error handling
- [ ] Loading states
- [ ] Accessibility

### Pages
- [ ] Metadata đầy đủ
- [ ] Data fetching optimized
- [ ] Error boundaries
- [ ] Loading states
- [ ] SEO optimized

### API Routes
- [ ] Validation
- [ ] Error handling
- [ ] Status codes
- [ ] TypeScript types
- [ ] Security (authentication, authorization)

### Performance
- [ ] Images optimized
- [ ] Code splitting
- [ ] Lazy loading
- [ ] Memoization
- [ ] Bundle size

## Ví Dụ Review

### Review Component
```
/review-nextjs-code
Review @components/ProductCard.tsx
```

Agent sẽ:
1. Kiểm tra Server/Client component
2. Kiểm tra Props interface
3. Kiểm tra TypeScript types
4. Kiểm tra styling
5. Kiểm tra performance
6. Kiểm tra accessibility
7. Đề xuất cải thiện

### Review Page
```
/review-nextjs-code
Review @app/products/page.tsx
```

Agent sẽ:
1. Kiểm tra metadata
2. Kiểm tra data fetching
3. Kiểm tra error handling
4. Kiểm tra SEO
5. Kiểm tra performance
6. Đề xuất cải thiện

### Review API Route
```
/review-nextjs-code
Review @app/api/users/route.ts
```

Agent sẽ:
1. Kiểm tra validation
2. Kiểm tra error handling
3. Kiểm tra status codes
4. Kiểm tra TypeScript types
5. Kiểm tra security
6. Đề xuất cải thiện

## Output Format

Sau khi review, Agent sẽ cung cấp:
1. **Tổng quan**: Đánh giá tổng thể
2. **Điểm mạnh**: Những gì làm tốt
3. **Vấn đề**: Những vấn đề cần sửa
4. **Đề xuất**: Cách cải thiện cụ thể
5. **Code examples**: Ví dụ code cải thiện
