// next.config.ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "lh3.googleusercontent.com" }, // Google
      { protocol: "https", hostname: "**.fbcdn.net" },              // ANY fbcdn subdomain (scontent-*, static-*, etc.)
      { protocol: "https", hostname: "utfs.io" },                   // UploadThing CDN
      { protocol: "https", hostname: "**.ufs.sh" },                 // ufs.sh subdomains
    ],
  },
};

export default nextConfig;
