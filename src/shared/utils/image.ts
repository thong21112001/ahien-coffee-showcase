export const getImageUrl = (path?: string): string => {
  if (!path) return "/placeholder.png";
  if (path.startsWith("http://") || path.startsWith("https://")) {
    return path;
  }
  const s3Base =
    process.env.NEXT_PUBLIC_S3_BASE ||
    process.env.NEXT_PUBLIC_SETTINGS_API_URL ||
    "https://bepthu-api.dev00.xyz/uploads";
  return `${s3Base.replace(/\/$/, "")}/${path.replace(/^\//, "")}`;
};
