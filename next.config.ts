import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    // optimizePackageImports: ["lucide-react"],
  },
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "avatars.githubusercontent.com" },
      { protocol: "https", hostname: "lh3.googleusercontent.com" },
      { protocol: "https", hostname: "*.neon.tech" },
    ],
  },
};

export default nextConfig;
