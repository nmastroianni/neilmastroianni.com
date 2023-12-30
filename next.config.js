/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      'images.prismic.io',
      'images.unsplash.com',
      'prismic-io.s3.amazonaws.com',
    ],
  },
}

module.exports = nextConfig
