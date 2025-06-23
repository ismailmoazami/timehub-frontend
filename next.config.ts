import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["ik.imagekit.io"], // Allow images from Google Drive
  },
};

export default nextConfig;
