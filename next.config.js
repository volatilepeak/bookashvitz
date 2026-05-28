/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  async redirects() {
    return [
      // bookasauna.co redirects are handled at DNS/Vercel level
    ]
  },
}

module.exports = nextConfig
