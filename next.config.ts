import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["ik.imagekit.io"], 
    unoptimized: true
  },
  // distDir: 'out',
  // basePath: "",
  // assetPrefix: "./",
  // trailingSlash: true
};

export default nextConfig;
