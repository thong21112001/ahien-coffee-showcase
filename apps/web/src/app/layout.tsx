import type { Metadata } from "next";
import { Be_Vietnam_Pro } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";

const beVietnam = Be_Vietnam_Pro({
  weight: ["300", "400", "500", "600", "700", "800"],
  subsets: ["latin", "vietnamese"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "A Hiền Coffee | Cà Phê Di Sản & Specialty Roastery",
  description:
    "Thưởng thức hương vị cà phê phin truyền thống đỉnh cao cùng dòng hạt Specialty Arabica Cầu Đất & Robusta Buôn Ma Thuột rang mộc.",
  icons: {
    icon: [
      { url: "/logo.webp" },
      { url: "/logo.webp", sizes: "32x32", type: "image/webp" },
    ],
    shortcut: "/logo.webp",
    apple: "/logo.webp",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="vi" suppressHydrationWarning className={beVietnam.variable}>
      <body className="font-sans antialiased min-h-screen flex flex-col bg-stone-950 text-stone-100 selection:bg-amber-500/30 selection:text-amber-300">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
