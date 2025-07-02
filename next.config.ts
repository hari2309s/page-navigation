import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  webpack: (config) => {
    config.resolve.alias["@"] = path.resolve(__dirname, "src");
    config.resolve.alias["@/components"] = path.resolve(
      __dirname,
      "src/app/components",
    );
    config.resolve.alias["@/app"] = path.resolve(__dirname, "src/app");
    config.resolve.alias["@/hooks"] = path.resolve(__dirname, "src/app/hooks");
    config.resolve.alias["@/lib"] = path.resolve(__dirname, "src/app/lib");
    config.resolve.alias["@/types"] = path.resolve(__dirname, "src/app/types");
    config.resolve.alias["@/public"] = path.resolve(__dirname, "public");

    return config;
  },
  reactStrictMode: true,
};

export default nextConfig;
