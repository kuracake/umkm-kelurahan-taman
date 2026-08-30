import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
    ],
  },
  devIndicators: false,
  experimental: {
    serverActions: {
      bodySizeLimit: "50mb",
       },
    },
};

export default nextConfig;