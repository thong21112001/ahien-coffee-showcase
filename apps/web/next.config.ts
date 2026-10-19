import type { NextConfig } from "next";

const getRemotePatterns = () => {
  const defaultHosts = [
    "bepthu-api.dev00.xyz",
    "103.9.211.99",
    "localhost",
  ];

  const envUrls = [
    process.env.NEXT_PUBLIC_API_URL,
    process.env.NEXT_PUBLIC_SETTINGS_API_URL,
    process.env.NEXT_PUBLIC_S3_BASE,
  ].filter(Boolean) as string[];

  const patterns = defaultHosts.flatMap((host) => [
    {
      protocol: "https" as const,
      hostname: host,
      pathname: "/**",
    },
    {
      protocol: "http" as const,
      hostname: host,
      pathname: "/**",
    },
  ]);

  envUrls.forEach((urlStr) => {
    try {
      const parsed = new URL(urlStr);
      patterns.push({
        protocol: parsed.protocol.replace(":", "") as "http" | "https",
        hostname: parsed.hostname,
        pathname: "/**",
      });
    } catch {
      // Ignore invalid URL
    }
  });

  return patterns;
};

const nextConfig: NextConfig = {
  images: {
    remotePatterns: getRemotePatterns(),
  },
};

export default nextConfig;
