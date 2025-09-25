import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      // existing
      { protocol: "https", hostname: "**.fna.fbcdn.net" },
      { protocol: "https", hostname: "lh3.googleusercontent.com" },

      // UploadThing/CDN
      { protocol: "https", hostname: "**.ufs.sh" },
      { protocol: "https", hostname: "utfs.io" },
    ],
  },
};

export default nextConfig;
