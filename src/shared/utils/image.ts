const KNOWN_PUBLIC_IMAGES = new Set([
  "anh1.jpg",
  "anh2.jpg",
  "anh3.jpg",
  "anh4.jpg",
  "anh5.jpg",
  "anh6.jpg",
  "anh7.jpg",
  "anh8.jpg",
  "anh9.jpg",
  "anh10.jpg",
  "avtMain.png",
  "bannerExperience.png",
  "bannerMain.png",
  "caolau.png",
  "englishLg.png",
  "file.svg",
  "globe.svg",
  "imageAbout1.png",
  "imageAbout2.png",
  "imageAbout3.png",
  "imageContact.png",
  "imageExperience1.png",
  "imageExperience2.png",
  "imageExperience3.png",
  "logo.png",
  "map.png",
  "next.svg",
  "placeholder.png",
  "vercel.svg",
  "window.svg",
  "zalo.png",
]);

export const getImageUrl = (path?: string): string => {
  if (!path) return "/placeholder.png";

  // Full URL
  if (path.startsWith("http://") || path.startsWith("https://")) {
    return path;
  }

  // Already starting with '/' (explicit path in public, e.g. "/anh1.jpg", "/logo.png")
  if (path.startsWith("/")) {
    return path;
  }

  // Starts with 'public/'
  if (path.startsWith("public/")) {
    return `/${path.slice(7)}`;
  }

  const cleanPath = path.replace(/^\//, "");

  // Prioritize files in the public directory
  if (KNOWN_PUBLIC_IMAGES.has(cleanPath)) {
    return `/${cleanPath}`;
  }

  const s3Base =
    process.env.NEXT_PUBLIC_S3_BASE ||
    process.env.NEXT_PUBLIC_SETTINGS_API_URL ||
    "https://bepthu-api.dev00.xyz/uploads";
  return `${s3Base.replace(/\/$/, "")}/${cleanPath}`;
};

