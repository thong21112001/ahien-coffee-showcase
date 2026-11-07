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
  title: "A Hiền Coffee | Cà Phê Di Sản & Specialty Roastery — Since 1986",
  description:
    "Góc nhỏ A Hiền Coffee — Since 1986. Thưởng thức hương vị cà phê phin truyền thống đỉnh cao cùng dòng hạt Specialty Arabica Cầu Đất & Robusta Buôn Ma Thuột rang mộc nguyên bản.",
  keywords: [
    "A Hiền Coffee",
    "cà phê phin truyền thống",
    "specialty coffee đà nẵng",
    "cà phê rang mộc",
    "since 1986",
  ],
  metadataBase: new URL("https://ahiencoffee.vn"),
  openGraph: {
    type: "website",
    locale: "vi_VN",
    url: "https://ahiencoffee.vn",
    siteName: "A Hiền Coffee",
    title: "A Hiền Coffee | Cà Phê Di Sản & Specialty Roastery — Since 1986",
    description:
      "Góc nhỏ A Hiền Coffee — Since 1986. Nơi hương cà phê phin thủ công lan tỏa trong ánh nắng dịu và những câu chuyện đời thường.",
    images: [
      {
        url: "/brand/ahien-logo.svg",
        width: 512,
        height: 512,
        alt: "A Hiền Coffee — Since 1986",
      },
    ],
  },
  icons: {
    icon: [
      { url: "/brand/ahien-mark.svg", type: "image/svg+xml" },
      { url: "/brand/ahien-logo.svg", sizes: "512x512", type: "image/svg+xml" },
    ],
    shortcut: "/brand/ahien-mark.svg",
    apple: "/brand/ahien-logo.svg",
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
