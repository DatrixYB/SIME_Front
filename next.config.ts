import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },

  // 🚀 Rewrites para proxy a backend
  async rewrites() {
    return [
      {
        source: '/api/:path*',               // cualquier request a /api/...
        destination: process.env.NEXT_PUBLIC_API_URL+'/:path*', // lo redirige a Render
      },
    ];
  },
}

export default nextConfig
