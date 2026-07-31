export const getImageUrl = (path?: string): string => {
  if (!path) return "/placeholder.png";
  if (path.startsWith("http://") || path.startsWith("https://")) {
    return path;
  }
  const apiBase =
    process.env.NEXT_PUBLIC_SETTINGS_API_URL || "http://103.9.211.99:3028";
  return `${apiBase.replace(/\/$/, "")}/${path.replace(/^\//, "")}`;
};
