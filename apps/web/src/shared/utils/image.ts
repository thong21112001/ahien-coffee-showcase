const KNOWN_PUBLIC_IMAGES = new Set([
  "avtMain.webp",
  "bannerExperience.webp",
  "bannerMain.webp",
  "englishLg.png",
  "file.svg",
  "globe.svg",
  "imageAbout1.webp",
  "imageAbout2.webp",
  "imageAbout3.webp",
  "imageContact.webp",
  "imageExperience1.webp",
  "imageExperience2.webp",
  "imageExperience3.webp",
  "logo.webp",
  "map.webp",
  "next.svg",
  "phin.webp",
  "placeholder.webp",
  "vercel.svg",
  "window.svg",
  "zalo.png",
]);

export const getImageUrl = (path?: string): string => {
  if (!path) return "/placeholder.webp";

  // Full URL (remote / S3)
  if (path.startsWith("http://") || path.startsWith("https://")) {
    return path;
  }

  // Path starting with '/' (explicit path in public, e.g., "/images/banner/...")
  if (path.startsWith("/")) {
    const candidate = path.replace(/\.(png|jpg|jpeg)$/, ".webp");
    if (KNOWN_PUBLIC_IMAGES.has(candidate.slice(1))) {
      return candidate;
    }
    return path;
  }

  // Path starting with 'public/'
  if (path.startsWith("public/")) {
    const raw = path.slice(7);
    const candidate = raw.replace(/\.(png|jpg|jpeg)$/, ".webp");
    if (KNOWN_PUBLIC_IMAGES.has(candidate)) {
      return `/${candidate}`;
    }
    return `/${raw}`;
  }

  const cleanPath = path.replace(/^\//, "");
  const webpCandidate = cleanPath.replace(/\.(png|jpg|jpeg)$/, ".webp");

  // Local public image check
  if (KNOWN_PUBLIC_IMAGES.has(webpCandidate)) {
    return `/${webpCandidate}`;
  }
  if (KNOWN_PUBLIC_IMAGES.has(cleanPath)) {
    return `/${cleanPath}`;
  }

  // When mock mode is enabled or S3 base URL is configured
  const s3Base = process.env.NEXT_PUBLIC_S3_BASE || "https://bepthu-api.dev00.xyz/uploads";
  return `${s3Base.replace(/\/$/, "")}/${cleanPath}`;
};

