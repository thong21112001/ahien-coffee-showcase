# Skill: create-app-layout

## Role
You are a senior Next.js architect with strong experience in App Router, component architecture, and shared layout patterns.

You always:
- Follow Next.js App Router best practices
- Create reusable shared components
- Separate layout concerns from page logic
- Use proper TypeScript types
- Support dark mode and i18n
- Write clean, maintainable code
- **Automatically apply this skill when user mentions:**
  - "Tạo layout cho app" / "Create layout for app"
  - "Setup app layout" / "Setup shared layout"
  - "Tạo navigation" / "Create navigation"
  - "Layout chung" / "Shared layout"
  - "App layout" / "Application layout"

---

## Goal
Create a shared app layout with NavigationBar, Footer, and AppLayout wrapper that will be used across all pages in the application.

**This skill should be automatically triggered when user requests:**
- Creating app layout
- Setting up shared layout
- Creating navigation bar
- Setting up common layout
- Creating header and footer

The final result must:
- Have AppLayout component in `shared/components/AppLayout/`
- Have all layout components (Header, Footer, Navigation) inside `AppLayout/` folder
- Organize components in separate subfolders within `AppLayout/`
- Integrate AppLayout into root `app/layout.tsx`
- Support dark mode and i18n
- Include navigation links
- Be responsive and accessible
- Support multiple menu styles (modern, landing page, horizontal)

---

## Architecture Rules

### Folder Structure
```
src/
├─ shared/
│  └─ components/
│     └─ AppLayout/
│        ├─ AppLayout.tsx
│        ├─ index.ts
│        ├─ Header/
│        │  ├─ Header.tsx
│        │  └─ index.ts
│        ├─ NavigationBar/
│        │  ├─ NavigationBar.tsx
│        │  └─ index.ts
│        └─ Footer/
│           ├─ Footer.tsx
│           └─ index.ts
└─ app/
   └─ layout.tsx (update to use AppLayout)
```

**Important**: All layout components (Header, NavigationBar, Footer) are organized inside `AppLayout/` folder, not at the root of `shared/components/`.

---

## Component Rules

### AppLayout Component
- Must be a **Client Component** (uses Header and Footer)
- Located in `shared/components/AppLayout/AppLayout.tsx`
- Wraps all page content
- Uses flexbox for sticky footer
- Supports dark mode classes
- Imports Header and Footer from subfolders within `AppLayout/`

### Header Component
- Must be a **Client Component** (uses hooks)
- Located in `shared/components/AppLayout/Header/Header.tsx`
- Contains NavigationBar and app logo/title
- Sticky at top
- Includes NavigationBar component
- Theme toggle button
- Language switcher
- Responsive design

### NavigationBar Component
- Must be a **Client Component** (uses hooks)
- Located in `shared/components/AppLayout/NavigationBar/NavigationBar.tsx`
- Contains navigation links
- Can be used inside Header or standalone
- **Supports multiple menu styles:**
  - **Modern Style**: Clean, minimal design with hover effects
  - **Landing Page Style**: Centered navigation, CTA button, transparent background
  - **Horizontal Menu**: Traditional horizontal menu in header
- Responsive design

### Footer Component
- Must be a **Client Component** (uses i18n)
- Located in `shared/components/AppLayout/Footer/Footer.tsx`
- Fixed at bottom
- Copyright information
- Uses i18n for text

---

## Translation Requirements

Add to `locales/en/common.json` and `locales/vi/common.json`:

```json
{
  "app": {
    "name": "My App"
  },
  "navigation": {
    "title": "My App"
  },
  "footer": {
    "copyright": "All rights reserved"
  }
}
```

---

## Menu Styles

### 1. Modern Menu Style
- Clean, minimal design
- Smooth hover effects
- Glass morphism effect
- Subtle animations

### 2. Landing Page Style
- Centered navigation
- Transparent/glass background
- CTA button included
- Large logo/title
- Mobile hamburger menu

### 3. Horizontal Menu Style
- Traditional horizontal menu
- All links visible in header
- Simple, functional design
- Good for admin/dashboard apps

---

## Templates

### AppLayout Component
```tsx
// shared/components/AppLayout/AppLayout.tsx
'use client';

import { ReactNode } from 'react';
import Header from './Header/Header';
import Footer from './Footer/Footer';

interface AppLayoutProps {
  children: ReactNode;
}

export default function AppLayout({ children }: AppLayoutProps) {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 flex flex-col">
      <Header />
      <main className="flex-1">
        {children}
      </main>
      <Footer />
    </div>
  );
}
```

```tsx
// shared/components/AppLayout/index.ts
export { default } from './AppLayout';
```

### Header Component
```tsx
// shared/components/AppLayout/Header/Header.tsx
'use client';

import React from 'react';
import Link from 'next/link';
import NavigationBar from '../NavigationBar/NavigationBar';
import ThemeToggle from '@/shared/components/ThemeToggle';
import LanguageSwitcher from '@/shared/components/LanguageSwitcher';
import { useI18n } from '@/shared/i18n/hooks';

export default function Header() {
  const { t } = useI18n();

  return (
    <header className="sticky top-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-800">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold text-gray-900 dark:text-white hover:opacity-80 transition-opacity">
            {t('app.name')}
          </Link>
          <div className="flex gap-4 items-center">
            <NavigationBar />
            <ThemeToggle />
            <LanguageSwitcher />
          </div>
        </div>
      </div>
    </header>
  );
}
```

```tsx
// shared/components/AppLayout/Header/index.ts
export { default } from './Header';
```

### NavigationBar Component - Modern Style (Default)
```tsx
// shared/components/AppLayout/NavigationBar/NavigationBar.tsx
'use client';

import React from 'react';
import Link from 'next/link';

export default function NavigationBar() {
  return (
    <nav className="flex gap-4 items-center">
      <Link
        href="/"
        className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors px-3 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800"
      >
        Home
      </Link>
      <Link
        href="/posts"
        className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors px-3 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800"
      >
        Posts
      </Link>
      <Link
        href="/products"
        className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors px-3 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800"
      >
        Products
      </Link>
    </nav>
  );
}
```

```tsx
// shared/components/AppLayout/NavigationBar/index.ts
export { default } from './NavigationBar';
```

### NavigationBar Component - Landing Page Style
```tsx
// shared/components/AppLayout/NavigationBar/NavigationBar.tsx (Landing Page Variant)
'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/shared/components/Button';

export default function NavigationBar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      {/* Desktop Menu - Centered */}
      <div className="hidden md:flex items-center gap-8">
        <Link
          href="/"
          className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors font-medium"
        >
          Home
        </Link>
        <Link
          href="/posts"
          className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors font-medium"
        >
          Posts
        </Link>
        <Link
          href="/about"
          className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors font-medium"
        >
          About
        </Link>
        <Button variant="primary" className="hidden md:block">
          Get Started
        </Button>
      </div>

      {/* Mobile Menu Button */}
      <button
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        className="md:hidden p-2 rounded-lg bg-gray-100 dark:bg-gray-800"
        aria-label="Toggle menu"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          {mobileMenuOpen ? (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          ) : (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          )}
        </svg>
      </button>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 p-4">
          <div className="flex flex-col gap-4">
            <Link href="/" className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">
              Home
            </Link>
            <Link href="/posts" className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">
              Posts
            </Link>
            <Link href="/about" className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">
              About
            </Link>
            <Button variant="primary" className="w-full">
              Get Started
            </Button>
          </div>
        </div>
      )}
    </>
  );
}
```

**Note**: For Landing Page Style, Header component should include the logo and NavigationBar should be used inside Header.

### NavigationBar Component - Horizontal Menu Style
```tsx
// shared/components/AppLayout/NavigationBar/NavigationBar.tsx (Horizontal Menu Variant)
'use client';

import React from 'react';
import Link from 'next/link';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/posts', label: 'Posts' },
  { href: '/products', label: 'Products' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
];

export default function NavigationBar() {
  return (
    <nav className="flex items-center space-x-1">
      {navLinks.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md transition-colors"
        >
          {link.label}
        </Link>
      ))}
    </nav>
  );
}
```

**Note**: For Horizontal Menu Style, Header component should include the logo and all navigation links in a horizontal layout.

### Footer Component
```tsx
// shared/components/AppLayout/Footer/Footer.tsx
'use client';

import { useI18n } from '@/shared/i18n/hooks';

export default function Footer() {
  const { t } = useI18n();

  return (
    <footer className="bg-gray-900 dark:bg-black text-gray-400 py-8">
      <div className="container mx-auto px-4 text-center">
        <p>
          &copy; {new Date().getFullYear()} {t('app.name')}. {t('footer.copyright')}.
        </p>
      </div>
    </footer>
  );
}
```

```tsx
// shared/components/AppLayout/Footer/index.ts
export { default } from './Footer';
```

### Update Root Layout
```tsx
// app/layout.tsx
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Providers } from './providers';
import AppLayout from '@/shared/components/AppLayout';

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
        <Providers>
          <AppLayout>{children}</AppLayout>
        </Providers>
      </body>
    </html>
  );
}
```

---

## Best Practices

1. **Organized Structure**: All layout components (Header, NavigationBar, Footer) are inside `AppLayout/` folder
2. **Clear Separation**: Each component has its own subfolder with component file and index.ts
3. **Shared Components**: Place layout components in `shared/components/AppLayout/` not in modules
4. **Client Components**: All layout components should be Client Components (use hooks)
5. **i18n Support**: Use `useI18n()` hook for all text content
6. **Dark Mode**: Always include dark mode classes with `dark:` prefix
7. **Accessibility**: Add proper ARIA labels and semantic HTML
8. **Responsive**: Use Tailwind responsive classes
9. **Sticky Navigation**: Use `sticky top-0` for header
10. **Flexbox Layout**: Use flexbox for sticky footer pattern
11. **Export Pattern**: Always create `index.ts` for clean imports
12. **TypeScript**: Define proper Props interfaces
13. **Component Hierarchy**: AppLayout → Header → NavigationBar (clear parent-child relationship)

---

## Integration Checklist

- [ ] AppLayout component created in `shared/components/AppLayout/`
- [ ] Header component created in `shared/components/AppLayout/Header/`
- [ ] NavigationBar component created in `shared/components/AppLayout/NavigationBar/`
- [ ] Footer component created in `shared/components/AppLayout/Footer/`
- [ ] All components have index.ts exports
- [ ] AppLayout imports Header and Footer from subfolders
- [ ] Header imports NavigationBar from subfolder
- [ ] Translations added to common.json (en & vi)
- [ ] Root layout updated to use AppLayout
- [ ] Navigation links configured
- [ ] Theme toggle integrated in Header
- [ ] Language switcher integrated in Header
- [ ] Dark mode classes applied
- [ ] Responsive design tested
- [ ] i18n working correctly

---

## Menu Style Selection

When user requests layout creation, determine the appropriate style:

1. **Default/Modern Style**: Use when no specific style mentioned or for general apps
2. **Landing Page Style**: Use when user mentions "landing page", "marketing site", or "homepage"
3. **Horizontal Menu Style**: Use when user mentions "horizontal menu", "traditional menu", or "dashboard"

## Usage Triggers

This skill should be automatically applied when user says:
- "Tạo layout cho app" / "Create layout for app"
- "Setup app layout" / "Setup shared layout"
- "Tạo navigation" / "Create navigation"
- "Layout chung" / "Shared layout"
- "App layout" / "Application layout"
- "Tạo header và footer" / "Create header and footer"
- "Navigation bar" / "Navbar"
- "Menu cho app" / "Menu for app"

## Notes

- **Component Organization**: All layout components are organized inside `AppLayout/` folder:
  - `AppLayout/AppLayout.tsx` - Main layout wrapper
  - `AppLayout/Header/Header.tsx` - Header component (contains logo, NavigationBar, ThemeToggle, LanguageSwitcher)
  - `AppLayout/NavigationBar/NavigationBar.tsx` - Navigation links component
  - `AppLayout/Footer/Footer.tsx` - Footer component

- **Component Hierarchy**:
  - AppLayout wraps all pages automatically through root layout
  - Header contains logo, NavigationBar, ThemeToggle, and LanguageSwitcher
  - NavigationBar contains only navigation links (can be used inside Header or standalone)
  - Footer is fixed at bottom using flexbox

- **Import Paths**: Components import from relative paths within AppLayout folder:
  - `AppLayout.tsx` imports: `./Header/Header` and `./Footer/Footer`
  - `Header.tsx` imports: `../NavigationBar/NavigationBar`

- All components support dark mode
- All text uses i18n for translations
- Navigation links should be updated based on your routes
- Choose menu style based on user requirements or use modern style as default
- Landing page style includes mobile hamburger menu
- Horizontal menu style is best for admin/dashboard applications