import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [390, 640, 768, 1024, 1280, 1440],
    imageSizes: [48, 64, 96, 128, 200, 420, 520],
  },
  compress: true,
};

export default nextConfig;