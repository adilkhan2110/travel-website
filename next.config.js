/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export', // ✅ Yeh line add karo

  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    domains: ["placeholder.svg"],
    unoptimized: true, // ✅ Required for static export
  },
  experimental: {
    optimizeCss: true,
  },
};

module.exports = nextConfig;
