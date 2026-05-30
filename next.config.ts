import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // 画像最適化: AVIF を最優先、次いで WebP。元 PNG/WebP からオンデマンド変換する。
  images: {
    formats: ["image/avif", "image/webp"],
  },
  // よく使う小さなユーティリティはバレル経由でも個別 import に最適化し、
  // クライアントバンドルへの巻き込みを抑える。
  experimental: {
    optimizePackageImports: ["clsx", "tailwind-merge"],
  },
};

export default nextConfig;
