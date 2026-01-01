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
        // Proxies Microsoft Clarity script
        source: '/proxies/clarity/:path*',
        destination: 'https://www.clarity.ms/:path*',
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
