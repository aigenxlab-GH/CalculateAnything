import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",    // generate static files in /out
  trailingSlash: true, // ensures /page/ URLs map to /page/index.html

  // Performance optimizations
  images: {
    unoptimized: true, // Required for static export
  },

  // Compress JavaScript and CSS
  compress: true,

  // Generate source maps only in development
  productionBrowserSourceMaps: false,

  experimental: {
    optimizePackageImports: ['lucide-react', '@radix-ui/react-dialog'],
  },

  // NOTE: headers() is NOT used here — it silently has zero effect under
  // output:'export' (Next.js prints this warning every build). All real
  // Cache-Control / security headers for this static site live in
  // public/_headers instead (Cloudflare Pages/Workers-native format).
};

export default nextConfig;
