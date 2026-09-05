import type { NextConfig } from "next";

/**
 * tonyanglesey.github.io is a GitHub Pages *user* site, served at the domain
 * root, so no basePath/assetPrefix is needed. We export a fully static site
 * (`output: "export"`) and let the blog fetch WordPress live in the browser.
 */
const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  // Pin the workspace root — a stray lockfile in a parent dir otherwise makes
  // Next infer the wrong project root.
  turbopack: { root: __dirname },
  images: {
    // GitHub Pages has no Next image optimizer at runtime.
    unoptimized: true,
  },
};

export default nextConfig;
