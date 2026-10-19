import { HomePage } from "@/features/home";
import { Locale } from "@ahien/types";

interface PageProps {
  params: Promise<{ locale: string }>;
}

export async function generateStaticParams() {
  return [{ locale: "vi" }, { locale: "en" }];
}

export default async function LocalizedPage({ params }: PageProps) {
  const resolvedParams = await params;
  const locale: Locale = resolvedParams?.locale === "en" ? "en" : "vi";

  return <HomePage locale={locale} />;
}
