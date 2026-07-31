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
  title: "Bếp Nhà Thu - Ẩm thực Hội An",
  description:
    "Thưởng thức hương vị truyền thống Hội An trong không gian ấm cúng, cổ kính.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="vi" suppressHydrationWarning className={beVietnam.variable}>
      <body className="font-sans antialiased min-h-screen flex flex-col bg-stone-50 text-stone-900 selection:bg-[#D9A05B]/30 selection:text-[#8D4F2A]">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
