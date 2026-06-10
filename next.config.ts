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

  // Headers for better caching and performance
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=3600, s-maxage=86400',
          },
        ],
      },
      {
        source: '/calculators/:slug(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=604800, s-maxage=2592000', // 1 week client, 30 days CDN
          },
        ],
      },
      {
        source: '/guides/:slug(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=604800, s-maxage=2592000',
          },
        ],
      },
    ];
  },
};

export default nextConfig;
