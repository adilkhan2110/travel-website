/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone', // ⬅️ This allows dynamic API routes like /api/gallery/[id]

  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    domains: ["placeholder.svg"],
    unoptimized: true, // Optional (only needed if you still want to avoid optimization)
  },
  experimental: {
    optimizeCss: true,
  },
};

module.exports = nextConfig;
