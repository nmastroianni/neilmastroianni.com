import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  experimental: {
    nextScriptWorkers: true,
  },
  async rewrites() {
    return [
      {
        // Proxies Facebook Pixel script
        source: '/proxies/facebook/:path*',
        destination: 'https://connect.facebook.net/:path*',
      },
      {
        source: '/proxies/facebook/signals/config/:path*',
        destination: 'https://connect.facebook.net/signals/config/:path*',
      },
    ]
  },
  async headers() {
    return [
      {
        // Apply these headers to all routes in your application
        source: '/(.*)',
        headers: [
          {
            key: 'Permissions-Policy',
            // Disable unload to fix Lighthouse warnings and enable bfcache
            value: 'unload=()',
          },
        ],
      },
    ]
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.prismic.io',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'prismic-io.s3.amazonaws.com',
      },
    ],
  },
}

export default nextConfig
